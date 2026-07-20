import { DataTypes } from "sequelize";
import sequelize from "../confiq/db.js";


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[3,60],
        },
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail:true
        },
        
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    address: {
        type: DataTypes.STRING(400),
        allowNull:false
    },
    role: {
        type: DataTypes.ENUM("ADMIN", "USER", "OWNER"),
        allowNull: false,
        defaultValue: "USER",
    }
}, { timestamps: true })

export default User;