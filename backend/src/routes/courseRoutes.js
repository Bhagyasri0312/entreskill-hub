import Course from '../models/Course.js';
import createCrudRouter from './createCrudRouter.js';

export default createCrudRouter(Course, { publicRead: true });