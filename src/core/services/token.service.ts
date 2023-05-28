import { addMinutes } from 'date-fns';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { Parameters } from '../../helpers/Parameters';
import { User } from '../../modules/user/domain/user';
import { IError } from '../error/error.interface';

export class TokenService {
  static generateAccessToken(user: User) {
    const currentDate = new Date();
    const expireDate = addMinutes(new Date(), Parameters.TOKEN_EXPIRATION);

    const propertiesUser = user.properties();

    const payload = {
      name: propertiesUser.name,
      lastname: propertiesUser.lastname,
      email: propertiesUser.email,
      roles: propertiesUser.roles,
      iat: currentDate.getTime(),
      exp: expireDate.getTime(),
    };

    return jwt.sign(payload, Parameters.SECRET_KEY_WORD);
  }

  static generateRefreshToken() {
    return uuidv4();
  }

  static validateAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, Parameters.SECRET_KEY_WORD, (error, payload) => {
        if (error) {
          const err: IError = new Error();
          if (error.message === 'jwt expired') {
            err.status = 403;
            err.message = 'Token expired';
            err.stack = 'Token expired';
          } else {
            err.status = 401;
            err.message = 'Unauthorized';
            err.stack = 'Unauthorized';
          }
          reject(err);
        }
        resolve(payload);
      });
    });
  }
}
