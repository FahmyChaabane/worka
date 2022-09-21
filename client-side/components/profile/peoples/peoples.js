import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../lib/queries/user";
import Layout from "../../layout/layout";
import Header from "../../layout/header/header";
import PeopleNav from "./peoplesNav";
import PeopleItem from "../../common/peopleItem/peopleItem";
import Styles from "./peoples.module.scss";

const Peoples = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: profileUser } = useQuery(GET_USER_PROFILE, {
    variables: { getUserProfileUserId: id },
    onCompleted: () => {
      console.log("profile data has come FROM PEOPLE!");
    },
  });

  // const data = [
  //   {
  //     id: "1",
  //     img: "/images/ron.jpeg",
  //     name: "Nabil Ben Mzough",
  //     domain: {
  //       jobTitle:
  //         "Web developper at Loctana DEVs by day and a guitarist at night.",
  //     },
  //     location: "California, United States",
  //     availability: "looking",
  //   },
  //   {
  //     id: "2",
  //     img: "/images/jhon.jpeg",
  //     name: "Amin Ben Arbia",
  //     domain: {
  //       jobTitle:
  //         "Web developper at Loctana DEVs by day and a guitarist at night.",
  //     },
  //     location: "Jedda, Saudi Arabia",
  //     availability: "available",
  //   },
  //   {
  //     id: "3",
  //     img: "/images/ron.jpeg",
  //     name: "Fahmi Chaabane",
  //     domain: { jobTitle: "AWS developer & dev manager US cloud" },
  //     location: "Jedda, Saudi Arabia",
  //     availability: "working",
  //   },
  //   {
  //     id: "4",
  //     img: "/images/ron.jpeg",
  //     name: "Nabil Benni",
  //     domain: {
  //       jobTitle: "Dev.",
  //     },
  //     location: "California, United States",
  //   },
  //   {
  //     id: "5",
  //     img: "/images/jhon.jpeg",
  //     name: "Amin Ben Arbia",
  //     domain: {
  //       jobTitle:
  //         "Web developper at Loctana DEVs by day and a guitarist at night.",
  //     },
  //     location: "Jedda, Saudi Arabia",
  //     availability: "looking",
  //   },
  //   {
  //     id: "6",
  //     img: "/images/harmion.jpeg",
  //     name: "Fahmi Chaabane",
  //     domain: { jobTitle: "AWS developer & dev manager US cloud" },
  //     location: "Jedda, Saudi Arabia",
  //     availability: "working",
  //   },
  //   {
  //     id: "7",
  //     img: "/images/harmion.jpeg",
  //     name: "Nabil Ben Mzough",
  //     domain: {
  //       jobTitle:
  //         "Web developper at Loctana DEVs by day and a guitarist at night.",
  //     },
  //     location: "California, United States",
  //   },
  // ];

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          <PeopleNav />
          <div className={Styles.informations_data}>
            {profileUser?.getUserProfile.followedUsers.map(({ followed }) => (
              <PeopleItem key={followed.id} people={followed} />
            ))}
          </div>
        </section>
      </Header>
    </Layout>
  );
};

export default Peoples;
