import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import meetupMiddleware from './app/middlewares/meetup';
import FileController from './app/controllers/FileController';

import multerConfig from './config/multer';
import MeetupController from './app/controllers/MeetupController';
import UserMeetupsController from './app/controllers/UserMeetupsController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);
routes.put('/users', UserController.update);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', meetupMiddleware, MeetupController.update);
routes.delete('/meetups/:id', meetupMiddleware, MeetupController.delete);

routes.get('/user-meetups', UserMeetupsController.index);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);
routes.delete(
  '/meetups/:meetupId/subscriptions',
  SubscriptionController.delete
);

export default routes;
