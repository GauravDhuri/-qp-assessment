import Joi from "joi";
import { VALIDATE_MODULE_NAME } from "../../config/constants";
const GROCERY = VALIDATE_MODULE_NAME.GROCERY.route;

export default function grocerySchema(name: string) {
  switch(name) {
    case GROCERY.FETCH:
      return Joi.object({
        name: Joi.string(),
        groupByCategory: Joi.boolean()
      })
    case GROCERY.ADD:
      return Joi.object({
        groceries: Joi.array().items({
          name: Joi.string().required(),
          description: Joi.string().required().allow(""),
          category: Joi.string().required(),
          price: Joi.number().required(),
          quantity: Joi.number().required()
        })
      })
    default: return Joi.object({});
  }
}