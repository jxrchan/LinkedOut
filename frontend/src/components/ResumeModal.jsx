import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import ReactDOM from "react-dom";
import styles from "./ResumeModal.module.css";
import UserContext from "../context/user"

const OverLay = (props) => {
  
  const userCtx = useContext(UserContext)
  const usingFetch = useFetch();

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["resumes", props.applicantId, props.jobId],
    queryFn: async () =>
      await usingFetch(
        `/employers/job/${props.applicantId}/${props.jobId}`,
        undefined,
        undefined,
        userCtx.accessToken
      ),
  });

  const formatResumeData = (data) => {
    if (!data) return null;

    return (
      <div className={styles.resumeContent}>
        {data.split("\n").map((line, index) => (
          <p key={index} className={styles.resumeLine}>
            {line}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {isFetching && <h1>Loading...</h1>}
        {isError && <div>{error.message}</div>}
        {console.log(data)}
        {isSuccess && formatResumeData(data)}

        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <button
            className="col-md-12"
            onClick={() => props.setShowResumeModal(false)}
          >
            Cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const ResumeUpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          applicantId={props.applicantId}
          jobId={props.jobId}
          setShowResumeModal={props.setShowResumeModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ResumeUpdateModal;
