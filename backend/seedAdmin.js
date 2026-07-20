import bcrypt from "bcrypt";
import sequelize from "./confiq/db.js";
import User from "./models/User.js";

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();

        const existingAdmin = await User.findOne({
            where: {
                email: "admin@example.com",
            },
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await User.create({
            name: "System Administrator",
            email: "admin@example.com",
            password: hashedPassword,
            address: "Head Office",
            role: "ADMIN",
        });

        console.log("✅ Admin created successfully!");
        console.log("Email: admin@example.com");
        console.log("Password: Admin@123");

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();