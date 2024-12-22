const { Routine, User } = require("../models");

const getRoutine = async (req, res, next) => {
    const userId = req.headers["user_id"];
    try {
        const userData = await User.findByPk(userId, { include: { model: Routine, as: 'routines' } });
        const data = JSON.parse(JSON.stringify(userData, null, 2));

        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Succeed";
        res.locals.data = {
            id: data.id,
            username: data.username,
            email: data.email,
            token: data.token,
            routines: data.routines
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

const add = async (req, res, next) => {
    const userId = req.headers["user_id"];
    const body = req.body;
    try {
        const data = {
            user_id: userId,
            name: body.name
        };
        const routine = await Routine.create(data);
        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Succeed create new routine";
        res.locals.data = routine.id;
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
};

const edit = async (req, res, next) => {
    const body = req.body;
    try {
        const data = {
            name: body.name
        }
        await Routine.update(data, { where: { id: req.headers["id"] } });
        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Edit routine succeed";
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

const destroy = async (req, res, next) => {
    try {
        await Routine.destroy({ where: { id: req.headers["id"] } });
        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Delete routine succeed";
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

module.exports = { add, getRoutine, edit, destroy };