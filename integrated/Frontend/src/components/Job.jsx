import React, { useContext, useState } from "react";
import styles from "./Job.module.css";
import ApplicantsModal from "./ApplicantsModal";
import UpdateModal from "./UpdateModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const Job = (props) => {
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["active job applicants", props.id],
    queryFn: async () =>
      await usingFetch(`/employers/job/${props.id}`, undefined, undefined),
  });

  const deleteListing = useMutation({
    mutationFn: async () =>
      usingFetch("/employers/jobs/" + props.id, "DELETE", undefined),
    onSuccess: () => {
      queryClient.invalidateQueries(["active jobs"]);
    },
  });

  const terminateListing = useMutation({
    mutationFn: async () =>
      usingFetch("/employers/terminate-job/" + props.id, "PATCH", undefined),
    onSuccess: () => {
      queryClient.invalidateQueries(["active jobs"]);
      queryClient.invalidateQueries(["terminated jobs"]);
    },
  });

  return (
    <div className={styles.jobContainer}>
      {showApplicantsModal && (
        <ApplicantsModal
          jobId={props.id}
          applicants={data}
          setShowApplicantsModal={setShowApplicantsModal}
        />
      )}
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          position={props.position}
          description={props.description}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div className={styles.jobDetails}>
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

          <button
            className={styles.jobActionBtn}
            onClick={() => setShowUpdateModal(true)}
          >
            Update
          </button>

          <button
            className={styles.jobActionBtn}
            onClick={deleteListing.mutate}
          >
            Delete
          </button>

          <button
            className={styles.jobActionBtn}
            onClick={terminateListing.mutate}
          >
            Remove Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
