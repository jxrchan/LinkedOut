import React, { useEffect, useState } from "react";
import ApplyJobModal from "./ApplyJobModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import styles from "./JobListForApp.module.css";

const JobListForApp = (props) => {
  const usingFetch = useFetch();
  const [showApplyJobModal, setShowApplyJobModal] = useState(false);
  const [checkAppliedJob, setCheckAppliedJob] = useState("unapplied");

  const fetchCheckAppliedJob = useQuery({
    queryKey: ["applied status", props.jobId],
    queryFn: async () =>
      await usingFetch("/api/applied-jobs", "POST", {
        jobId: props.jobId,
        applicantId: props.applicantId,
      }),
  });

  const fetchEmployerData = useQuery({
    queryKey: ["employer", props.employerId],
    queryFn: async () =>
      await usingFetch("/employers", "POST", { id: props.employerId }),
  });

  useEffect(() => {
    if (fetchCheckAppliedJob.isSuccess && fetchCheckAppliedJob.data)
      setCheckAppliedJob(fetchCheckAppliedJob.data);
  }, [fetchCheckAppliedJob]);

  return (
    <>
      {showApplyJobModal &&
        fetchEmployerData.isSuccess &&
        fetchEmployerData.data && (
          <ApplyJobModal
            applicantId={props.applicantId}
            employerData={fetchEmployerData.data}
            jobId={props.jobId}
            title={props.title}
            jobDes={props.jobDes}
            setShowApplyJobModal={setShowApplyJobModal}
          />
        )}

      <div className={styles["job-item"]}>
        <div>
          {fetchEmployerData.isSuccess &&
            fetchEmployerData.data &&
            fetchEmployerData.data.name}
        </div>
        <div
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {props.title}
        </div>
        {/* <div>{props.jobDes}</div> */}
        {console.log(checkAppliedJob)}
        {checkAppliedJob === "unapplied" && (
          <button
            className={styles["button-unapplied"]}
            onClick={() => setShowApplyJobModal(true)}
          >
            Apply
          </button>
        )}
        {checkAppliedJob === "applied" && (
          <button className={styles["button-applied"]}> Applied </button>
        )}
      </div>
    </>
  );
};

export default JobListForApp;
