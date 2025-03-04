import { VALIDATE_MODULE_NAME } from "../../config/constants";
import grocerySchema from "./grocery";
import Joi, { Schema, ValidationErrorItem } from "joi";
import { NextFunction, Request, Response } from "express";

function validator(module: string, route: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const schema = getSchema(module, route);
    const validateErr = validate(req.body, schema);
    
    if (!validateErr) {
      return next();
    } else {
      const formattedErrors = validateErr.map((err) => err.replace(/''/g, ''));
      return res.status(200).json({ success: false, msg: 'INSUFFICIENT_PARAMS', data: formattedErrors });
    }
  };
}

function validate(data: any, schema: Schema): string[] | null {
  try {
    const result = schema.validate(data, { abortEarly: false });
    if (result.error) {
      return [...new Set(result.error.details.map((detail: ValidationErrorItem) => detail.message))];
    }
    return null;
  } catch (error) {
    console.error('Validation failed:', error);
    return ['Failed to validate'];
  }
}

function getSchema(moduleName: string, routeName: string): Schema {
  switch (moduleName) {
    case VALIDATE_MODULE_NAME.GROCERY.module:
      return grocerySchema(routeName);
    default:
      return Joi.object({});
  }
}

export {
  validator
}