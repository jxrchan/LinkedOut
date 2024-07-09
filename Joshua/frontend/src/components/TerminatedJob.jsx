import React, {useState } from "react";
import ApplicantsModal from "./ApplicantsModal";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const TerminatedJob = (props) => {
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["terminated job applicants"],
    queryFn: async () =>
      await usingFetch(`/employers/job/${props.id}`, undefined, undefined),
  });

  return (
    <>
      {showApplicantsModal && (
        <ApplicantsModal
          jobId={props.jobId}
          setShowApplicantsModal={setShowApplicantsModal}
          applicants={data}
        />
      )}

      <div>
        <div className="row"> <b> {props.position} </b> </div>
        <div className="row"> <em> {props.description} </em> </div>
        <div className="row">
          {isFetching && <h1>Loading...</h1>}
          {isError && <div>{error.message}</div>}
          {isSuccess && (
            <button
              className="col-sm-2"
              onClick={() => {
                setShowApplicantsModal(true);
              }}
            >
                see {props.applicants.length} applicants
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TerminatedJob;
