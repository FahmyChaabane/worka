// export const validate = async (schema, inputs) => {
//   try {
//     const options = { abortEarly: false };
//     await schema.validateAsync(inputs, options);
//   } catch (error) {
//     console.log("DETAILS", error.details);
//     const errors = {};
//     error.details.map((item) => {
//       return (errors[item.path[0]] = item.path[1]
//         ? { ...errors[item.path[0]], [item.path[1]]: item.message }
//         : item.message);
//     });
//     return errors;
//   }
// };

export const validateV = async (schema, inputs, moreValidationFunc) => {
  const options = { abortEarly: false };
  if (!Array.isArray(inputs)) inputs = [inputs];
  const result = [];
  inputs.forEach(async (item, index) => {
    try {
      await schema.validateAsync(item, options);
    } catch (error) {
      // console.log("DETAILS", error.details);

      const itemErrors = {};
      error.details.map((item) => {
        return (itemErrors[item.path[0]] = item.path[1]
          ? { ...itemErrors[item.path[0]], [item.path[1]]: item.message }
          : item.message);
      });
      result[index] = itemErrors;
    }
    if (moreValidationFunc) {
      try {
        if (item.avatar) moreValidationFunc(item.avatar);
      } catch (error) {
        // console.log("DETAILS WTF", result[index]);
        const oldErrors = { ...result[index] };
        // console.log("oldErrors", oldErrors);
        error.details.map((item) => (oldErrors[item.path[0]] = item.message));
        console.log("photo err msg", oldErrors);
        result[index] = oldErrors;
      }
    }
  });
  return result;
};
