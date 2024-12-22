const express = require('express');
const user = require('./controller/userController')
const routine = require('./controller/routineController')
const routineExer = require('./controller/routineExerController')
const exercise = require('./controller/exerciseController')
const router = express.Router();
const { body, validationResult } = require('express-validator');

// User
router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);
router.post('/check-session', user.checkSession);
router.post('/profile', user.editProfile);
router.get('/profile', user.getuser);

// Routine
router.post('/add-routine', routine.add);
router.get('/routine', routine.getRoutine);
router.post('/edit-routine', routine.edit);
router.post('/delete-routine', routine.destroy);

// Routine Exercise
router.post('/add-routine-exercise', routineExer.add);
router.get('/routine-exercise', routineExer.getRoutineExec);
router.post('/edit-routine-exercise', routineExer.edit);
router.post('/delete-routine-exercise', routineExer.destroy);

// Exercise
router.get('/exercise', exercise.getExercise);
module.exports = router;
