import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // deletes everything in the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // inserting users as from the import
    // users: is a dummy list of users
    const createdUsers = await User.insertMany(users);

    // looking for the first item in createdUsers [0],
    // because it is the first item in users.js, users array
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      // user:adminUser, in addition to the adminUser created above
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// process.argv:
// related to package.json script:
//   "data:destroy": "node backend/seeder -d"
//   "data:import": "node backend/seeder",
// (process.argv[2] === "-d") : it says if this "-d" in argument position index 2 destroy the data
// process.argv[0] node
// process.argv[1] v=backend/seeder
// process.argv[2] -d
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

//   "data:import": "node backend/seeder",
// import data, copies the users data from  `import users from "./data/users.js";`
// then hashes the password using bcryptjs
// all products now relate to the user which is sdminUser, sincve we did this:
// const sampleProducts = products.map((product) => {
//   return { ...product, user: adminUser };
//  });
