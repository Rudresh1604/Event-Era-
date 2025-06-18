const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .catch((error) => console.log(error))
    .then(() => console.log("DB Connected ...."));
};

dbConnect();
