import React, { useContext, useState } from "react";
import "./JobListForApp.module.css";
import ApplyJobModal from "./ApplyJobModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

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

      <div className="row">
        <div className="col-md-2">{props.company}</div>
        <div className="col-md-3">{props.title}</div>
        <div className="col-md-3">{props.jobDes}</div>
        <button className="col-md-2" onClick={() => setShowApplyJobModal(true)}>
          Apply
        </button>
        <div className="col-md-2"></div>
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
