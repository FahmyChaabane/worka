import { useContext, useState } from "react";
import { validateV } from "../../../lib/inputsValidation";
import { reviewSchema } from "./validation";
import { useMutation } from "@apollo/client";
import { SUBMIT_REVIEW } from "../../../lib/mutations/userActions";
import { NotificationContext } from "../../../pages/_app";
import Button from "../../button/Button";
import LastStep from "../../common/review_questionnaire/lastStep";
import DescriptionQuestion from "./DescriptionQuestion";
import RatePickUp from "./ratePickUp";
import RelationshipQuestion from "./relationshipQuestion";
import handlingError from "../../../lib/handlingError";
import _ from "lodash";
import Styles from "../review.module.scss";

const ReviewForm = ({ userID, skillID, userName }) => {
  const [finish, setFinish] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    relationship: "",
    where: "",
    rate: null,
    description: "",
  });
  const [error, setError] = useState([]);

  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);

  const [submitReviewMutation] = useMutation(SUBMIT_REVIEW, {
    onCompleted: () => {
      console.log("FINISH!");
      setNotifySuccess({ show: true, msg: "Review submited!" });
      setFinish(!finish);
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const handleChange = ({ currentTarget: input }) => {
    const data = { ...reviewForm };
    _.set(data, input.name, input.value);
    setReviewForm(data);
  };

  const handleRate = (rate) => {
    const data = { ...reviewForm };
    // _.set(data, "rate", parseInt(rate));
    _.set(data, "rate", rate);
    setReviewForm(data);
  };

  const submitForm = async () => {
    const errors = await validateV(reviewSchema, reviewForm);
    setError(errors || []);
    if (errors.length !== 0) {
      console.log("errors", errors);
      return;
    }

    submitReviewMutation({
      variables: {
        addReviewData: {
          userID,
          skillID,
          description: reviewForm.description,
          relationship: reviewForm.relationship,
          where: reviewForm.where,
          rate: parseInt(reviewForm.rate),
        },
      },
    });
  };

  return finish ? (
    <LastStep userID={userID} />
  ) : (
    <div className={Styles.container}>
      <RelationshipQuestion
        relationship={reviewForm.relationship}
        where={reviewForm.where}
        handleChange={handleChange}
        userName={userName}
        errorR={error[0]?.relationship}
        errorW={error[0]?.where}
      />

      <RatePickUp
        handleChange={handleRate}
        rateValue={reviewForm.rate}
        error={error[0]?.rate}
      />

      <DescriptionQuestion
        description={reviewForm.description}
        handleChange={handleChange}
      />

      <Button
        onClick={submitForm}
        text="Finish"
        color="white"
        background="black"
      />
    </div>
  );
};

export default ReviewForm;
