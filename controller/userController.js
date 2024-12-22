const { User } = require("../models");
const bcrypt = require('bcrypt');
const { check, validationResult, checkExact, header } = require('express-validator');

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

const login = async (req, res, next) => {
    const body = req.body;
    const token = await bcrypt.hash(body.password, 10);
    try {
        const data = { token: token }
        const userData = await User.findOne({ where: { email: body.email } });
        const pass = await comparePassword(body.password, userData.password);
        if (userData === null || pass === false) {
            res.status(404);
            res.locals.rc = "404";
            res.locals.msg = "Invalid Email or Password";
        } else {
            await User.update(data, { where: { email: body.email } });
            res.status(200);
            res.locals.rc = "200";
            res.locals.msg = "Login Succeed";
            res.locals.data = {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                token: token,
            }
        }
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

const logout = async (req, res, next) => {
    const body = req.body;
    try {
        const userData = await User.findOne({ where: { id: body.userid } });
        if (userData === null) {
            res.status(404);
            res.locals.rc = "404";
            res.locals.msg = "Invalid User ID";
        } else {
            await User.update({ token: null }, { where: { id: body.userid } });
            res.status(200);
            res.locals.rc = "200";
            res.locals.msg = "Logout Succeed";
        }
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

const checkSession = async (req, res, next) => {
    const body = req.body;
    try {
        const userData = await User.findOne({ where: { token: body.token } });
        if (userData === null) {
            res.status(401);
            res.locals.rc = "401";
            res.locals.msg = "User unauthenticated";
        } else {
            res.status(200);
            res.locals.rc = "200";
            res.locals.msg = "Login Succeed";
            res.locals.data = {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                token: userData.token,
            }
        }
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

const editProfile = [
    checkExact([
        check('username')
            .optional(),
        check('email')
            .optional()
            .isEmail()
            .withMessage("Must be an email!"),
        check('password')
            .optional(),
        header('id')
            .notEmpty()
            .withMessage("Required User ID"),
    ]),

    async (req, res, next) => {
        const errors = validationResult(req);
        let err = [];
        if (!errors.isEmpty()) {
            const err = errors.array().map(error => ({
                message: error.msg,
            }));
            res.status(400);
            res.locals.rc = "400";
            res.locals.msg = { error: err };
            return next();
        }
        const body = req.body;
        let data = {};
        try {
            for (const key in body) {
                if (Object.prototype.hasOwnProperty.call(body, key)) {
                    data[key] = body[key];
                }
            }
            await User.update(data, { where: { id: req.headers["id"] } });
            res.status(200);
            res.locals.rc = "200";
            res.locals.msg = "Edit Succeed";
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
];

const getuser = async (req, res, next) => {
    const id = req.headers["id"];
    try {
        const userData = await User.findByPk(id);
        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Succeed";
        res.locals.data = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            token: userData.token,
        }
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


module.exports = { register, login, logout, checkSession, editProfile, getuser }