import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import TerminatedJob from "./TerminatedJob";
import Job from "./Job";
import styles from "./Display.module.css";

const Display = () => {
  const [email, setEmail] = useState("GeneralAssembly@gmail.com");
  const [employerId, setEmployerId] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");

  // const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();

  // Get Employer Id
  const {
    isSuccess: isEmployerSuccess,
    isError: isEmployerError,
    error: employerError,
    isFetching: isEmployerFetching,
    data: employerData,
  } = useQuery({
    queryKey: ["employer"],
    queryFn: async () =>
      await usingFetch(`/employers/${email}`, undefined, undefined),
  });

  useEffect(() => {
    if (isEmployerSuccess && employerData) {
      setEmployerId(employerData._id);
    }
  }, [isEmployerSuccess, employerData]);

  // Get Employer Active Jobs
  const {
    isSuccess: isJobSuccess,
    isError: isJobError,
    error: jobError,
    isFetching: isJobFetching,
    data: jobData,
  } = useQuery({
    queryKey: ["active jobs"],
    queryFn: async () =>
      await usingFetch(`/employers/jobs/${employerId}`, undefined, undefined),
    enabled: !!employerId,
  });

  // Get Employer Inactive Jobs
  const {
    isSuccess: isTerminatedJobSuccess,
    isError: isTerminatedJobError,
    error: terminatedJobError,
    isFetching: isTerminatedJobFetching,
    data: terminatedJobData,
  } = useQuery({
    queryKey: ["terminated jobs"],
    queryFn: async () =>
      await usingFetch(
        `/employers/terminated-jobs/${employerId}`,
        undefined,
        undefined
      ),
    enabled: !!employerId,
  });

  const createJob = useMutation({
    mutationFn: async () =>
      await usingFetch("/employers/jobs", "PUT", {
        position: position,
        description: description,
        employer: employerId,
      }),
    onSuccess: () => {
      setPosition("");
      setDescription("");
      queryClient.invalidateQueries(["active jobs"]);
    },
  });

  return (
    <div className={styles.displayContainer}>
      {isEmployerFetching && <h1>Loading...</h1>}
      {isEmployerError && <div>{employerError.message}</div>}
      {console.log(JSON.stringify(employerData))}
      {console.log(employerId)}

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={position}
          placeholder="Position"
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createJob.mutate}>Create New Job</button>
      </div>

      <div className={styles.jobListContainer}>
        <div className={styles.jobListTitle}>Active Job Listings</div>

        {isJobFetching && <h1>Loading...</h1>}
        {isJobError && <div>{jobError.message}</div>}
        {/* {isJobSuccess && JSON.stringify(jobData)} */}
        {isJobSuccess &&
          jobData.map((item) => {
            return (
              <Job
                key={item._id}
                id={item._id}
                applicants={item.applicants}
                position={item.position}
                description={item.description}
                created={item.created}
                updated={item.updated}
              />
            );
          })}
      </div>

      <div className={styles.jobListContainer}>
        <div className={styles.jobListTitle}>Terminated Job Listings</div>

        {isTerminatedJobFetching && <h1>Loading...</h1>}
        {isTerminatedJobError && <div>{terminatedJobError.message}</div>}
        {/* {isTerminatedJobSuccess && JSON.stringify(terminatedJobData)} */}
        {isTerminatedJobSuccess &&
          terminatedJobData.map((item, idx) => {
            return (
              <TerminatedJob
                key={item._id}
                id={item._id}
                applicants={item.applicants}
                position={item.position}
                description={item.description}
                created={item.created}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Display;
