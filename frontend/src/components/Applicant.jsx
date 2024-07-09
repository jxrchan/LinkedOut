import React, { useContext, useEffect, useState } from "react";
import JobListForApp from "./JobListForApp";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./JobListForApp.module.css";

const Applicant = (props) => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();

  const [applicantName, setApplicantName] = useState("");
  const [applicantId, setApplicantId] = useState("")

  const {
    isSuccess: isApplicantSuccess,
    isError: isApplicantError,
    error: applicantError,
    isFetching: isApplicantFetching,
    data: applicantData,
  } = useQuery({
    queryKey: ["applicant"],
    queryFn: async () =>
      await usingFetch("/api/applicant", "POST", { email: props.email }),
  });

  useEffect(() => {
    if (isApplicantSuccess && applicantData) {
      setApplicantName(applicantData.name); 
      setApplicantId(applicantData._id);
    }
  }, [isApplicantSuccess, applicantData]);
  const {
    isSuccess: isGetJobsSuccess,
    isError: isGetJobsError,
    error: getJobsError,
    isFetching: isGetJobsFetching,
    data: getJobsData,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => await usingFetch("/api/jobs", undefined, undefined),
  });

  return (
    <div className={styles.container}>
      {isApplicantFetching && <h1>Loading...</h1>}
      {isApplicantError && <div>{applicantError.message}</div>}

      <div className={styles["img-container"]}>
        <img src="../../public/LinkedOut.png" alt="Banner" />
      </div>

      <div className={styles.banner}>
        <div className={styles.bannerTitle}>{`${applicantName}'s Dashboard`}</div>
      </div>
      <br />
      {isGetJobsFetching && <h1>Loading...</h1>}
      {isGetJobsError && <div>{getJobsError.message}</div>}
      {isGetJobsSuccess && (
        <div className={styles["job-list"]}>
          {getJobsData.map((item) => (
            <JobListForApp
              key={item._id}
              jobId={item._id}
              applicantId = {applicantId}
              employerId={item.employer}
              title={item.position}
              jobDes={item.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicant;
