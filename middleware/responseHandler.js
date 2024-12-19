const response_handler = (req, res) => {
    res.json({
        rc: res.locals.rc,
        rcMessage: res.locals.msg,
        data: res.locals.data,
    });
};

module.exports = response_handler;
