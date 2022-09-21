import Joi from "joi";

export const occupationSchema = Joi.object({
  companyName: Joi.string().required().messages({
    "string.empty": "company name field is not allowed to be empty!",
  }),
  from: Joi.object({
    month: Joi.string().required().messages({
      "string.empty": "month field is not allowed to be empty!",
    }),
    year: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
      "string.empty": "year field is not allowed to be empty!",
      "string.pattern.base": "year field format is invalid",
    }),
  }),
  to: Joi.object({
    month: Joi.string().required().messages({
      "string.empty": "month field is not allowed to be empty!",
    }),
    year: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
      "string.empty": "year field is not allowed to be empty!",
      "string.pattern.base": "year field format is invalid",
    }),
  }),
  post: Joi.string().required().messages({
    "string.empty": "post name field is not allowed to be empty!",
  }),
  stillWorking: Joi.boolean(),
});
