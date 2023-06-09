const express = require("express");
const router = express.Router();
const adminLoginSchema = require("../models/admin");
const projectSchema = require("../models/Project");
const QuestionSchema = require("../models/question");
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");
const {
  validateData,
  UploadValidation,
} = require("../utils/questionValidation");

router.get("/dashboard", (req, res) => {
  res.redirect("/logins");
});

router.get("/logins", (req, res) => {
  res.render("logins", { message: "" });
});

router.get("/admin", (req, res) => {
  return res.status(200).redirect("/adminPage");
});

router.get("/form", (req, res) => {
  res.render("admin/forms");
});

router.get("/projects", (req, res) => {
  res.render("admin/project");
});

router.get("/modal", (req, res) => {
  res.render("admin/modals");
});

router.get("/upload", (req, res) => {
  res.render("admin/upload", { msg: "" });
});

router.get("/admin", (req, res) => {
  res.render("adminReg", { message: "" });
});

router.get("/logout", (req, res) => {
  res.render("index", { validationError: false });
});

router.get("/Login", (req, res) => {
  res.render("admin/adminlogin", { message: "" });
});

router.get("/adminPage", async (req, res) => {
  sess = req.session;

  try {
    const Projects = await projectSchema.find();
    if(!Projects) {
      return res.status(400).redirect("/Login", { message: "" });
    } 

    let TotalProject = await projectSchema.find().count();
    console.log(TotalProject)

    const Questions = await QuestionSchema.find();
    if (!Questions) {
      return res.status(400).redirect("/Login", { message: "" });
    }

    let TotalQuestion = await QuestionSchema.find().count()
    console.log(TotalQuestion)

    return res.render("admin/admin", { Questions: Questions, message: "" , Project: Projects, TotalProject:TotalProject, TotalQuestion: TotalQuestion });
  } catch (error) {
    console.log(error);
    return res.render("admin/404");
  }
});






/**
 * @param {{email:String, password:String}}
 */

router.post("/RegAdmin", async (req, res) => {
  /**
   * @type {{email:String, password:String}}
   */

  sess = req.session;
  const userData = req.body;

  try {
    const error = validateData(userData);
    if (error) {
      console.log(error);
      return res.render("adminReg", { message: error });
    }

    const Hash = bcrypt.hashSync(userData.password, 5);
    userData.password = Hash;
    await adminLoginSchema.create(userData);
    // session.userid = req.body.username;
    // console.log(req.session);
    console.log("email and password Posted");

    sess.admin = userData.email;
    console.log(req.session);

    return res.render("admin/adminlogin", { message: "Success" });
  } catch (error) {
    console.log(error);
    res.render("admin/adminReg");
  }
});

router.post("/LoginAdmin", async (req, res) => {
  /**
   * @type {{email:String, password:String}}
   */
  const userData = req.body;
  const sess = req.session;

  try {
    const error = validateData(userData);
    if (error) {
      console.log(error);
      return res.render("admin/adminlogin", { message: error });
    }

    const checkAdmin = await adminLoginSchema.findOne({
      email: userData.email,
    });

    if (checkAdmin.email !== userData.email) {
      return res.render("adminlogin", { message: process.env.EmailErr });
    }

    const decryptPassword = await bcrypt.compareSync(
      userData.password,
      checkAdmin.password
    );
    if (decryptPassword !== true) {
      return res.render("adminlogin", { message: process.env.PasswordErr });
    }

    sess.admin = userData.email;
    console.log(req.session);

    return res.status(200).redirect("/adminPage");
  } catch (error) {
    return res.render("admin/adminlogin", { message: process.env.ErrMsg });
  }
});

router.get("/delete/:id", async (req, res) => {
  session = req.session;
  const id = req.params.id;

  if (session.admin) {
    try {
      if (id.length !== 24) {
        return res.status(404).redirect("/adminPage");
      }

      const checkQuestion = await QuestionSchema.findOne({ _id: id });
      if (!checkQuestion) {
        return res.status(404).redirect("/adminPage");
      }

      const DeleteQuestion = await QuestionSchema.findOneAndDelete({ _id: id });
      return res.status(200).redirect("admin/adminPage");
    } catch (error) {
      console.log(error);
    }
  }
});

/**
 * @param {{ptype: String, description: String, address: String, image: String, date: string }} projectData
 */

router.post("/uploadProject", async (req, res) => {
  const projectData = req.body;
  
  try {
    const error = UploadValidation(projectData);
    if (error) {
      console.log(error);
      return res.render("admin/upload", { msg: error });
    }

    const imageFile = req.files.image;
    console.log(imageFile);
    if (
      imageFile.mimetype == "image/jpeg" ||
      imageFile.mimetype == "image/png" ||
      imageFile.mimetype == "image/gif" ||
      imageFile.mimetype == "image/svg+xml"
    ) {
      await cloudinary.v2.uploader.upload(
        imageFile.tempFilePath,
        {
          resource_type: "image",
          folder: "mafsealProject/project",
          use_filename: false,
          unique_filename: true,
        },
        (err, result) => {
          if (err) {
            return res.render("admin/upload", {
              msg: "Am error occure while uploading image.",
            });
          } else {
            const now = new Date();
            const saveProject = new projectSchema({
              ptype: projectData.ptype,
              description: projectData.description,
              address: projectData.address,
              date: projectData.date,
              compltDate: projectData.compltDate,
              plan: projectData.plan,
              image: result.secure_url,
              publicId: result.public_id,
            });
            saveProject.save();
            console.log("project uploaded");
            return res.render("admin/upload", {
              msg: "Project uploaded successfully.",
            });
          }
        }
      );
    } else {
      return res.render("admin/upload", { msg: "Please fill all inputs" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getProject", async (req, res) => {
  try {
    const Projects = await projectSchema.find();
    if(Projects) {
      const totalProject = Projects.lenght
      return res.render("admin/admin", { project: totalProject, message: "" });
    } 
    return res.rende
  } catch (error) {
    console.log(error);
  }
})


router.get("/logout", (req, res) => {
  req.session.destroy();
  console.log("session destroyed...");
  return res.redirect("/");
});

module.exports = router;
