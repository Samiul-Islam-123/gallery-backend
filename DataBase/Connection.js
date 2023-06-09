const mongoose = require("mongoose");
const DBurl = `mongodb+srv://Samiul:hgzHf44vHUaTsJJH@cluster0.ehgoqfw.mongodb.net/?retryWrites=true&w=majority`;
const Connect = async () => {
  console.log("Attempting to connect with DataBase...");
  try {
    await mongoose.connect(DBurl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DataBase")
  } catch (error) {
    console.error(error);
  }
};

module.exports = Connect;