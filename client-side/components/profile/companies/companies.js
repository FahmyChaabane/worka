import Layout from "../../layout/layout";
import Header from "../../layout/header/header";
import CompaniesNav from "./companiesNav";
import CompanyItem from "../../common/companyItem/companyItem";
import Styles from "./companies.module.scss";

const Companies = () => {
  const data = [
    {
      id: "1",
      img: "/images/heroku.jpg",
      title: "MILLENNIUM",
      position: "IOS developer & dev manager @ CACTUS prod",
      location: "California, United States",
    },
    {
      id: "2",
      img: "/images/amz.jpg",
      title: "Amazon",
      position: "AWS developer & dev manager US cloud",
      location: "Jedda, Saudi Arabia",
    },
    {
      id: "3",
      img: "/images/project.jpg",
      title: "Amazon",
      position: "AWS developer & dev manager US cloud",
      location: "Jedda, Saudi Arabia",
    },
    {
      id: "4",
      img: "/images/amz.jpg",
      title: "Amazon",
      position: "AWS developer & dev manager US cloud",
      location: "Jedda, Saudi Arabia",
    },
    {
      id: "5",
      img: "/images/project.jpg",
      title: "MILLENNIUM",
      position: "IOS developer & dev manager at CACTUS prod",
      location: "California, United States",
    },
    {
      id: "6",
      img: "/images/heroku.jpg",
      title: "MILLENNIUM",
      position: "IOS developer & dev manager at CACTUS prod",
      location: "California, United States",
    },
    {
      id: "7",
      img: "/images/heroku.jpg",
      title: "MILLENNIUM",
      position: "IOS developer & dev manager at CACTUS prod",
      location: "California, United States",
    },
  ];

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          <CompaniesNav />
          <div className={Styles.informations_data}>
            {data.map((company) => (
              <CompanyItem key={company.id} company={company} />
            ))}
          </div>
        </section>
      </Header>
    </Layout>
  );
};

export default Companies;
