import Styles from "./projects.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import Answers from "../../common/answers/answers";
import AnswerInput from "../../common/answers/answerInput";

const ProjectsElement = ({ project }) => {
  const router = useRouter();
  const { id } = router.query;

  const goToProject = () => {
    router.push(`/profile/${id}/projects/${project.id}`);
  };

  return (
    <div className={Styles.frame}>
      <div className={Styles.details_element}>
        <div className={Styles.details_element_img}>
          <Image
            layout="fill"
            src={project.img}
            alt="project"
            className={Styles.details_element_img_radius}
          />
        </div>
        <span onClick={goToProject} className={Styles.details_element_key}>
          {project.title}
        </span>
        <p className={Styles.details_element_txt}>{project.text}</p>
        <div className={Styles.details_element_foot}>
          <span className={Styles.details_element_foot_date}>
            {project.date}
          </span>
          <div className={Styles.details_element_foot_right}>
            <span className={Styles.details_element_foot_photo}>
              <svg className={Styles.details_element_foot_photo_logo}>
                <use href="/images/sprite.svg#icon-photo"></use>
              </svg>
              {project.photosCount}
            </span>
            <span className={Styles.details_element_foot_msg}>
              <svg className={Styles.details_element_foot_msg_logo}>
                <use href="/images/sprite.svg#icon-comment"></use>
              </svg>
              {project.commentsCount}
            </span>
          </div>
        </div>
      </div>

      {id !== "1" && (
        <>
          <Answers answers={project.comments} />
          <AnswerInput />
        </>
      )}
    </div>
  );
};

export default ProjectsElement;
