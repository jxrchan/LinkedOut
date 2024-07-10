import React, { useState } from "react";
import ReactDOM from "react-dom";
import Resume from "./ResumeModal";
import styles from "./ApplicantsModal.module.css";

const OverLay = (props) => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [applicantId, setApplicantId] = useState("");

  const handleSeeResume = async (item) => {
    setShowResumeModal(true);
    setApplicantId(item._id);
  };

  return (
    <>
      {showResumeModal && (
        <Resume
          applicantId={applicantId}
          jobId={props.jobId}
          setShowResumeModal={setShowResumeModal}
        />
      )}

      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <h1> Click Applicants to see their Resume</h1>
          {props.applicants.map((item) => {
            return (
              <button
                onClick={() => {
                  handleSeeResume(item);
                }}
              >
                {item.name}
              </button>
            );
          })}

          <button
            className={styles.closeButton}
            onClick={() => {
              props.setShowApplicantsModal(false);
            }}
          >
            {" "}
            Close{" "}
          </button>
        </div>
      </div>
    </>
  );
};

const UpdateModal = (props) => {
  return ReactDOM.createPortal(
    <OverLay
      jobId={props.jobId}
      applicants={props.applicants}
      setShowApplicantsModal={props.setShowApplicantsModal}
    />,
    document.querySelector("#modal-root")
  );
};

export default UpdateModal;
