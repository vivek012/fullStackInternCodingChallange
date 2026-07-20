import User from "./User.js";
import Store from "./Store.js";
import Rating from "./Rating.js";


User.hasMany(Store, {
    foreignKey: "ownerId",
    as: "stores",
});

Store.belongsTo(User, {
    foreignKey: "ownerId",
    as: "owner",
});


User.hasMany(Rating, {
    foreignKey: "userId",
});

Rating.belongsTo(User, {
    foreignKey: "userId",
});


Store.hasMany(Rating, {
    foreignKey: "storeId",
});

Rating.belongsTo(Store, {
    foreignKey: "storeId",
});

export { User, Store, Rating };