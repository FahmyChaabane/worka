import Joi from "joi";

export const singupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name field is not allowed to be empty!",
  }),
  surname: Joi.string().required().messages({
    "string.empty": "surname field is not allowed to be empty!",
  }),
  email: Joi.string().required().email({ tlds: false }).messages({
    "string.empty": "email field is not allowed to be empty!",
    "string.email": "email field must be a valid email!",
  }),
  password: Joi.string().min(5).required().messages({
    "string.empty": "password field is not allowed to be empty!",
    "string.min": `password field should have a minimum length of 5`,
  }),
  repeatpassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "this field does not match with the referenced password",
    "string.empty": "repeat password field is not allowed to be empty!",
  }),
});
