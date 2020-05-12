const Sequelize = require("sequelize");

const sequelize = require("../utils/connect");

const Exam = sequelize.define("exam", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  examWeight: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  examGlucose: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  examPressure: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Exam;
