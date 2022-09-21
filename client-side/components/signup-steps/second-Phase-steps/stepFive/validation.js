import Joi from "joi";

export const stepFiveSchema = Joi.object({
  avatar: Joi.object().allow(null),
  // bio: Joi.string().required().messages({
  //   "string.empty": "bio field is not allowed to be empty!",
  // }),
  bio2: Joi.object().custom((value, helper) => {
    if (!value.getCurrentContent().hasText()) {
      return helper.message("bio2 field is not allowed to be empty!");
    } else {
      return true;
    }
  }),
});

export const checkMimeType = (file) => {
  const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  if (!types.includes(file.type))
    throw {
      details: [
        {
          path: ["avatar"],
          message:
            "please enter a valid photo format such as jpeg, png, etc.. ",
        },
      ],
    };
};

// export const validate = async (stepForm) => {
//   const errors = {};
//   try {
//     const options = { abortEarly: false };
//     // console.log("fahmy", stepForm.avatar);
//     await schema.validateAsync(stepForm, options);
//   } catch (error) {
//     // console.log(error);
//     console.log("DETAILS", error.details);
//     error.details.map((item) => {
//       return (errors[item.path[0]] = item.message);
//     });
//   }
//   try {
//     if (stepForm.avatar) checkMimeType(stepForm.avatar);
//   } catch (error) {
//     // console.log(error);
//     // console.log("DETAILS", error.details);
//     error.details.map((item) => {
//       return (errors[item.path[0]] = item.message);
//     });
//   }
//   return _.isEmpty(errors) ? null : errors;
// };
