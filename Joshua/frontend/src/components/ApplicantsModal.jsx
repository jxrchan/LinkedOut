import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import Resume from "./Resume"

const OverLay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {JSON.stringify(props.applicants)}
        {props.applicants.map((item)=>{
            return ( <>
                <div className="row">
                    {item.name}
                    </div>
                    <div className="row">
                        <Resume 
                        jobId = {props.jobId}
                        applicantId = {item._id}
                        />
                        </div>
                        </>

            )
        })}
      
      <button onClick={()=>{props.setShowApplicantsModal(false)}}> Close </button>
    </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          jobId={props.jobId}
          applicants={props.applicants}
          setShowApplicantsModal={props.setShowApplicantsModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
