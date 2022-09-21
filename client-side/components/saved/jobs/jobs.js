import Layout from "../../layout/layout";
import Header from "../../layout/header/header";
import Styles from "../saved.module.scss";
import JobFrame from "../../common/job_company_frames/jobFrame/jobFrame";

const SavedJobs = () => {
  const data = [
    {
      id: "1",
      company: "Heroku KSA",
      companyImg: "/images/heroku.jpg",
      location: "Damman, Saudi Arabia",
      postTitle: "Senior Product Designer (Pre-Launch Startup)",
      isRemote: true,
      contractType: ["Full Time Job", "Part Time Job"],
      seniorityLevel: ["Junior"],
      schedule: ["8 hours shifts"],
      salaryRange: ["5000 - 9000$"],
      workLocation: ["Remote temporarily due to covid-19"],
      requiredSkills: [
        "UI design",
        "UX design",
        "Databases",
        "Front End",
        "Machine Learning",
      ],
      jobDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      futureTasks: [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      ],
      expectedProfile: [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      ],
      postingStatement:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "14 days ago",
      appliedPersons: 31,
    },
    {
      id: "2",
      company: "Amazon USA",
      companyImg: "/images/amz.jpg",
      location: "Washington, United States",
      postTitle: "JavaScript Backend Developer",
      isRemote: true,
      contractType: ["Full Time Job", "Part Time Job"],
      seniorityLevel: ["Junior"],
      schedule: ["8 hours shifts"],
      salaryRange: ["5000 - 9000$"],
      workLocation: ["Remote temporarily due to covid-19"],
      requiredSkills: ["Databases", "Back End", "Machine Learning"],
      jobDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      futureTasks: [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      ],
      expectedProfile: [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      ],
      postingStatement:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "14 days ago",
      appliedPersons: 31,
    },
  ];

  return (
    <Layout>
      <Header>
        <section className={Styles.container}>
          {data.map((job) => (
            <JobFrame key={job.id} job={job} />
          ))}
        </section>
      </Header>
    </Layout>
  );
};

export default SavedJobs;
