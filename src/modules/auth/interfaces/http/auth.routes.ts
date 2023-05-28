import { Router } from 'express';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';

import { UserInfrastructure } from '../../../user/infrastructure/user.infrastructure';
import { AuthApplication } from '../../application/auth.application';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthController } from './auth.controller';

const userInfrastructure: AuthRepository & UserRepository =
  new UserInfrastructure();
const authApplication = new AuthApplication(userInfrastructure);
const authController = new AuthController(authApplication);

class AuthRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post('/login', authController.login.bind(authController));
    this.router.get('/', authController.getUserList.bind(authController));
    this.router.post(
      '/new-access-token',
      authController.getNewAccessToken.bind(authController)
    );
  }
}

export const authRoutes = new AuthRoutes().router;
