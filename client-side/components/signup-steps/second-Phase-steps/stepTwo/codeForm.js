import Styles from "../steps.module.scss";
import Image from "next/image";

const CodeForm = () => {
  return (
    <div className={[Styles.layout, Styles.layout_validborder].join(" ")}>
      <div className={Styles.layout_inside}>
        <p className={Styles.headingsm}>Confirmation:</p>
        <p className={Styles.headingmd}>
          Write the code we have sent to your phone number.
        </p>
        <div className={Styles.layout_flex}>
          <div>
            <span
              className={[
                Styles.headingmd,
                Styles.lignging,
                Styles.coloring,
              ].join(" ")}
            >
              +216 52 917 858 change
            </span>
          </div>
          <div
            className={[
              Styles.headingsm,
              Styles.lignging,
              Styles.coloring,
            ].join(" ")}
          >
            <svg className={Styles.svg}>
              <use href="/images/sprite.svg#icon-cw"></use>
            </svg>
            <span>Resend Code</span>
          </div>
        </div>
        <div
          className={[
            Styles.margining,
            Styles.layout_inside_image,
            Styles.layout_inside_image_img,
          ].join(" ")}
        >
          <Image layout="fill" src="/images/phone.jpg" alt="Worka" />
        </div>
        <div className={Styles.layout_inside_linedispatching}>
          <input type="number" className={Styles.inputCode} />
          <input type="number" className={Styles.inputCode} />
          <input type="number" className={Styles.inputCode} />
          <input type="number" className={Styles.inputCode} />
        </div>
      </div>
    </div>
  );
};

export default CodeForm;
