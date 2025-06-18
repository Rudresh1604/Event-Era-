const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Club } = require("../models/clubModel");

async function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: "3d" });
}

// ! Register user
const registerAdminController = async (req, res) => {
  const { name, email, password, pic, club, role, secretKey } = req.body;
  console.log("register ");

  if (!name || !email || !password || !club || !role) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  console.log(name);

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send("User already exists");
  }
  let isMain = false;
  let resultClub = null;
  if (secretKey == "dypiemr") {
    isMain = true;
    resultClub = "dypiemr";
  } else {
    resultClub = await Club.findOne({ clubName: club });
  }
  // the president must be member of other club
  if (!resultClub) {
    return res.status(400).send("Invalid Club !");
  }

  const user = await User.create({
    name,
    email,
    password,
    isMainAdmin: isMain ? true : false,
    pic,
    club: resultClub,
    role,
  });
  console.log(user);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isMainAdmin: user.isMainAdmin,
      pic: user.pic,
      club: club,
      role: role,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};

const adminLoginController = async (req, res) => {
  let { password, email, role, club } = req.body;
  console.log(req.body);

  if (!password || !email || !role) {
    return res.status(400).send("Please Enter all the Feilds");
  }
  try {
    const user = await User.findOne({ email }).populate("club");
    console.log(user);

    if (user && user.matchPassword(password)) {
      let userInfoToken = await generateToken(user._id);
      const token = await jwt.sign(
        {
          _id: user._id,
          name: user.name,
          club: user.club,
          pic: user.pic,
          isMainAdmin: user.isMainAdmin,
          role: user.role,
          token: userInfoToken,
        },
        process.env.JWT_KEY,
        { expiresIn: "2hr" }
      );

      res.cookie("token", token, {
        maxAge: 3 * 60 * 60 * 1000,
        httpOnly: false,
      });

      return res.status(200).send({
        token: userInfoToken,
        club: user.club,
        message: "Log In Successfully",
        success: true,
      });
    }

    return res.status(401).send("Invalid Email or Password");
  } catch (error) {
    console.log(error);

    return res.status(400).send(error.message);
  }
};

// /api/user?search=par
const allUserController = async (req, res) => {
  try {
    console.log("Search user ...");

    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword);
    console.log(users);

    res.status(200).send(users);
    // .find({_id:{$ne:req.user._id}})
    console.log(keyword);
  } catch (error) {}
};

module.exports = {
  adminLoginController,
  registerAdminController,
  allUserController,
};
