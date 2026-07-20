import bcrypt from "bcrypt";
import { User, Store, Rating } from "../models/index.js";
import { Op } from "sequelize";
import sequelize from "../confiq/db.js";


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

        await User.update(
            { password: hashedPassword },
            {
                where: {
                    id: req.user.id,
                },
            }
        );

        res.status(200).json({
            message: "Password changed successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.count();

        const totalStores = await Store.count();

        const totalRatings = await Rating.count();

        res.status(200).json({
            totalUsers,
            totalStores,
            totalRatings,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const addUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role,
        });

        res.status(201).json({
            message: "User Created Successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const addStore = async (req, res) => {
    try {
        const { name, email, address, ownerId } = req.body;

        const owner = await User.findOne({
            where: {
                id: ownerId,
                role: "OWNER",
            },
        });

        if (!owner) {
            return res.status(404).json({
                message: "Store owner not found",
            });
        }

        const store = await Store.create({
            name,
            email,
            address,
            ownerId,
        });

        

        res.status(201).json({
            message: "Store Added Successfully",
            store,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllUsers = async (req, res) => {

    try {
        const { search = "", sortBy = "name", order = "ASC" } = req.query;
        
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { email: { [Op.iLike]: `%${search}%` } },
                    { address: { [Op.iLike]: `%${search}%` } },
                    { role: { [Op.iLike]: `%${search}%` } },
                ],
            },
            attributes: {
                exclude: ["password"],
            },
            order: [[sortBy, order]],
        });
    console.log({users})

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllStores = async (req, res) => {
    try {
        console.log("Search:", req.query.search);
        const { search = "", sortBy = "name", order = "ASC" } = req.query;

        const stores = await Store.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { email: { [Op.iLike]: `%${search}%` } },
                    { address: { [Op.iLike]: `%${search}%` } },
                ],
            },
            include: [
                {
                    model: User,
                    as: "owner",
                    attributes: ["id", "name", "email"],
                },
                {
                    model: Rating,
                    attributes: [],
                },
            ],
            attributes: {
                include: [
                    [
                        sequelize.fn("COALESCE",
                            sequelize.fn("AVG", sequelize.col("Ratings.rating")),
                            0
                        ),
                        "averageRating",
                    ],
                ],
            },
            group: ["Store.id", "owner.id"],
            order: [[sortBy, order]],
        });


        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getOwners = async (req, res) => {
    try {
        const owners = await User.findAll({
            where: {
                role: "OWNER",
            },
            attributes: ["id", "name"],
        });

        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ["id", "name", "email", "address", "role"],
            include: [
                {
                    model: Store,
                    as: "stores",
                    attributes: ["id", "name"],
                    include: [
                        {
                            model: Rating,
                            attributes: ["rating"],
                        },
                    ],
                },
            ],
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const response = user.toJSON();

        if (response.stores) {
            response.stores = response.stores.map((store) => {
                const ratings = store.Ratings || [];

                const averageRating =
                    ratings.length === 0
                        ? 0
                        : ratings.reduce(
                            (sum, rating) => sum + rating.rating,
                            0
                        ) / ratings.length;

                return {
                    id: store.id,
                    name: store.name,
                    averageRating: Number(averageRating.toFixed(1)),
                };
            });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};