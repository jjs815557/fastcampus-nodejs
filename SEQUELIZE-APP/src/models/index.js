const Sequelize = require('sequelize');

const dbCofig = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'password',
    PORT: "5432",
    DB: 'postgres',
    dialect: 'postgres',
}

const sequelize = new Sequelize(dbCofig.DB, dbCofig.USER, dbCofig.PASSWORD, {
    host: dbCofig.HOST,
    dialect: dbCofig.dialect,
    port: dbCofig.PORT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;