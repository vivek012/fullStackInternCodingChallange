import express from "express";
import {
    getStores,
    submitRating,
    updateRating,
    changePassword,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware..js";


const router = express.Router();

router.use(verifyToken);
router.use(authorizeRoles("USER"));

router.get("/stores", getStores);

router.post("/ratings", submitRating);

router.put("/ratings/:id", updateRating);

router.put("/change-password", changePassword);

export default router;