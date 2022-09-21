import { empty } from "@apollo/client";
import Joi from "joi";

export const reviewSchema = Joi.object({
  relationship: Joi.string().required().messages({
    "string.empty": "relationship field is not allowed to be empty!",
  }),
  where: Joi.string().required().messages({
    "string.empty": "where field is not allowed to be empty!",
  }),
  rate: Joi.number().required().messages({
    "number.base": "rate field is not allowed to be empty!",
  }),
  description: Joi.string().allow(""),
});
