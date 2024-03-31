import { validationResult } from 'express-validator';
import authService from '../service/auth-service.js';
import ApiError from '../errors/api-error.js';
import UserModel from '../models/user-model.js';
import { createUserDto } from '../dto/userDto.js';
import libraryService from '../service/library-service.js';
import sectionService from '../service/section-service.js';

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errs = errors.array().map((error) => ({
          field: error.path,
          type: 'Server field error',
          message: error.msg,
        }));
        return next(ApiError.BadRequest('Validation error', errs));
      }

      const { email, password, username } = req.body;
      const { user, accessToken, refreshToken } = await authService.registration(email, password, username);
      res.cookie('token', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      libraryService.initLibrary(user);
      sectionService.initSections(user);

      return res.status(201).json({ user, token: accessToken });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const { user, accessToken, refreshToken } = await authService.login(email, password, username);
      res.cookie('token', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(200).json({ user, token: accessToken });
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { token } = req.cookies;
      const result = await authService.logout(token);
      res.clearCookie('token');
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { token } = req.cookies;
      const { user, accessToken, refreshToken } = await authService.refresh(token);
      // res.cookie('token', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.cookie('token', refreshToken, { maxAge: 60 * 1000, httpOnly: true });

      return res.status(200).json({ user, token: accessToken });
    } catch (e) {
      next(e);
    }
  }

  async initSession(req, res, next) {
    try {
      const { user: userData, token } = req;
      const user = await authService.initSession(userData.id);

      return res.json({ user, token });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
