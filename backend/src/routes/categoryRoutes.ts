// gymapp/backend/src/routes/categoryRoutes.ts

import { Router } from "express";
import * as categoryController from "../controllers/categoryController.ts";

const router = Router();

router.post("/", categoryController.createCategory);
router.get("/user/:userId", categoryController.getCategoriesByUserId);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
