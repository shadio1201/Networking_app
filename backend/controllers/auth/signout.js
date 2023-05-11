require('dotenv').config();
const pool = require('../../utilities/database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res, next) => {

    const refresh_token = req.cookies['0_0'];
    await pool.query(`DELETE FROM tokens WHERE refreshToken=$1`, [refresh_token]);

    res.cookie('0_0', '');

    next();

}