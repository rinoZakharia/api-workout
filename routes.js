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

// Swagger
// User
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user with a username, email, and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully registered the user.
 *       400:
 *         description: Bad request, invalid data or email/username already exists.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Endpoint to authenticate a user by email and password, returning a token if successful.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, returns user data with token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The generated token for the user.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid email or password.
 *       404:
 *         description: User not found or password mismatch.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     description: Endpoint to log the user out by invalidating the user's token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 description: The user's unique ID.
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Successfully logged out, token invalidated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rc:
 *                   type: string
 *                   description: Response code.
 *                   example: "200"
 *                 msg:
 *                   type: string
 *                   description: Message describing the result of the request.
 *                   example: "Logout Succeed"
 *       '400':
 *         description: Invalid user ID.
 *       '404':
 *         description: User not found with the provided ID.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /check-session:
 *   post:
 *     summary: Check if the user session is still valid
 *     description: Endpoint to check if the user is authenticated by verifying the token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The user's authentication token.
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       '200':
 *         description: User is authenticated, returns user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rc:
 *                   type: string
 *                   description: Response code.
 *                   example: "200"
 *                 msg:
 *                   type: string
 *                   description: Message describing the result of the request.
 *                   example: "Login Succeed"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user's ID.
 *                       example: 1
 *                     username:
 *                       type: string
 *                       description: The user's username.
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       description: The user's email address.
 *                       example: "john@example.com"
 *                     token:
 *                       type: string
 *                       description: The user's authentication token.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: User is unauthenticated, invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rc:
 *                   type: string
 *                   description: Response code.
 *                   example: "401"
 *                 msg:
 *                   type: string
 *                   description: Error message.
 *                   example: "User unauthenticated"
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rc:
 *                   type: string
 *                   description: Response code.
 *                   example: "500"
 *                 msg:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Edit user profile
 *     description: This endpoint allows a user to update their profile. The request body may include `username`, `email`, and `password`. If a `password` is provided, it will be hashed before updating. The `id` header is required to identify the user to be updated.
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: id
 *         required: true
 *         description: The user ID to identify the user to be updated. This ID is passed in the header.
 *         schema:
 *           type: integer
 *           example: "12"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's new password. If provided, it will be hashed.
 *                 example: newsecurepassword123
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rc:
 *                   type: string
 *                   example: "200"
 *                 msg:
 *                   type: string
 *                   example: "Edit Succeed"
 *       400:
 *         description: Bad request, validation errors or username/email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rc:
 *                   type: string
 *                   example: "400"
 *                 msg:
 *                   type: string
 *                   example: "Username or email already exists"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rc:
 *                   type: string
 *                   example: "500"
 *                 msg:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put('/edit-profile', user.editProfile);



module.exports = router;
