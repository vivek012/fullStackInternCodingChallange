import { Store, Rating, User } from "../models/index.js";
export const getDashboard = async (req, res) => {
    try {
        const store = await Store.findOne({
            where: {
                ownerId: req.user.id,
            },
        });

        if (!store) {
            return res.status(404).json({
                message: "Store not found",
            });
        }

        const ratings = await Rating.findAll({
            where: {
                storeId: store.id,
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"],
                },
            ],
        });

        const averageRating =
            ratings.length === 0
                ? 0
                : ratings.reduce((sum, item) => sum + item.rating, 0) /
                ratings.length;

        res.status(200).json({
            averageRating,
            users: ratings,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const isMatch = await bcrypt.compare(
            oldPassword,
            req.user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Old password is incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        req.user.password = hashedPassword;

        await req.user.save();

        res.status(200).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
