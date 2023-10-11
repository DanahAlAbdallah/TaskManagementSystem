import { Router } from 'express';
import { updateTask, getTasks, getTaskById, deleteTask ,addTask} from '../controllers/TaskController.js';
import { validateTaskData } from '../middleware/taskValidation.js';
const tasksRoute = Router(); 

tasksRoute.put('/updateTask/:id', updateTask);
tasksRoute.delete('/deleteTask/:id', deleteTask);
tasksRoute.get('/getTasks', getTasks);
tasksRoute.get('/getTask/:id', getTaskById);
tasksRoute.post('/addTask',validateTaskData, addTask);

export default tasksRoute;
