import { useContext, useEffect, useState } from "react";
import {
  FormEducationContext,
  FormEducationEditErrorContext,
} from "../../../pages/profile/[id]/edit/education";
import Loader from "../../common/loader/loader";
import Header from "../../layout/header/header";
import Layout from "../../layout/layout";
import EducationForm from "../../signup-steps/second-Phase-steps/stepThree/educationForm";
import Styles from "./edit.module.scss";

const Education = () => {
  const { formEducation, setFormEducation } = useContext(FormEducationContext);
  const { error: errors } = useContext(FormEducationEditErrorContext);
  const [counter, setCounter] = useState(0);
  const [addError, setAddError] = useState(false);
  // console.log("formEducation", formEducation);
  // console.log("counter", counter);

  useEffect(() => {
    setCounter(formEducation?.length);
  }, [formEducation]);

  const addData = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (counter > 0) setAddError(false);
  }, [counter]);

  const educationInfosupdate = (data, ind) => {
    // console.log("data", data);
    const educationInfosupdated = [...formEducation];
    educationInfosupdated[ind] = data;
    setFormEducation(educationInfosupdated);
  };

  const displayFormComponent = () => {
    return [...Array(counter).keys()].map((cmp) => (
      <EducationForm
        key={cmp}
        ind={cmp}
        educationInfosupdate={educationInfosupdate}
        education={formEducation[cmp]}
        error={errors[cmp]}
      />
    ));
  };

  if (_.isEmpty(formEducation) || counter == 0)
    return <Loader layouted={true} headed={true} />;

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          {displayFormComponent()}
          <div
            className={[
              Styles.layout,
              addError
                ? Styles.layout_invalidborder
                : Styles.layout_validborder,
            ].join(" ")}
          >
            <div className={Styles.layout_inside}>
              <div className={Styles.layout_flexNoMargin}>
                <span className={Styles.headingmd}>Education:</span>
                <div className={Styles.layout_add} onClick={addData}>
                  <svg className={Styles.layout_add_icon}>
                    <use xlinkHref="/images/sprite.svg#icon-plus"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Header>
    </Layout>
  );
};

export default Education;
