import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ApplyJobModal.module.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const OverLay = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [resumeText, setResumeText] = useState("");
  const changeHandler = (event) => {
    setResumeText(event.target.value);
  };

  const { mutate: applyJob } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/jobs/apply",
        "POST",
        {
          applicantId: props.applicantId,
          jobId: props.jobId,
        },
        userCtx.accessToken
      ),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      applyJob();
      const response = await usingFetch(
        "/api/jobs/resume/" + props.jobId,
        "POST",
        {
          applicantId: props.applicantId,
          document: resumeText,
        },
        userCtx.accessToken
      );
      console.log(response.data);
      queryClient.invalidateQueries("jobs");
      queryClient.invalidateQueries("applied status", props.jobId);
    } catch (error) {
      console.error("There was an error submitting the resume:", error);
    }

    props.setShowApplyJobModal(false);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.row}>
          <div className={styles.col}>
            <strong>Title:</strong>{" "}
            <p style={{ textTransform: "uppercase" }}> {props.title} </p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <strong>Job Description:</strong> {props.jobDes}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <strong>Employer:</strong> {props.employerData.name}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <strong>About Employer:</strong> {props.employerData.description}
          </div>
        </div>
        <div className={styles.row}>
          <form onSubmit={handleSubmit}>
            <textarea
              value={resumeText}
              onChange={changeHandler}
              placeholder="Enter your resume here"
              className={styles.textarea}
              required
            ></textarea>
            <br />
            <button type="submit">Submit Resume</button>
          </form>
        </div>
        <div className={styles.row}>
          <button
            className={`${styles.cancel}`}
            onClick={() => props.setShowApplyJobModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          applicantId={props.applicantId}
          jobId={props.jobId}
          employerData={props.employerData}
          title={props.title}
          jobDes={props.jobDes}
          setShowApplyJobModal={props.setShowApplyJobModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
