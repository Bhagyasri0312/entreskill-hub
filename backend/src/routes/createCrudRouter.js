import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createCrudController } from '../controllers/resourceController.js';

const createCrudRouter = (Model, options = {}) => {
  const router = Router();
  const controller = createCrudController(Model, options);

  router.get('/', requireAuth, controller.list);
  router.post('/', requireAuth, controller.create);
  router.get('/:id', requireAuth, controller.getById);
  router.patch('/:id', requireAuth, controller.updateById);
  router.delete('/:id', requireAuth, controller.deleteById);

  return router;
};

export default createCrudRouter;