import React, { useCallback, useContext } from "react";

import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "./state/ThemeContext";
import {
  JobInterviewsContext,
  setNewInterview
} from "./state/JobInterviewsContext";

import NewJobInterviewForm from "./NewJobInterviewForm";
import JobInterviews from "./JobInterviews";

import "./styles.css";
import JobInterviewsContextProvider from "./state/JobInterviewsContext";

const NewJobInterviewButton = () => {
  const { dispatch } = useContext(JobInterviewsContext);
  const onNewJobInterviewClick = useCallback(() => {
    dispatch(setNewInterview({}));
  }, [dispatch]);
  return (
    <button className="primary" onClick={onNewJobInterviewClick}>
      New Job Interview{" "}
    </button>
  );
};
const Divider = () => <div className="divider"></div>;

export default function App() {
  const { isDarkTheme } = useContext(ThemeContext);
  const themeClass = isDarkTheme ? "dark" : "";
  return (
    <div className={"app " + themeClass}>
      <ThemeToggle />
      <JobInterviewsContextProvider>
        <NewJobInterviewButton />
        <Divider />
        <NewJobInterviewForm />
        <JobInterviews />
      </JobInterviewsContextProvider>
    </div>
  );
}
