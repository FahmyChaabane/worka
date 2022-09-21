import Header from "../../layout/header/header";
import Layout from "../../layout/layout";
import QANav from "./qaNav";
import QuestionElement from "./questionElement";
import Styles from "./questionsAnswers.module.scss";
import QuestionsSearch from "./questionsSearch";

const QuestionsAnswers = () => {
  const data = [
    {
      id: "1",
      userName: "Fahmi Chaabane",
      userPost: "Manager @ Oracle",
      userImg: "/images/jhon.jpeg",
      question:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
      answers: [
        {
          id: "2",
          userName: "Salah El Mejri",
          userPost: "IOS developer",
          userImg: "/images/ron.jpeg",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        },
      ],
    },
    {
      id: "2",
      userName: "Ahmed Yaakoubi",
      userPost: "Machine Learning Researcher",
      userImg: "/images/mit.jpg",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answers: [],
    },
    {
      id: "3",
      userName: "Gaith Toukebri",
      userPost: "Data Scientist",
      userImg: "/images/project.jpg",
      question:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..?",
      answers: [
        {
          id: "1",
          userName: "Heroku",
          userPost: "Manager @ Oracle",
          userImg: "/images/heroku.jpg",
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
  ];

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          <QANav />
          <QuestionsSearch />
          {data.map((question) => (
            <QuestionElement key={question.id} question={question} />
          ))}
        </section>
      </Header>
    </Layout>
  );
};

export default QuestionsAnswers;
