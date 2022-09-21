import Input from "../../input/InputText";
import Styles from "../review.module.scss";

const RelationshipQuestion = ({
  relationship,
  where,
  handleChange,
  userName,
  errorR,
  errorW,
}) => {
  return (
    <div
      className={[
        Styles.layoutQ,
        errorR || errorW
          ? Styles.layoutQ_invalidborder
          : Styles.layoutQ_validborder,
      ].join(" ")}
    >
      <div className={Styles.layoutQ_header}>
        <p className={Styles.headingbg}>
          What is your relationship with {userName} ?
        </p>
      </div>
      <div className={Styles.layoutQ_inside}>
        <div className={Styles.layoutQ_inside_questionsGrid_1}>
          <Input
            name="relationship"
            placeholder="Colleague, manager, etc..."
            style={{ background: "white" }}
            value={relationship}
            onChange={handleChange}
          />
          {errorR && <div className={Styles.layout_inside_error}>{errorR}</div>}
          <Input
            name="where"
            placeholder="Where?"
            style={{ background: "white" }}
            value={where}
            onChange={handleChange}
          />
          {errorW && <div className={Styles.layout_inside_error}>{errorW}</div>}
          {/* <Input placeholder="When?" style={{ background: "white" }} /> */}
        </div>
      </div>
    </div>
  );
};

export default RelationshipQuestion;
