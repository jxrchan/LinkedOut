import React from "react";
import ReactDOM from "react-dom";
import Resume from "./Resume";
import styles from "./ApplicantsModal.module.css";

const OverLay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {props.applicants.map((item) => {
          return (
            <>
              <div className={styles.row}>{item.name}</div>
              <div className={styles.row}>
                <Resume jobId={props.jobId} applicantId={item._id} />
              </div>
            </>
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
