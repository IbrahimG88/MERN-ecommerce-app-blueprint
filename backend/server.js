import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

/*
// middleware example:
app.use((err, req, res, next) => {
  // look the status code if its not 200 then return 500 with includes several errors, else send the status code
  const error = res.statusCode === 200 ? 500 : res.statusCode;
  ...
  the rest errorMiddlware.js file
});
*/

// if this explanation and code not clear check video 24 in the course Q and A
// these are middleware that's code gets executed with this requests above only not work
// imported from errorMiddleware.js file
// the middleware notFound will run only as its position in the compiling
// so it will give notFound error if this app.use("/api/products", productRoutes); returned not found and error 404
// not found it will pass the error to next
app.use(notFound);

// any error will take the form of this custom error handler:
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
