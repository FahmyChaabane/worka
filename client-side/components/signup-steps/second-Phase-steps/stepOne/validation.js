import Joi from "joi";

export const stepOneSchema = Joi.object({
  expectations: Joi.array().items(Joi.string()).max(4).min(1).messages({
    "array.min": "for expectations you should select at least 1 item!",
  }),
  gender: Joi.string().valid("Male", "Female").messages({
    "string.empty": "gender field is not allowed to be empty!",
  }),
  location: Joi.object({
    country: Joi.string().required().messages({
      "string.empty": "country field is not allowed to be empty!",
    }),
    city: Joi.string().required().messages({
      "string.empty": "city field is not allowed to be empty!",
    }),
    address: Joi.string().required().messages({
      "string.empty": "address field is not allowed to be empty!",
    }),
  }),
  born: Joi.object({
    day: Joi.string().pattern(new RegExp("^[0-9]{1,2}$")).required().messages({
      "string.empty": "day field is not allowed to be empty!",
      "string.pattern.base": "day field format is invalid",
    }),
    month: Joi.string().required().messages({
      "string.empty": "month field is not allowed to be empty!",
    }),
    year: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
      "string.empty": "year field is not allowed to be empty!",
      "string.pattern.base": "year field format is invalid",
    }),
  }),
  domain: Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "domain name field is not allowed to be empty!",
    }),
    jobTitle: Joi.string().required().messages({
      "string.empty": "job title field is not allowed to be empty!",
    }),
  }),
  phoneNumber: Joi.object({
    countryCode: Joi.string().required().messages({
      "string.empty": "country code field is not allowed to be empty!",
    }),
    number: Joi.string().pattern(new RegExp("^[0-9]+$")).required().messages({
      "string.pattern.base": "the phone number input does only accept numbers",
      "string.empty": "phone number field is not allowed to be empty!",
    }),
  }),
});
