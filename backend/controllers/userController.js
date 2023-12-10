const User = require("../models/User");
const generator = require("generate-password");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const SECRET_KEY = process.env.JWT_SECRET;

const logUser = async (req, res) => {
  const { user_name, password, rememberMe } = req.body;

  if (!user_name || !password) {
    res.status(400);
    throw new Error("all Field are required");
  }
 
  const userFound = await User.findOne({ user_name , password });
  if (userFound && !userFound.active)
    res.status(401).json("your account is Desactivated !!!");
  if (userFound && userFound.password) {
    let access_Token = accessToken(
      userFound._id,
      userFound.role,
      rememberMe,
      3
    );
    let refresh_Token = refreshToken(
      userFound._id,
      userFound.role,
      rememberMe,
      12
    );

    res
      .status(200)
      .json({
        message: "Logged in successfully",
        status: 200,
        data: userFound,
        access_Token,
        refresh_Token,
      });
  } else {
    res.status(404).json("Invalid  username or password");
  }
};

const accessToken = (id, role, rememberMe, time) => {
  return jwt.sign({ id, role, rememberMe }, SECRET_KEY, {
    expiresIn: rememberMe ? time + "d" : "1d",
  });
};

const refreshToken = (id, role, rememberMe, time) => {
  return jwt.sign(
    { id, role, rememberMe },
    process.env.REFREFRESH_TOKEN_SECRET,
    { expiresIn: time + "d" }
  );
};

const generateUsername = (firstname, lastname) => {
  let randomNumber = Math.floor(Math.random() * 1000);
  let username =
    firstname.slice(0, 3) + lastname.slice(0, 3) + "_" + randomNumber;
  return username;
};

const generatePassword = () => {
  const password = generator.generateMultiple(1, {
    length: 10,
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });
  return password;
};

