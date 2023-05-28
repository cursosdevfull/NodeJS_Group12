import * as httpMock from 'node-mocks-http';

import RedisBootstrap from '../../src/bootstrap/Redis.bootstrap';
import { UserApplication } from '../../src/modules/user/application/user.application';
import { UserRepository } from '../../src/modules/user/domain/repositories/user.repository';
import { UserInfrastructure } from '../../src/modules/user/infrastructure/user.infrastructure';
import { UserController } from '../../src/modules/user/interfaces/http/user.controller';
import mockUsers from '../mocks/users.json';

let request: any;
let response: any;
let next: any;
let mockUserOne: any;

describe('UserController', () => {
  beforeAll(() => {
    mockUserOne = mockUsers[0];

    (UserApplication as jest.Mock) = jest.fn().mockReturnValue({
      getAll: jest.fn().mockResolvedValue({
        isErr: () => false,
        isOk: () => true,
        value: mockUsers.map((el: any) => {
          el['properties'] = () => el;
          return el;
        }),
      }),
      get: jest.fn().mockResolvedValue({
        isErr: () => false,
        isOk: () => true,
        value: mockUserOne,
      }),
    });
    (UserInfrastructure as jest.Mock) = jest.fn();
  });

  beforeEach(() => {
    request = httpMock.createRequest();
    response = httpMock.createResponse();
    next = jest.fn();
  });

  it('getAll', async () => {
    // Arrange
    const mockSet = jest.fn();
    RedisBootstrap.set = mockSet;

    const userInfrastructure: UserRepository = new UserInfrastructure();
    const userApplication = new UserApplication(userInfrastructure);
    const userController = new UserController(userApplication);

    // Act
    await userController.getAll(request, response, next);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(mockSet).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledTimes(1);
    expect(userApplication.getAll).toHaveBeenCalled();
  });

  it('getOne', async () => {
    // Arrange
    const id = '227b5c7c-35f4-44f5-af15-bbf508d24d23';
    request.params.id = id;
    const userInfrastructure: UserRepository = new UserInfrastructure();
    const userApplication = new UserApplication(userInfrastructure);
    const userController = new UserController(userApplication);

    // Act
    await userController.getOne(request, response, next);

    // Assert
    console.log('response._getJSONData()', response._getJSONData());
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().id).toBe(mockUserOne.id);
    expect(response._getJSONData().name).toBe(mockUserOne.name);
    expect(response._getJSONData().lastname).toBe(mockUserOne.lastname);
  });
});
