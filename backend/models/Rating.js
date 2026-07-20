import { DataTypes } from "sequelize";
import sequelize from "../confiq/db.js";

const Rating = sequelize.define("Ratings", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rating: {    
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["userId", "storeId"],
        },
    ],
},)

export default Rating