const addUser = (req, res) => {
  let { first_name, last_name, email, role } = req.body;

  if (!first_name) {
    return res
      .status(400)
      .json({ status: 400, message: "first name is required!!" });
  } else if (!last_name) {
    return res
      .status(400)
      .json({ status: 400, message: "last name is required!!" });
  } else if (!email) {
    return res
      .status(400)
      .json({ status: 400, message: "email is required!!" });
  } else if (!role) {
    return res.status(400).json({ status: 400, message: "role is required!!" });
  }

  let password = generatePassword();

  let hash_password = md5(password);

  const urlUserImage =
    "https://res.cloudinary.com/dfin3vmgz/image/upload/v1699881455/users_images/istockphoto-1300845620-612x612_arm4t8.jpg";

  const newUser = new User({
    first_name: first_name,
    last_name: last_name,
    user_name: generateUsername(first_name, last_name),
    email: email,
    password: hash_password,
    role: role,
    user_image: urlUserImage,
  });

  newUser.save().then((newUser) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.user,
        pass: process.env.password,
      },
    });


    const link = "http://localhost:3000/SignIn";

    let mailOptions = {
      from: `"PRESTIGIOUS" <${process.env.user}>`,
      to: email,
      subject: "WELCOME TO OUR TEAM",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html lang="en">
              <head></head>
              <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
                <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em">
                  <tr style="width:100%">
                    <td>
                      <table style="padding:30px 20px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%"></table>
                      <table style="border:1px solid rgba(0,0,0,0.1);border-radius:3px;overflow:hidden" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                        <tbody>
                          <tr>
                            <td>
                              <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/product_images/undefined-1698783203837" width="620" style="display:block;outline:none;border:none;text-decoration:none" />
                              <table width="100%" style="padding:20px 40px;padding-bottom:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                                <tbody style="width:100%">
                                  <tr style="width:100%">
                                    <td>
                                      <h1 style="font-size:32px;font-weight:bold;text-align:center; color:#2F5951;">Hi ${first_name},</h1>
                                      <h2 style="font-size:26px;font-weight:bold;text-align:center">Welcome to our TEAM</h2>
                                      <p style="font-size:16px;line-height:24px;margin:16px 0">
                                        Thank you for registering with <b><span style="color:#000000;">PRESTIGIOUS</span></b>.
                                        We're excited to have you join our Team as a Manager!
                                      </p>
                                      <p style="font-size:16px;line-height:24px;margin:16px 0">
                                        Your username: <b>${newUser.user_name}</b>
                                      </p>
                                      <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px">
                                        Your password: <b>${password}</b>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!-- Add a div to center-align the button -->
                              <div style="text-align: center;">
                                <table width="100%" style="padding:20px 40px;padding-top:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                                  <tbody style="width:100%">
                                    <tr style="width:100%">
                                      <td colSpan="3" style="display:flex;justify-content:center;width:100%">
                                        <a target="_blank" href="http://localhost:3000/login" style="background-color:#e00707;padding:0px 0px;border-radius:5px; color:#FFF;font-weight:bold;border:0.5px solid #EBE0DB;cursor:pointer;line-height:100%;text-decoration:none;display:inline-block;max-width:100%">
                                          <span></span><span style="background-color:#EBE0DB;padding:12px 30px;border-radius:3px;color:#2F5951;font-weight:bold;border:1px solid #EBE0DB;cursor:pointer;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">
                                            Go Back to website
                                          </span><span></span>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>            
            `,
    };

    if (transporter.sendMail(mailOptions)) {
      res
        .status(200)
        .json({ status: 200, message: "Add User successfully 😊 👌" });
    } else {
      res.status(400).json("Error sending email");
    }
  });
};

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  try {
    const users = await User.find({})
      .sort({ first_name: -1 })
      .skip((page - 1) * perPage);
    if (users) {
      const formattedUsers = users.map((user) => ({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        user_name: user.user_name,
        email: user.email,
        role: user.role,
        active: user.active,
        creation_date: user.creation_date,
        userImage: user.user_image,
      }));
      res.status(200).json({ status: 200, data: formattedUsers });
    } else {
      res.status(200).json({ status: 400, message: "No Users Found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUser = async (req, res) => {
  let idUser = req.params.id;
  await User.findById(idUser)
    .then((user) => {
      res.status(200).json({ status: 203, data: user });
    })
    .catch((error) => {
      res.status(404).json("Invalid user ID");
    });
};

const searchUser = async (req, res) => {
  try {
    const queryObject = req.query;
    console.log(queryObject);
    if (!queryObject.first_name) {
      res.status(400).json("Missing first_name parameter");
      return;
    }
    const users = await User.find({
      first_name: { $regex: new RegExp(queryObject.first_name, "i") },
    })
      .sort({ first_name: -1 })
      .limit(10)
      .exec();

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ status: 200, data: users });
  } catch (error) {
    console.error("Error searching for a user by first_name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const userUpdate = req.body;

    if (req.body.password) {
      let hash_password = md5(req.body.password);
      console.log(req.body.password);
      console.log(hash_password);
      req.body.password = hash_password;
      
    }
    const timeInMss = Date.now();
    userUpdate.last_update = timeInMss;
 
    const currentUser = await User.findById(idUser);

  
    const emailExist = await User.findOne({
      _id: { $ne: idUser }, // Exclude the user being updated
      email: userUpdate.email,
    });

    if (emailExist)
      return res.status(400).json({ message: `Email already exist` });

    if (userUpdate.user_image !== "") {
      const image = currentUser.user_image;
      if (image) {
        await cloudinary.uploader.destroy(image);
      }
      const newImage = await cloudinary.uploader.upload(userUpdate.user_image, {
        folder: "users/images/" + timeInMss,
        width: 1000,
        crop: "scale",
      });
      console.log(newImage);
      userUpdate.user_image = newImage.secure_url;
    }

    const doc = await User.findByIdAndUpdate(idUser, userUpdate, { new: true });

    res.status(200).json({
      success: true,
      doc,
      status: 200,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  let idUser = req.params.id;
  User.findByIdAndDelete(idUser)
    .then((user) => {
      res
        .status(200)
        .json({ status: 200, message: "user deleted successfully" });
    })
    .catch((error) => {
      res.status(404).json("invalid user id");
    });
};

module.exports = {
  logUser,
  addUser,
  getUsers,
  getUser,
  searchUser,
  updateUser,
  deleteUser,
};
