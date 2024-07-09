import React, { useContext, useState } from "react";
import JobListForApp from "./JobListForApp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import "./JobListForApp.module.css";

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
    <div className="container">
      <h1>Job List</h1>
      <br />
      <div className="row">
        <div className="col-md-2">Company</div>
        <div className="col-md-3">Job Title</div>
        <div className="col-md-3">Job Description</div>
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
      </div>
      {isFetching && <h1>Loading...</h1>}
      {isError && <div>{error.message}</div>}
      {/* {mutation.isError && <div>{mutation.error.message}</div>} */}
      {isSuccess &&
        data.map((item) => {
          return (
            <JobListForApp
              key={item._id}
              id={item._id}
              company={item.company}
              title={item.title}
              jobDes={item.jobDes}
            />
          );
        })}
    </div>
  );
};

export default Applicant;
