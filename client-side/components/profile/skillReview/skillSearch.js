import { useContext, useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_SKILL_TO_USER, GET_SKILLS_LIST } from "../../../lib/queries/skill";
import { NotificationContext } from "../../../pages/_app";
import { UserContext } from "../../providers/userProvider";
import { gql } from "@apollo/client";
import handlingError from "../../../lib/handlingError";
import Loader from "../../common/loader/loader";
import Styles from "./skillReview.module.scss";

const SkillSearch = () => {
  const [filter, setFilter] = useState("");
  const [selectSkill, setSelectSkill] = useState(null);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const listRef = useRef(null);

  const { setNotifyError, setNotifySuccess } = useContext(NotificationContext);
  const { currentUser } = useContext(UserContext);

  const [skillQuery, { called, loading, data }] = useLazyQuery(
    GET_SKILLS_LIST,
    {
      variables: {
        filteredSkillsName: filter.trim(),
      },
      onError: (error) => {
        handlingError(error, setNotifyError);
      },
    }
  );

  const handleChange = ({ currentTarget: input }) => {
    // if (input.value === "") setShowSuggestionsList(false);
    setSelectSkill(null);
    setFilter(input.value);
    skillQuery(input.value);
  };

  // useEffect(() => {
  //   skillQuery();
  // }, [filter]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (listRef.current.contains(e.target)) {
      return;
    }
    setShowSuggestionsList(false);
  };

  const [addSkillToUser] = useMutation(ADD_SKILL_TO_USER, {
    update: (cache, { data: { addSkillToUser } }) => {
      /*
      seMutation automatically creates a Comment and adds it to the cache, 
      but it doesn't automatically know how to add that Comment to the corresponding Post's list of comments
      */
      cache.modify({
        // The ID of a cached object to modify
        id: cache.identify(currentUser),
        // A map of modifier functions to execute (one for each field to modify)
        fields: {
          skills(existingSkills = []) {
            const newSkillRef = cache.writeQuery({
              // specify the root object, default is ROOT_QUERY
              id: cache.identify(addSkillToUser), // sth like, return back the right ref
              // can be looked at as if you're querying it (the new added one) back after submitting it into the DB
              query: gql`
                query WriteOwnSkill {
                  id
                  globalRate
                  seniority
                  skill {
                    # if not mentioned, gonna do a refetch
                    id
                    # name
                  }
                  reviews {
                    id
                    # relationship
                    # description
                    # rate
                    # createdAt
                    # reviewer {
                    #   id
                    #   name
                    #   surname
                    #   avatar
                    #   domain {
                    #     name
                    #     jobTitle
                    #   }
                    # }
                  }
                }
              `,
              data: addSkillToUser,
            });
            console.log("ahayyya", newSkillRef);
            return [...existingSkills, newSkillRef];
          },
        },
      });
    },
    onCompleted: () => {
      console.log("FINISH!");
      setNotifySuccess({ show: true, msg: "Skill Added!" });
    },
    onError: (error) => {
      handlingError(error, setNotifyError);
    },
  });

  const addSkill = (e) => {
    e.preventDefault();

    addSkillToUser({
      variables: {
        addSkillToUserSkillId: selectSkill.id,
      },
    });
    setFilter("");
    setSelectSkill(null);
  };

  const selectChoice = (item) => {
    setFilter(item.name);
    setSelectSkill(item);
    setShowSuggestionsList(false);
  };

  const skills = [
    { id: "1", name: "UI design" },
    { id: "2", name: "UX design" },
    { id: "3", name: "Databases" },
    { id: "4", name: "Front End" },
    { id: "5", name: "Machine Learning" },
  ];

  console.log("aha", listRef.current);

  return (
    <div className={Styles.frametop}>
      <div className={Styles.content}>
        <div className={Styles.content_left}>
          <h3 className={Styles.content_left_title}>
            Find your skills and get reviewed on them to make yourself visible
            and increase your chances to score any job you want.
          </h3>
          <form
            autoComplete="off"
            className={Styles.content_left_area}
            onSubmit={addSkill}
          >
            <div ref={listRef}>
              <label
                htmlFor="skill"
                className={Styles.content_left_area_input_label}
              >
                skill:
              </label>

              <input
                id="skill"
                type="text"
                className={Styles.content_left_area_input}
                placeholder="Write skill, keyword, etc.."
                value={filter}
                onChange={handleChange}
                onFocus={() => setShowSuggestionsList(true)}
              />
              {showSuggestionsList && (
                <div className={Styles.content_left_area_suggestions}>
                  {called && loading ? (
                    <Loader />
                  ) : (
                    data?.filteredSkills.length !== 0 &&
                    data?.filteredSkills.map((item) => (
                      <p
                        key={item.id}
                        className={Styles.content_left_area_suggestions_item}
                        onClick={() => selectChoice(item)}
                      >
                        {item.name}
                      </p>
                    ))
                  )}
                </div>
              )}

              <button
                type="submit"
                style={selectSkill ? null : { background: "#3c3c3c" }}
                className={Styles.content_left_area_button}
                disabled={!selectSkill}
              >
                Add skills
              </button>
            </div>
          </form>
          <span className={Styles.content_left_suggestiontxt}>
            Suggested skills based on your profile info and searches, Click to
            add to your skills:
          </span>
          <ul className={Styles.content_left_suggestions}>
            {skills.map((skill) => (
              <li
                key={skill.id}
                className={Styles.content_left_suggestions_element}
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={Styles.content_right}>IMPOSSIBLE PHOTO RIGHT HERE</div>
      </div>
    </div>
  );
};

export default SkillSearch;
