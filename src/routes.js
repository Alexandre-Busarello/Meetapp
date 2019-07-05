import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';

import multerConfig from './config/multer';
import MeetupController from './app/controllers/MeetupController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);
routes.put('/users', UserController.update);

routes.post('/meetups', MeetupController.validations, MeetupController.store);
routes.put(
  '/meetups/:id',
  MeetupController.validations,
  MeetupController.update
);

export default routes;
