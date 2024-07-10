import React, { useContext, useState } from "react";
import ApplyJobModal from "./ApplyJobModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./JobListForApp.module.css";

const JobListForApp = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [showApplyJobModal, setShowApplyJobModal] = useState(false);

  //   const { mutate } = useMutation({
  //     mutationFn: async () =>
  //       usingFetch(
  //         "/api/jobs/" + props.id,
  //         "DELETE",
  //         undefined,
  //         userCtx.accessToken
  //       ),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["books"]);
  //     },
  //   });

  return (
    <>
      {showApplyJobModal && (
        <ApplyJobModal
          id={props.id}
          company={props.company}
          title={props.title}
          jobDes={props.jobDes}
          setShowApplyJobModal={setShowApplyJobModal}
        />
      )}

      <div className={styles["job-item"]}>
        <div>{props.company}</div>
        <div>{props.title}</div>
        <div>{props.jobDes}</div>
        <button onClick={() => setShowApplyJobModal(true)}>Apply</button>
        {/* {userCtx.role === "admin" ? (
          <>
            <button
              className="col-sm-2"
              onClick={() => setShowUpdateModal(true)}
            >
              update
            </button>
            <button className="col-sm-2" onClick={mutate}>
              delete
            </button>
          </>
        ) : (
          <>
            <button
              className="col-sm-2"
              onClick={() => setShowUpdateModal(true)}
              disabled
            >
              update
            </button>
            <button className="col-sm-2" onClick={mutate} disabled>
              delete
            </button>
          </>
        )} */}
      </div>
    </>
  );
};

export default JobListForApp;
