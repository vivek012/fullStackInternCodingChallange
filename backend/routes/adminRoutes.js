import express from "express";
import {
    addStore, addUser, getDashboard, getAllUsers,
    getAllStores,
    getUserById,
    getOwners,
    changePassword,
} from "../controllers/adminController.js";





import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware..js";


const router = express.Router();

router.use(verifyToken);
router.put("/change-password", changePassword);
router.use(authorizeRoles("ADMIN"));

router.get("/dashboard", getDashboard);

router.post("/users", addUser);

router.post("/stores", addStore);

router.get("/users", getAllUsers);

router.get("/stores", getAllStores);

router.get("/users/:id", getUserById);

router.get("/owners", getOwners);

export default router;