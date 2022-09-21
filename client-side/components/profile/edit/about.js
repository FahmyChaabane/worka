import { useContext } from "react";
import {
  FormAboutContext,
  FormAboutEditErrorContext,
} from "../../../pages/profile/[id]/edit/about";
import BioForm from "../../signup-steps/second-Phase-steps/stepFive/bioForm";
import BirthdayQuestions from "../../signup-steps/second-Phase-steps/stepOne/birthdayQuestion";
import DomainQuestions from "../../signup-steps/second-Phase-steps/stepOne/domainQuestion";
import GenderQuestions from "../../signup-steps/second-Phase-steps/stepOne/genderQuestion";
import LocationQuestions from "../../signup-steps/second-Phase-steps/stepOne/locationQuestion";
import PhoneQuestions from "../../signup-steps/second-Phase-steps/stepOne/phoneQuestion";
import NameQuestion from "../../signup-steps/second-Phase-steps/stepOne/nameQuestion";
import UploadPhotoForm from "../../signup-steps/second-Phase-steps/stepFive/uploadPhotoForm";
import Loader from "../../common/loader/loader";
import Header from "../../layout/header/header";
import Layout from "../../layout/layout";
import Styles from "./edit.module.scss";

const About = () => {
  const { formAbout, setFormAbout } = useContext(FormAboutContext);
  const { error } = useContext(FormAboutEditErrorContext);
  // console.log("FORMABOUT", formAbout);

  const setNameQuestions = (name) => {
    const data = { ...formAbout };
    data.name = name;
    setFormAbout(data);
  };

  const setSurNameQuestions = (surname) => {
    const data = { ...formAbout };
    data.surname = surname;
    setFormAbout(data);
  };

  const setGenderQuestions = (gender) => {
    const data = { ...formAbout };
    data.gender = gender;
    setFormAbout(data);
  };

  const setLocationQuestions = (location) => {
    const data = { ...formAbout };
    data.location = location;
    setFormAbout(data);
  };

  const setBirthdayQuestions = (birthday) => {
    const data = { ...formAbout };
    data.born = birthday;
    setFormAbout(data);
  };

  const setDomainQuestions = (domain) => {
    const data = { ...formAbout };
    data.domain = domain;
    setFormAbout(data);
  };

  const setPhoneQuestions = (phoneNumber) => {
    const data = { ...formAbout };
    data.phoneNumber = phoneNumber;
    setFormAbout(data);
  };

  const setBioForm = (bio) => {
    const data = { ...formAbout };
    // data.bio = bio;
    setFormAbout(data);
  };

  const setBio2Form = (bio2, str) => {
    // console.log("setBio2Form   ", convertToRaw(bio2.getCurrentContent()));
    const data = { ...formAbout };
    data.bio2 = bio2;
    setFormAbout(data);
  };

  const setAvatarForm = (avatar) => {
    const data = { ...formAbout };
    data.avatar = avatar;
    setFormAbout(data);
  };

  if (_.isEmpty(formAbout)) return <Loader layouted={true} headed={true} />;

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          <UploadPhotoForm
            avatar={formAbout?.avatar}
            forEdit={typeof formAbout?.avatar === "string"}
            setAvatarForm={setAvatarForm}
            error={error[0]?.avatar}
          />

          <NameQuestion
            name={formAbout?.name}
            surname={formAbout?.surname}
            setNameQuestions={setNameQuestions}
            setSurNameQuestions={setSurNameQuestions}
            errorN={error[0]?.name}
            errorSN={error[0]?.surname}
          />

          <GenderQuestions
            gender={formAbout?.gender}
            setGenderQuestions={setGenderQuestions}
            error={error[0]?.gender}
          />
          <LocationQuestions
            location={formAbout?.location}
            setLocationQuestions={setLocationQuestions}
            error={error[0]?.location}
          />
          <BirthdayQuestions
            born={formAbout?.born}
            setBirthdayQuestions={setBirthdayQuestions}
            error={error[0]?.born}
          />
          <DomainQuestions
            domain={formAbout?.domain}
            setDomainQuestions={setDomainQuestions}
            error={error[0]?.domain}
          />
          <PhoneQuestions
            phoneNumber={formAbout?.phoneNumber}
            setPhoneQuestions={setPhoneQuestions}
            error={error[0]?.phoneNumber}
          />
          <BioForm
            // bio={formAbout?.bio}
            bio2={formAbout?.bio2}
            // setBioForm={setBioForm}
            setBio2Form={setBio2Form}
            // errorb1={error[0]?.bio}
            errorb2={error[0]?.bio2}
          />
        </section>
      </Header>
    </Layout>
  );
};

export default About;
