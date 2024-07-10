import React, { useContext, useState } from "react";
import JobListForApp from "./JobListForApp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./JobListForApp.module.css";

const Applicant = () => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  //   const [title, setTitle] = useState("");
  //   const [author, setAuthor] = useState("");
  //   const [year, setYear] = useState("");

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () =>
      //   await usingFetch("/api/jobs", undefined, undefined, userCtx.accessToken),
      await usingFetch("/api/jobs", undefined, undefined),
  });

  //   const mutation = useMutation({
  //     mutationFn: async () =>
  //       await usingFetch(
  //         "/api/jobs",
  //         "PUT",
  //         { title, author, year },
  //         userCtx.accessToken
  //       ),
  //     onSuccess: () => {
  //       setTitle("");
  //       setAuthor("");
  //       setYear("");
  //       queryClient.invalidateQueries(["books"]);
  //     },
  //   });

  return (
    <div className={styles.container}>
      <h1>Job List Project</h1>
      <br />
      {isFetching && <h1>Loading...</h1>}
      {isError && <div>{error.message}</div>}
      {/* {mutation.isError && <div>{mutation.error.message}</div>} */}
      {isSuccess && (
        <div className={styles["job-list"]}>
          {data.map((item) => (
            <JobListForApp
              key={item._id}
              id={item._id}
              company={item.status}
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
