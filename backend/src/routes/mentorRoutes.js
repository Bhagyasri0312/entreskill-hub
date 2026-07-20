import Mentor from '../models/Mentor.js';
import createCrudRouter from './createCrudRouter.js';

export default createCrudRouter(Mentor, { publicRead: true });