import { createContext, useEffect, useReducer } from "react";

const initialState = { interviews: [], newInterview: null };

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("appState")) || initialValue;

const jobInterviewsReducer = (state, action) => {
  switch (action.type) {
    case "set-new-interview": {
      return { ...state, newInterview: action.payload };
    }
    case "add-job-interview": {
      console.log("add-job-interview");
      const { org, title, ...rest } = action.payload;
      return {
        newInterview: null,
        interviews: [{ org, title, rounds: [rest] }, ...state.interviews]
      };
    }
    case "add-interview": {
      console.log("add-interview", action.payload);
      const { org, title, ...rest } = action.payload;
      const jobIndex = state.interviews.findIndex(
        (interview) => interview.org === org
      );
      const interviews = [
        ...state.interviews.slice(0, jobIndex),
        { org, title, rounds: [rest, ...state.interviews[jobIndex].rounds] },
        ...state.interviews.slice(jobIndex + 1)
      ];
      return {
        newInterview: null,
        interviews
      };
    }
    default:
      return state;
  }
};

export const addJobInterview = (payload) => ({
  type: "add-job-interview",
  payload
});
export const addInterview = (payload) => ({ type: "add-interview", payload });
export const setNewInterview = (payload) => ({
  type: "set-new-interview",
  payload
});

/* Context */
export const JobInterviewsContext = createContext();

const JobInterviewsContextProvider = (props) => {
  const [{ interviews, newInterview }, dispatch] = useReducer(
    jobInterviewsReducer,
    initialState,
    initializer
  );
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify({ interviews }));
  }, [interviews]);
  return (
    <JobInterviewsContext.Provider
      value={{ interviews, newInterview, dispatch }}
    >
      {props.children}
    </JobInterviewsContext.Provider>
  );
};

export default JobInterviewsContextProvider;
