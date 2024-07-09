import React, { useEffect, useState } from "react";
import ApplyJobModal from "./ApplyJobModal";
import { useMutation} from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./JobListForApp.module.css";

const JobListForApp = (props) => {
  const usingFetch = useFetch();
  const [showApplyJobModal, setShowApplyJobModal] = useState(false);
  const [employerData, setEmployerData] = useState("");

  const { mutate, data, isSuccess } = useMutation({
    mutationFn: async () => {
      return usingFetch("/employers", "POST", { id: props.employerId });
    },
    onSuccess: (data) => {
      setEmployerData(data);
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <>
      {showApplyJobModal && isSuccess && data && (
        <ApplyJobModal
          applicantId = {props.applicantId}
          employerData = {employerData}
          jobId={props.jobId}
          title={props.title}
          jobDes={props.jobDes}
          setShowApplyJobModal={setShowApplyJobModal}
        />
      )}
     
      <div className={styles["job-item"]}>
        <div> {employerData.name}</div>
        <div style={{textAlign: "center", textTransform: "uppercase", fontWeight: "bold"}}>{props.title}</div>
        {/* <div>{props.jobDes}</div> */}
        <button onClick={() => setShowApplyJobModal(true)}>Apply</button>
      </div>
    </>
  );
};

export default JobListForApp;
