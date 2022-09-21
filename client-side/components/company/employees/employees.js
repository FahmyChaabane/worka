import PeopleItem from "../../common/peopleItem/peopleItem";
import Header from "../../layout/header/header";
import Layout from "../../layout/layout";
import PeopleNav from "../../profile/peoples/peoplesNav";
import Styles from "./employees.module.scss";

const Employees = () => {
  const data = [
    {
      id: "1",
      img: "/images/ron.jpeg",
      title: "Nabil Ben Mzough",
      position:
        "Web developper at Loctana DEVs by day and a guitarist at night.",
      location: "California, United States",
      availability: "looking",
    },
    {
      id: "2",
      img: "/images/jhon.jpeg",
      title: "Amin Ben Arbia",
      position:
        "Web developper at Loctana DEVs by day and a guitarist at night.",
      location: "Jedda, Saudi Arabia",
      availability: "available",
    },
    {
      id: "3",
      img: "/images/harmion.jpeg",
      title: "Fahmi Chaabane",
      position: "AWS developer & dev manager US cloud",
      location: "Jedda, Saudi Arabia",
      availability: "working",
    },
    {
      id: "4",
      img: "/images/ron.jpeg",
      title: "Nabil Ben Mzough",
      position:
        "Web developper at Loctana DEVs by day and a guitarist at night.",
      location: "California, United States",
    },
    {
      id: "5",
      img: "/images/jhon.jpeg",
      title: "Amin Ben Arbia",
      position:
        "Web developper at Loctana DEVs by day and a guitarist at night.",
      location: "Jedda, Saudi Arabia",
      availability: "looking",
    },
  ];

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          <PeopleNav />
          <div className={Styles.informations_data}>
            {data.map((people) => (
              <PeopleItem key={people.id} people={people} />
            ))}
          </div>
        </section>
      </Header>
    </Layout>
  );
};

export default Employees;
