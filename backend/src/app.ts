import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();

app.use(cors());
app.use(morgan("dev")); // Logs HTTP requests to the console
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes); // <-- USE YOUR ROUTES
app.use("/api/categories", categoryRoutes); // <== this is for categories route

export default app;
