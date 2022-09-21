import { useRouter } from "next/router";
import Button from "../../button/Button";
import Styles from "./companyItem.module.scss";
import Image from "next/image";

const CompanyItem = ({ company }) => {
  const router = useRouter();
  const goToProfile = () => {
    router.push(`/company/${company.id}/jobs`);
  };
  return (
    <div onClick={goToProfile} className={Styles.frame}>
      <div className={Styles.frame_img}>
        <Image
          src={company.img}
          alt="company"
          height={100}
          width={100}
          className={Styles.frame_img_radius}
        />
      </div>
      <h4 className={Styles.frame_title}>{company.title}</h4>
      <p className={Styles.frame_position}>{company.position}</p>
      <span className={Styles.frame_location}>{company.location}</span>
      <Button text="Visit Profile" />
    </div>
  );
};

export default CompanyItem;
