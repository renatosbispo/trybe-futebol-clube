import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import SchemaValidator from '../lib/schema-validator';

export default class RequestValidationMiddleware {
  protected schemas: Schema[];

  protected validationTargets: unknown[];

  constructor(schemas: Schema[], validationTargets: unknown[]) {
    this.schemas = schemas;
    this.validationTargets = validationTargets;
  }

  public async validate(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      this.schemas.forEach(
        (schema, index) => SchemaValidator.validate(schema, this.validationTargets[index]),
      );

      next();
    } catch (error) {
      next(error);
    }
  }
}
