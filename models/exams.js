const Sequelize = require("sequelize");

const sequelize = require("../utils/connect");

const Exam = sequelize.define("exam", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true
  },
  entry: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  weight: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  glucose: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  pressure: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
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
