import ApiError from '../errors/api-error.js';
import UserModel from '../models/user-model.js';
import tokenService from './token-service.js';
import { comparePassword, hashPassword } from '../utils/password-utils.js';
import { createUserDto } from '../dto/userDto.js';
import { wait } from '../utils/wait.js';

class AuthService {
  async registration(email, password, username) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const userData = await UserModel.create({ email, password: hashedPassword, username });
    const user = createUserDto(userData);

    const tokens = tokenService.generateTokens({ id: user.id, username: username });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async login(email, password) {
    const userData = await UserModel.findOne({ email });
    if (!userData) throw ApiError.BadRequest('User with this email doesn`t exist');

    const isPasswordValid = await comparePassword(password, userData.password);
    if (!isPasswordValid) throw ApiError.BadRequest('Incorect password');

    const user = createUserDto(userData);
    const tokens = tokenService.generateTokens({ id: user.id, username: user.username });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logout(refreshToken) {
    const result = await tokenService.removeToken(refreshToken);
    return result;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) throw ApiError.Unauthorized();

    const user = createUserDto(await UserModel.findById(userData.id));

    const tokens = tokenService.generateTokens({ id: user.id, username: user.username });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async initSession(id) {
    const user = createUserDto(await UserModel.findOne({ _id: id }));

    // await wait(3000);

    return user;
  }
}

export default new AuthService();
