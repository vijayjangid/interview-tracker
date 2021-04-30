import React, { useCallback, useContext } from "react";
import {
  JobInterviewsContext,
  setNewInterview
} from "../state/JobInterviewsContext";
import "./styles.css";

const Card = ({ round, data }) => {
  return (
    <div className="card">
      {round && <header>{round}</header>}
      {Object.entries(data).map(([key, val]) => (
        <div className="entry" key={key}>
          <span className="key">{key}: </span>
          <span className="value">{val}</span>
        </div>
      ))}
    </div>
  );
};
const JobInterview = ({ org, title, rounds }) => {
  const { dispatch } = useContext(JobInterviewsContext);
  const onNewIntervierRoundClick = useCallback(() => {
    dispatch(setNewInterview({ org, title }));
  }, [dispatch, org, title]);
  return (
    <div className="column">
      <button onClick={onNewIntervierRoundClick}>New Interview Round</button>
      <Card data={{ org, title }} />
      {rounds.map((data, index) => (
        <Card
          key={index}
          round={`Round ${rounds.length - index}`}
          data={data}
        />
      ))}
    </div>
  );
};
const JobInterviews = () => {
  const { interviews } = useContext(JobInterviewsContext);
  return (
    <div className="columns-wrapper">
      {interviews.map(({ org, title, rounds }) => (
        <JobInterview key={org} org={org} title={title} rounds={rounds} />
      ))}
    </div>
  );
};

export default JobInterviews;
