import React, { useContext, useState } from "react";
import styles from "./Book.module.css";
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
      queryClient.invalidateQueries(["terminated jobs"])
    },
  });


  return (
    <>
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

      <div>
        <div className="row"> <b> {props.position} </b> </div>
        <div className="row"> <em> {props.description} </em> </div>
        <br/>
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
     
   
          <button className="col-sm-2" onClick={() => setShowUpdateModal(true)}>
            update
          </button>
  
  
          <button className="col-sm-2" onClick={deleteListing.mutate}>
            delete
          </button>
    
    
          <button className="col-sm-2" onClick={terminateListing.mutate}>
            remove listing
          </button>
          </div>

 
      </div>
      <br/>
    </>
  );
};

export default Job;
