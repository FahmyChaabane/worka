import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import {
  FormOccupationContext,
  FormOccupationEditErrorContext,
} from "../../../pages/profile/[id]/edit/occupation";
import Loader from "../../common/loader/loader";
import Header from "../../layout/header/header";
import Layout from "../../layout/layout";
import WorkForm from "../../signup-steps/second-Phase-steps/stepFour/workForm";
import Styles from "./edit.module.scss";

const Occupation = () => {
  const { formOccupation, setFormOccupation } = useContext(
    FormOccupationContext
  );
  const { error: errors } = useContext(FormOccupationEditErrorContext);
  const [counter, setCounter] = useState(0);
  const [addError, setAddError] = useState(false);

  useEffect(() => {
    setCounter(formOccupation?.length);
  }, [formOccupation]);

  const addData = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (counter > 0) setAddError(false);
  }, [counter]);

  const workInfosupdate = (data, ind) => {
    // console.log("data", data);
    const workInfosupdated = [...formOccupation];
    workInfosupdated[ind] = data;
    setFormOccupation(workInfosupdated);
  };

  const displayFormComponent = () => {
    return [...Array(counter).keys()].map((cmp) => (
      <WorkForm
        key={cmp}
        ind={cmp}
        workInfosupdate={workInfosupdate}
        work={formOccupation[cmp]}
        error={errors[cmp]}
      />
    ));
  };

  if (_.isEmpty(formOccupation) || counter == 0)
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
                <span className={Styles.headingmd}>Work:</span>
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

export default Occupation;
