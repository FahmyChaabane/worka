import { useRouter } from "next/router";
import Image from "next/image";
import Styles from "./card.module.scss";

const CompanyIdentity = ({ companyData }) => {
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/company/${companyData.id}/about`);
  };

  return (
    <div onClick={goToProfile} className={Styles.frame}>
      <div className={Styles.frame_img_mgn}>
        {companyData.avatar ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${companyData.avatar}`}
            alt="company"
            className={Styles.frame_img}
            height={80}
            width={80}
          />
        ) : (
          <Image
            src="/images/companyplaceholder.png"
            alt="company"
            className={Styles.frame_img}
            height={80}
            width={80}
          />
        )}
      </div>
      <div>
        <p className={Styles.frame_secondtitle}>Company:</p>
        <h4 className={Styles.frame_title}>{companyData.name}</h4>
      </div>
    </div>
  );
};

export default CompanyIdentity;
