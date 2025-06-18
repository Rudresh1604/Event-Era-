const sendMail = require("../helper/sendMail");

const sponsorUsController = async (req, res) => {
  const user = req.body;
  console.log(req.body);

  console.log("Called request");

  try {
    let mailOption = {
      from: "rdharkar16@gmail.com",
      to: `${user.sponsoremail}`,
      subject: "Thanking you for contacting Us !",
      text: `Dear ${user.username},

Thank you for reaching out to us. We have received your inquiry and appreciate your interest in sponsoring our event.

Our team will review your message and get back to you as soon as possible.

Best regards,
DYPIEMR
`,
    };
    const customerAcknowledge = sendMail(mailOption);
    mailOption = {
      from: "rdharkar16@gmail.com",
      to: `rdharkar16@gmail.com`,
      subject: "Thanking you for contacting Us !",
      text: `Dear Team,

We have received a new sponsorship inquiry from ${user.username}.

Details of the inquiry:
- Sponsor's Name: ${user.username}
- Contact Information: ${user.sponsoremail} ${user.mobile}
- Message: ${user.message}

Please review the inquiry and follow up with the sponsor at your earliest convenience.

Best regards,
DYPIEMR

`,
    };
    const teamAcknowledge = sendMail(mailOption);

    if (customerAcknowledge && teamAcknowledge) {
      res.status(200).send("Thank You ! Registered Successfully");
    } else {
      res.status(400).send("Ooops ! Something went wrong");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = { sponsorUsController };
