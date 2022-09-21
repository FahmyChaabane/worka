import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../providers/userProvider";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../lib/queries/user";
import ProjectsElement from "./projectsElement";
import AddProject from "./addProject";
import Layout from "../../layout/layout";
import Header from "../../layout/header/header";
import Styles from "./projects.module.scss";

const Projects = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;

  const { data: profileUser } = useQuery(GET_USER_PROFILE, {
    variables: { getUserProfileUserId: id },
    onCompleted: () => {
      console.log("profile data has come FROM PROJECTS!");
    },
  });

  const data = [
    {
      id: "1",
      img: "/images/project.jpg",
      title: " JAM App Development",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "October 2017",
      photosCount: 6,
      commentsCount: 10,
      comments: [
        {
          id: "1",
          userName: "Heroku",
          userPost: "Manager @ Oracle",
          userImg: "/images/harmion.jpeg",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        },
        {
          id: "4",
          userName: "Oumaima Ben Mzough",
          userPost: "Backend Developer",
          userImg: "/images/ron.jpeg",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..",
        },
      ],
    },
    {
      id: "2",
      img: "/images/project.jpg",
      title: " JAM App Development",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "October 2017",
      photosCount: 6,
      commentsCount: 10,
      comments: [],
    },
  ];

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          {id === currentUser?.id && <AddProject />}
          <div className={Styles.details}>
            {id === currentUser?.id && (
              <div className={Styles.details_head}>
                <span className={Styles.details_head_title}>
                  Your Projects:
                </span>
                <span className={Styles.details_head_edit}>Edit projects</span>
              </div>
            )}
            {data.map((project) => (
              <ProjectsElement key={project.id} project={project} />
            ))}
          </div>
        </section>
      </Header>
    </Layout>
  );
};

export default Projects;
