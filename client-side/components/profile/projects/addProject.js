import Styles from "./projects.module.scss";
import Button from "../../button/Button";
import Image from "next/image";
import { useRouter } from "next/router";

const AddProject = () => {
  const router = useRouter();

  return (
    <div className={Styles.informations_top}>
      <div className={Styles.informations_top_l}>
        <h3 className={Styles.informations_top_title}>
          Show off your previous projects and let recruiters see what you are
          capable of creating.
        </h3>
        <p className={Styles.informations_top_text}>
          Adding a project is as easy as uploading a few attachements of your
          work and text to explain your steps and processing throughout.
        </p>
        <Button
          text="Start new project"
          width="60%"
          onClick={() => router.push("/profile/1/projects/create")}
        />
      </div>
      <div className={Styles.informations_top_r}>
        <div className={Styles.informations_top_ctn}>
          <Image
            className={Styles.informations_top_img}
            src="/images/phone.jpg"
            alt="project"
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProject;
