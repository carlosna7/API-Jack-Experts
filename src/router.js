import express from 'express';
import tasksController from './controllers/tasksController.js';
import usersController from './controllers/usersController.js';
import authenticateToken from './middleware.js';

const router = express.Router();

// tasks routes
router.get('/getTasks', authenticateToken, tasksController.getAll);
router.post('/createTask', authenticateToken, tasksController.createTask);
router.delete('/deleteTask', authenticateToken, tasksController.deleteTask);
router.patch('/completeTask', authenticateToken, tasksController.completeTask);

// user routes
router.post('/userRegister', usersController.userRegister);
router.post('/userLogin', usersController.userLogin);
router.get('/getUser', usersController.getUser);

export default router;