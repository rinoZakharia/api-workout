const { Op } = require("sequelize");
const { Exercise } = require("../models");

const getExercise = async (req, res, next) => {
    const body = req.body;
    try {
        let queryOptions = {};
        if (body.search && body.search.trim() !== '') {
            queryOptions.where = {
                [Op.or]: [
                    { name: { [Op.like]: `%${body.search}%` } },
                    { equipment: { [Op.like]: `%${body.search}%` } },
                    { muscle: { [Op.like]: `%${body.search}%` } }
                ]
            };
        }
        const data = await Exercise.findAll(queryOptions);
        const dataExer = JSON.parse(JSON.stringify(data, null, 2));
        res.status(200);
        res.locals.rc = "200";
        res.locals.msg = "Succeed";
        res.locals.data = { dataExer }
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

module.exports = { getExercise }