import Styles from "./questionsAnswers.module.scss";

const QuestionsSearch = () => {
  return (
    <div className={Styles.informations_area}>
      <input
        type="text"
        className={Styles.informations_area_input}
        placeholder="Search by keywords (exp: internship, raises... etc)"
      />
      <button className={Styles.informations_area_button}>Search</button>
    </div>
  );
};

export default QuestionsSearch;
