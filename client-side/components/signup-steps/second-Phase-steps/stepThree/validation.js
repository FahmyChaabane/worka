import Joi from "joi";

export const educationSchema = Joi.object({
  schoolName: Joi.string().required().messages({
    "string.empty": "school name field is not allowed to be empty!",
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
  degree: Joi.string().required().messages({
    "string.empty": "degree name field is not allowed to be empty!",
  }),
  stillStudying: Joi.boolean(),
});

// export const validate = async (educationInfos) => {
//   const options = { abortEarly: false };
//   const result = [];
//   educationInfos.forEach(async (item, index) => {
//     try {
//       await schema.validateAsync(item, options);
//     } catch (error) {
//       // console.log("DETAILS", error.details);

//       const itemErrors = {};
//       error.details.map((item) => {
//         return (itemErrors[item.path[0]] = item.path[1]
//           ? { ...itemErrors[item.path[0]], [item.path[1]]: item.message }
//           : item.message);
//       });
//       result[index] = itemErrors;
//     }
//   });
//   // console.log("RESULTTTT", result);
//   return result;
// };
