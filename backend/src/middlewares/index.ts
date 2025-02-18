import { Request, Response, NextFunction } from 'express';

export class Middleware {
  static TOKEN_SERVICE: string;

	static async authorize(req: Request, res: Response, next: NextFunction) {
    Middleware.TOKEN_SERVICE = '';

		const { authorization } = req.headers;
		if (!authorization) {
			res.status(403).json({ error: 'Unauthorized' });
			return;
		}

		const [, token] = authorization.split(' ');

		if (!token) {
			res.status(403).json({ error: 'Unauthorized' });
			return;
		}
    Middleware.TOKEN_SERVICE = token;
		return next();
	}
}
