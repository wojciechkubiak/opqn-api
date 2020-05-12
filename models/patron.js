const Sequelize = require("sequelize");

const sequelize = require("../utils/connect");

const Patron = sequelize.define("patron", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: {
      type: Sequelize.TEXT,
      allowNull: false
  },
  lastname: {
      type: Sequelize.TEXT,
      allowNull: false
  },
  mail: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
      type: Sequelize.TEXT,
      allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});

module.exports = Patron;
