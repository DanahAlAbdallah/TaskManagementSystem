import { Router } from 'express';
import { addContact} from '../controllers/ContactController.js';
const contactRoute = Router();
contactRoute.post('/contactus', addContact);
export default contactRoute;