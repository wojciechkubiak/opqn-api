const Sequelize = require("sequelize");

const sequelize = require("../utils/connect");

const Protege = sequelize.define("protege", {
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
  birthday: {
      type: Sequelize.DATE,
      allowNull: false
  },
  phone: {
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

module.exports = Protege;
