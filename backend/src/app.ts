import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.ts";
import categoryRoutes from "./routes/categoryRoutes.ts";
import exerciseRoutes from "./routes/exerciseRoutes.ts";
import workoutRoutes from "./routes/workoutRoutes.ts";
import progressRoutes from "./routes/progressRoutes.ts";
import clerkRoutes from "./routes/clerkRoutes.ts";

const app = express();
const port = 5000;
app.use(cors());
app.use(morgan("dev")); // Logs HTTP requests to the console
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes); // <-- USE YOUR ROUTES
app.use("/api/categories", categoryRoutes); // <== this is for categories route
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/clerk", clerkRoutes);

app.listen(port, () => {
  console.log("the server is running");
});

export default app;
