import { useContext } from "react";
import {
  FormAboutContext,
  FormAboutEditErrorContext,
} from "../../../pages/profile/[id]/edit/about";
import { UserContext } from "../../providers/userProvider";
import { useMutation } from "@apollo/client";
import { NotificationContext } from "../../../pages/_app";
import { removeTypename } from "../../../lib/mutationDTOs";
import { validateV } from "../../../lib/inputsValidation";
import { EDIT_USER_ACCOUNT } from "../../../lib/mutations/userActions";
import {
  FormEducationContext,
  FormEducationEditErrorContext,
} from "../../../pages/profile/[id]/edit/education";
import {
  FormOccupationContext,
  FormOccupationEditErrorContext,
} from "../../../pages/profile/[id]/edit/occupation";
import { occupationSchema } from "../../signup-steps/second-Phase-steps/stepFour/validation";
import { educationSchema } from "../../signup-steps/second-Phase-steps/stepThree/validation";
import { convertToRaw } from "draft-js";
import { checkMimeType } from "../../signup-steps/second-Phase-steps/stepFive/validation";
import Joi from "joi";
import _ from "lodash";
import handlingError from "../../../lib/handlingError";
import Styles from "./header.module.scss";

const aboutSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name field is not allowed to be empty!",
  }),
  surname: Joi.string().required().messages({
    "string.empty": "surname field is not allowed to be empty!",
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
  avatar: Joi.alternatives().try(Joi.object().allow(null), Joi.string()),
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

// const educationSchema = Joi.object({
//   schoolName: Joi.string().required().messages({
//     "string.empty": "school name field is not allowed to be empty!",
//   }),
//   from: Joi.object({
//     month: Joi.string().required().messages({
//       "string.empty": "month field is not allowed to be empty!",
//     }),
//     year: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
//       "string.empty": "year field is not allowed to be empty!",
//       "string.pattern.base": "year field format is invalid",
//     }),
//   }),
//   to: Joi.object({
//     month: Joi.string().required().messages({
//       "string.empty": "month field is not allowed to be empty!",
//     }),
//     year: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
//       "string.empty": "year field is not allowed to be empty!",
//       "string.pattern.base": "year field format is invalid",
//     }),
//   }),
//   degree: Joi.string().required().messages({
//     "string.empty": "degree name field is not allowed to be empty!",
//   }),
//   stillStudying: Joi.boolean(),
// });

// const occupationSchema = Joi.object({
//   companyName: Joi.string().required().messages({
//     "string.empty": "company name field is not allowed to be empty!",
//   }),
//   from: Joi.object({
//     month: Joi.string().required().messages({
//       "string.empty": "month field is not allowed to be empty!",
//     }),
//     year: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
//       "string.empty": "year field is not allowed to be empty!",
//       "string.pattern.base": "year field format is invalid",
//     }),
//   }),
//   to: Joi.object({
//     month: Joi.string().required().messages({
//       "string.empty": "month field is not allowed to be empty!",
//     }),
//     year: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().messages({
//       "string.empty": "year field is not allowed to be empty!",
//       "string.pattern.base": "year field format is invalid",
//     }),
//   }),
//   post: Joi.string().required().messages({
//     "string.empty": "post name field is not allowed to be empty!",
//   }),
//   stillWorking: Joi.boolean(),
// });

const ProfileEditOptions = () => {
  const about = useContext(FormAboutContext);
  const aboutError = useContext(FormAboutEditErrorContext);
  const education = useContext(FormEducationContext);
  const educationError = useContext(FormEducationEditErrorContext);
  const occupation = useContext(FormOccupationContext);
  const occupationError = useContext(FormOccupationEditErrorContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);

  const decideElementToHandle = (dto) =>
    about
      ? {
          ...about.formAbout,
          avatar:
            dto && typeof about.formAbout.avatar === "string"
              ? new File([""], "fake")
              : about.formAbout.avatar,
          bio2:
            about.formAbout.bio2 &&
            about.formAbout.bio2.getCurrentContent &&
            JSON.stringify(
              convertToRaw(about.formAbout.bio2.getCurrentContent())
            ),
        }
      : education
      ? { education: education.formEducation }
      : occupation
      ? { work: occupation.formOccupation }
      : {};

  const decideCTXEqualityChanges = () => {
    const fields = about
      ? [
          "name",
          "surname",
          "gender",
          "location",
          "born",
          "domain",
          "phoneNumber",
          "avatar",
          // "bio",
          "bio2",
        ]
      : education
      ? ["education"]
      : occupation
      ? ["work"]
      : null;

    return _.isEqual(
      removeTypename(_.pick(currentUser, fields)),
      decideElementToHandle()
    );
  };

  const decideInputsToVerify = () =>
    about
      ? about.formAbout
      : education
      ? education.formEducation
      : occupation
      ? occupation.formOccupation
      : {};

  const decideSchemasToVerify = () =>
    about
      ? aboutSchema
      : education
      ? educationSchema
      : occupation
      ? occupationSchema
      : {};

  const decideErrorApplying = (param) => {
    about
      ? aboutError.setError(param)
      : education
      ? educationError.setError(param)
      : occupation
      ? occupationError.setError(param)
      : null;
  };

  // const noChanges = _.isEqual(
  //   _.pick(currentUser, [
  //     "gender",
  //     "location",
  //     "born",
  //     "domain",
  //     "phoneNumber",
  //   ]),
  //   about.formAbout
  // );

  const noChanges = decideCTXEqualityChanges();

  const [editUserAccountMutation] = useMutation(EDIT_USER_ACCOUNT, {
    onCompleted: ({ editUserAccountData }) => {
      console.log("data back here: ", editUserAccountData);
      setCurrentUser(editUserAccountData);
      setNotifySuccess({ show: true, msg: "Profile Updated succesfully!" });
      // router.push(`/profile/${completeUserAccount.id}/skillReview`);
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const saveChanges = async () => {
    // https://stackoverflow.com/questions/52786220/how-to-fix-graphql-mutations-typename-errors
    // https://github.com/apollographql/apollo-feature-requests/issues/6
    // https://stackoverflow.com/questions/47211778/cleaning-unwanted-fields-from-graphql-responses/51380645#51380645
    // removed it in the hoc
    // const formAboutDTO = removeTypename(about.formAbout);
    // console.log("photo", about.formAbout);

    const errors = await validateV(
      decideSchemasToVerify(),
      decideInputsToVerify(),
      about?.formAbout.avatar instanceof File ? checkMimeType : null
    );
    decideErrorApplying(errors || []);
    if (errors.length !== 0) {
      return handlingError("Please, verify your input", setNotifyError);
    }
    // console.log("formAboutDTO", formAboutDTO);
    editUserAccountMutation({
      variables: {
        editUserAccountDataData: decideElementToHandle(true),
      },
    });
  };

  console.log("LOG IT RIGHT HERE", decideElementToHandle(true));

  return (
    <div className={[Styles.container_header_options].join(" ")}>
      <div
        className={[
          noChanges
            ? Styles.container_header_options_suggestionsunflw
            : Styles.container_header_options_edit,
          Styles.container_header_options_common,
        ].join(" ")}
        onClick={() => (noChanges ? null : saveChanges())}
      >
        <span>
          <svg className={Styles.container_header_options_logo}>
            <use href="/images/sprite.svg#icon-edit"></use>
          </svg>
        </span>
        <span>Save Changes</span>
      </div>
    </div>
  );
};

export default ProfileEditOptions;
