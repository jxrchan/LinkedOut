import React, { useState, useContext } from "react";
import styles from "./TerminatedJob.module.css";
import ApplicantsModal from "./ApplicantsModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user"

const TerminatedJob = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["terminated job applicants"],
    queryFn: async () =>
      await usingFetch(`/employers/job/${props.id}`, undefined, undefined, userCtx.accessToken),
  });

  return (
    <div className={styles.terminatedJobContainer}>
      {showApplicantsModal && (
        <ApplicantsModal
          jobId={props.jobId}
          setShowApplicantsModal={setShowApplicantsModal}
          applicants={data}
        />
      )}

      <div className={styles.terminatedJobDetails}>
        <div className={styles.jobPosition}>{props.position}</div>
        <div className={styles.jobDescription}>{props.description}</div>
        <div className={styles.jobActions}>
          {isFetching && <span>Loading...</span>}
          {isError && <div>{error.message}</div>}
          {isSuccess && (
            <button
              className={styles.jobActionBtn}
              onClick={() => setShowApplicantsModal(true)}
            >
              See {props.applicants.length} applicants
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminatedJob;
