import React from "react";
import {useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const Resume = (props) => {
  const usingFetch = useFetch();
  const queryClient = useQueryClient();

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["resumes", props.applicantId, props.jobId],
    queryFn: async () =>
      await usingFetch(`/employers/job/${props.applicantId}/${props.jobId}`, undefined, undefined),
  });

  return (
    <>
    {isFetching && <h1>Loading...</h1>}
      {isError && <div>{error.message}</div>}
      {isSuccess && <a href={data}> see Resume {data} </a>}

    </>
  );
};

export default Resume;
