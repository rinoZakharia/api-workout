const { User } = require("../models");
const bcrypt = require('bcrypt');

async function comparePassword(plaintextPassword, hashedPassword) {
    const result = await bcrypt.compare(plaintextPassword, hashedPassword);
    return result;
}

const register = async (req, res, next) => {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    try {
        const data = {
            username: body.username,
            email: body.email,
            password: hashedPassword
        }
        await User.create(data);
        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Succeed";
        next();
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400);
            res.locals.rc = "400";
            res.locals.msg = "Username or email already exists";
        } else if (error.name === 'SequelizeValidationError') {
            res.status(400);
            res.locals.rc = "400";
            res.locals.msg = error.errors.map(e => e.message).join(', ');
        } else {
            res.status(500);
            res.locals.rc = "500";
            res.locals.msg = "Internal server error";
        }
        next();
    }
}

module.exports = { register }