import { Router } from 'express';
import { updateUser, getUsers, getUserById, deleteUser ,addUser, getUserByEmail} from '../controllers/UserController.js';
import { validateUserData } from '../middleware/userValidation.js';

const usersRoute = Router(); 

usersRoute.put('/updateUser/:id', updateUser);
usersRoute.delete('/deleteUser/:id', deleteUser);
usersRoute.get('/getUsers', getUsers);
usersRoute.get('/getUser/:id', getUserById);
usersRoute.get('/getUser', getUserByEmail);
usersRoute.post('/addUser',validateUserData, addUser);

export default usersRoute;
