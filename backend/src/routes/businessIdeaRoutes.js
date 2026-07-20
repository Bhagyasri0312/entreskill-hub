import BusinessIdea from '../models/BusinessIdea.js';
import createCrudRouter from './createCrudRouter.js';

export default createCrudRouter(BusinessIdea, { publicRead: true });