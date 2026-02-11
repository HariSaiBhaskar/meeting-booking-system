const { Sequelize } = require("sequelize");

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize("meeting_booking", "postgres", "123", {
      host: "localhost",
      dialect: "postgres",
      logging: false
    });

module.exports = sequelize;
