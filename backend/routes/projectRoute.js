import { Router } from 'express';
import { getProjects,getProjectById,addProject,updateProject,deleteProject} from '../controllers/ProjectController.js';
import { validateProjectData } from '../middleware/projectValidation.js';
const projectRoute = Router(); 

projectRoute.put('/updateProject/:id', updateProject);
projectRoute.delete('/deleteProject/:id', deleteProject);
projectRoute.get('/getProjects', getProjects);
projectRoute.get('/getProject/:id', getProjectById);
projectRoute.post('/addProject', addProject);

export default projectRoute;
