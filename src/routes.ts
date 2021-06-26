import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUsersController } from './controllers/ListUserController'
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController'
import { ListUserComplimentsSentController } from './controllers/ListUserSentComplimentsController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
const router = Router()

const authenticateUserController = new AuthenticateUserController()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()

const listUserComplimentsSentController =
  new ListUserComplimentsSentController()
const listUserReceivedComplimentsController =
  new ListUserReceivedComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

router.post('/login', authenticateUserController.handle)
router.post('/users', createUserController.handle)
router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
)
router.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle
)

router.get(
  '/users/compliments/sent',
  ensureAuthenticated,
  listUserComplimentsSentController.handle
)
router.get(
  '/users/compliments/received',
  ensureAuthenticated,
  listUserReceivedComplimentsController.handle
)
router.get('/tags', ensureAuthenticated, listTagsController.handle)
router.get('/users', ensureAuthenticated, listUsersController.handle)

export { router }
