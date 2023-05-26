import { FieldNode, parse } from 'graphql';
import { JwtPayload, verify } from 'jsonwebtoken';
import { CustomError } from '../Errors/CustomError';
import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

const UN_PROTECTED_ROUTES = ['login', 'createUser'];

const getToken = (authorization: string): string => {
  if (!authorization.startsWith('Bearer'))
    throw new CustomError('Unauthorized: Invalid token', '401');
  const [, token] = authorization.split(' ');
  if (!token) throw new CustomError('Unauthorized: Invalid token', '401');
  return token;
};

const isProtectedRoute = (query: string): boolean => {
  const {
    definitions: [operation],
  } = parse(query);
  const route =
    operation.kind === 'OperationDefinition'
      ? (operation.selectionSet.selections[0] as FieldNode).name.value
      : '';
  const isProtectedRoute = !UN_PROTECTED_ROUTES?.includes(route);
  return isProtectedRoute;
};

const getUserIdFromToken = (authorization: string | undefined): string => {
  if (!authorization)
    throw new CustomError('Unauthorized: Invalid token', '401');

  const token = getToken(authorization);
  const secret = process.env.JWT_SECRET || '';
  const decode = () => {
    try {
      return verify(token, secret) as JwtPayload;
    } catch (error) {
      throw new CustomError(`Unauthorized: ${(error as Error).message}`, '401');
    }
  };
  const decoded = decode();

  return decoded.userId;
};

const validateUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new CustomError('Unauthorized: Invalid token', '401');
};

const authValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!isProtectedRoute(req.body.query)) return next();

    const id = getUserIdFromToken(req?.headers?.authorization);
    await validateUser(id);
    req.headers.userId = id;
    return next();
  } catch (error) {
    res.status(200).json({ errors: [error] });
  }
};

export default authValidator;
