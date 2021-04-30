import React, { useCallback, useRef, useContext, useState } from "react";
import {
  addJobInterview,
  addInterview,
  JobInterviewsContext,
  setNewInterview
} from "../state/JobInterviewsContext";
import "./styles.css";

const NewJobInterviewForm = ({ prefillValue, onCancel }) => {
  const { newInterview, dispatch } = useContext(JobInterviewsContext);
  const orgRef = useRef();
  const titleRef = useRef();
  const datetimeRef = useRef();
  const typeRef = useRef();
  const descRef = useRef();

  const handleCancel = ({ target }) => {
    dispatch(setNewInterview(null));
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { elements } = e.target;
      let interview = {};
      let isValid = true;
      for (let elem of elements) {
        if (elem.name && elem.name.length) {
          isValid = isValid && elem.checkValidity();
          interview[elem.name] = elem.value;
        }
      }
      if (isValid) {
        if (newInterview?.org) {
          dispatch(addInterview(interview));
        } else {
          dispatch(addJobInterview(interview));
        }
      }
    },
    [dispatch, newInterview]
  );

  if (!newInterview) {
    return null;
  }

  return (
    <div className="backdrop">
      <div className="form-wrapper">
        <form onSubmit={onSubmit}>
          <header>Job Detail</header>
          <div className="form-control">
            <label htmlFor="organization">Org</label>
            <input
              id="organization"
              name="org"
              ref={orgRef}
              defaultValue={newInterview?.org}
              disabled={newInterview?.org}
              type="text"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              defaultValue={newInterview?.title}
              disabled={newInterview?.title}
              ref={titleRef}
              type="text"
              required
            />
          </div>
          <header>Interview Detail</header>
          <div className="form-control">
            <label htmlFor="type">Type</label>
            <select id="type" name="type" ref={typeRef} required>
              <option>Telephonic</option>
              <option>Video Call</option>
              <option>Face 2 Face</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="title">Date & Time</label>
            <input
              id="title"
              name="datetime"
              ref={datetimeRef}
              type="datetime-local"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="desc">Description</label>
            <textarea id="desc" name="description" ref={descRef} />
          </div>
          <footer>
            <button className="primary" type="submit">
              Submit
            </button>
            <button type="reset" onClick={handleCancel}>
              Cancel
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default NewJobInterviewForm;
