const axios = require("axios");
const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const sendMail = require("../gmail");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Configure milter storage cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "college",
    format: async (req, file) => "png",
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
    transformation: [
      {
        width: 1000,
        height: 1000,
        crop: "fill",
      },
    ],
  },
});

const upload = multer({
  storage,
  limits: 1024 * 1020 * 5, //5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image", false));
    }
  },
});

// ! for csi event participants register
router.post("/csi-register", upload.single("reciept"), async (req, res) => {
  const user = req.body;
  console.log(user);
  if (req.file == undefined || !user) {
    res
      .status(200)
      .send({ message: "All fields are required", success: false });
    return;
  }
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    console.log(UserData);
    const mailOption = {
      from: "rdharkar16@gmail.com",
      to: `${user.email}`,
      subject: "Your Registration for CSI Event has been successful",
      text: `Dear ${user.fullname},
      
We are pleased to confirm your registration for CSI Event . Thank you for signing up!

Event Details:
- Event Name: CSI Tech Event
- Date: 12/07/2024
- Time: 10:00 AM 
- Venue: DYPIEMR Campus

We look forward to seeing you at the event.

Best regards,
CSI Club
DYPIEMR
`,
    };
    const acknowledgeEmail = sendMail(mailOption);
    if (UserData) {
      res.status(200).send({
        data: UserData,
        message: "Thank You ! Registered Successfully",
        success: true,
      });
    } else {
      res
        .status(200)
        .send({ message: "Ooops ! Something went wrong", success: false });
    }
  } catch (error) {
    // console.log(error);
    res.status(200).send(error);
  }
});

// ! for coders event participants register
router.post("/coders-register", upload.single("reciept"), async (req, res) => {
  const user = req.body;
  if (req.file == undefined || !user) {
    res.status(200).send({ message: "No file selected", success: false });
    return;
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const mailOption = {
      from: "rdharkar16@gmail.com",
      to: `${user.email}`,
      subject: "Your Registration for CSI Event has been successful",
      text: `Dear ${user.fullname},

We are pleased to confirm your registration for CSI Event . Thank you for signing up!

Event Details:
- Event Name: CSI Tech Event
- Date: 12/07/2024
- Time: 10:00 AM 
- Venue: DYPIEMR Campus

We look forward to seeing you at the event.

Best regards,
CSI Club
DYPIEMR
`,
    };
    if (UserData) {
      res.status(200).send({
        data: UserData,
        message: "Thank You ! Registered Successfully",
        success: true,
      });
    } else {
      res
        .status(200)
        .send({ message: "Ooops ! Something went wrong", success: false });
    }
  } catch (error) {
    res.status(200).send(error);
  }
});

module.exports = router;
