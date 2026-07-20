import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { User, Store, Rating } from "../models/index.js";


export const getStores = async (req, res) => {
    try {
        const { search = "" } = req.query;

        const stores = await Store.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { address: { [Op.iLike]: `%${search}%` } },
                ],
            },
        });

        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const submitRating = async (req, res) => {
    try {
        const { storeId, rating } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5",
            });
        }

        const existing = await Rating.findOne({
            where: {
                userId: req.user.id,
                storeId,
            },
        });

        if (existing) {
            return res.status(400).json({
                message: "You have already rated this store",
            });
        }

        const newRating = await Rating.create({
            userId: req.user.id,
            storeId,
            rating,
        });

        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const updateRating = async (req, res) => {
    try {
        const { rating } = req.body;

        const userRating = await Rating.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });

        if (!userRating) {
            return res.status(404).json({
                message: "Rating not found",
            });
        }

        userRating.rating = rating;

        await userRating.save();

        res.status(200).json(userRating);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


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

        req.user.password = await bcrypt.hash(newPassword, 10);

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