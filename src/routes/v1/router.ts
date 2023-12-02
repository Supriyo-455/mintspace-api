import express from 'express';
const router = express.Router();

import homeRoute from './blogsRoute';
import loginRoute from './loginRoute';
import signupRoute from './signupRoute';
import blogCreateRoute from './blogCreateRoute';
import profileRoute from './profileRoute';
import usersRoute from './usersRoute';

import jwtValidate from '../../middleware/jwtValidate';
import errorHandler from '../../middleware/errorHandler';

router.use('/blogs/', homeRoute);
router.use('/blogs/:id(\\d+)', homeRoute);
router.use('/users/', usersRoute);

router.use('/login', loginRoute);
router.use('/signup', signupRoute);

router.use('/create', [jwtValidate, blogCreateRoute]);
router.use('/profile', [jwtValidate, profileRoute]);

router.use(errorHandler);


export default router;