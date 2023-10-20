import { Router } from 'express';
import { updateTask, getTasks, getTaskById, deleteTask ,addTask,getTasksByAssignedUserId,updateIsDone} from '../controllers/TaskController.js';
import { validateTaskData } from '../middleware/taskValidation.js';
const tasksRoute = Router(); 

tasksRoute.put('/updateTask/:id', updateTask);
tasksRoute.delete('/deleteTask/:id', deleteTask);
tasksRoute.get('/getTasks', getTasks);
tasksRoute.get('/getTask/:id', getTaskById);
tasksRoute.post('/addTask',validateTaskData, addTask);
tasksRoute.get('/userTask/:assignedUserId/:projectId',getTasksByAssignedUserId);
tasksRoute.put('/updateStatus/:taskId', updateIsDone);

export default tasksRoute;
