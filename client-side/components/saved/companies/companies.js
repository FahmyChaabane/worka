import Layout from "../../layout/layout";
import Header from "../../layout/header/header";
import CompanyFrame from "../../common/job_company_frames/companyFrame/companyFrame";
import Styles from "../saved.module.scss";

const SavedCompanies = () => {
  const data = [
    {
      id: "1",
      company: "Heroku",
      companyImg: "/images/heroku.jpg",
      companyService: "Cloud services provider company",
      companyLocations: ["Tunis, Tunsia", "Ney York, United States"],
      companyState: "Hiring",
      numberEmployees: "320 employees",
      reviews: "37 reviews",
    },
    {
      id: "2",
      company: "Amazon USA",
      companyImg: "/images/amz.jpg",
      companyService: "Cloud services provider company & online shopping",
      companyLocations: ["Tunis, Tunsia", "Ney York, United States"],
      companyState: "Hiring",
      numberEmployees: "44 employees",
      reviews: "3600 reviews",
    },
  ];

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          {data.map((job) => (
            <CompanyFrame key={job.id} job={job} />
          ))}
        </section>
      </Header>
    </Layout>
  );
};

export default SavedCompanies;
