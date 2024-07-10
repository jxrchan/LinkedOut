import React from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import ReactDOM from "react-dom";
import styles from "./ResumeModal.module.css"

const OverLay = (props) => {

  const usingFetch = useFetch();

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["resumes", props.applicantId, props.jobId],
    queryFn: async () =>
      await usingFetch(
        `/employers/job/${props.applicantId}/${props.jobId}`,
        undefined,
        undefined
      ),
  });

  return (
    <div className={styles.backdrop}>
    <div className={styles.modal}>

    {isFetching && <h1>Loading...</h1>}
    {isError && <div>{error.message}</div>}
    {console.log(data)}
    {isSuccess && data && data}
    
      <br />
      <div className="row">
        <div className="col-md-3"></div>
        <button
          className="col-md-6"
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

