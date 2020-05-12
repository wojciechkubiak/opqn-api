import 'dotenv/config';

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.LOCAL_NAME || process.env.HR_NAME,
    process.env.LOCAL_USER || process.env.HR_USER,
    process.env.LOCAL_PASS || process.env.HR_PASS, {
        dialect: 'postgres',
        host: process.env.LOCAL_HOST || process.env.HR_HOST
    })

module.exports = sequelize;