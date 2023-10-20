import { Router } from 'express';
import { getProjects,getProjectById,addProject,updateProject,deleteProject, getProjectsByTeamLeader,removeTeamMember,getTeamMembersByProjectId,updateProjectMembers,getProjectsByTeamMember} from '../controllers/ProjectController.js';
import { validateProjectData } from '../middleware/projectValidation.js';
const projectRoute = Router(); 

projectRoute.put('/updateProject/:id', updateProject);
projectRoute.delete('/deleteProject/:id', deleteProject);
projectRoute.get('/getProjects', getProjects);
projectRoute.get('/getProject/:id', getProjectById);
projectRoute.post('/addProject', addProject);
projectRoute.get('/my_projects/:teamleader', getProjectsByTeamLeader);
projectRoute.post('/remove_member/:projectId', removeTeamMember);
projectRoute.get('/getEmails/:projectId', getTeamMembersByProjectId);
projectRoute.put('/update_members/:projectId', updateProjectMembers);
projectRoute.get('/getMyProjects/:memberId', getProjectsByTeamMember);


export default projectRoute;
