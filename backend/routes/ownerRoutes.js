import express from "express";
import {
    getDashboard,
    changePassword,
} from "../controllers/ownerController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware..js";


const router = express.Router();

router.use(verifyToken);
router.use(authorizeRoles("OWNER"));

router.get("/dashboard", getDashboard);

router.put("/change-password", changePassword);

export default router;