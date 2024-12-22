const { RoutineExercise, Exercise } = require("../models");

const getRoutineExec = async (req, res, next) => {
    const routineId = req.headers["routine_id"];
    try {
        const routData = await RoutineExercise.findAll({ where: { routine_id: routineId }, include: { model: Exercise, as: 'exercise' } });
        const data = JSON.parse(JSON.stringify(routData, null, 2));

        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Succeed";
        res.locals.data = data
        
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
    const routineId = req.headers["routine_id"];
    const exerciseId = req.headers["exercise_id"];
    const body = req.body;
    try {
        const data = {
            routine_id: routineId,
            exercise_id: exerciseId,
            set: body.set,
            repetition: body.repetition,
            weight: body.weight,
            note: body.note,
        }
        await RoutineExercise.create(data);
        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Succeed add exercise";
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

const edit = async (req, res, next) => {
    const body = req.body;
    let data = {};
    try {
        for (const key in body) {
            if (Object.prototype.hasOwnProperty.call(body, key)) {
                data[key] = body[key];
            }
        }
        await RoutineExercise.update(data, { where: { id: req.headers["id"] } });
        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Edit exercise succeed";
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
        await RoutineExercise.destroy({ where: { id: req.headers["id"] } });
        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Delete exercise succeed";
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

module.exports = { add, getRoutineExec, edit, destroy };