import React, { useContext, useState } from "react";
import Book from "./Book";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const Display = () => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["books"],
    queryFn: async () =>
      await usingFetch("/api/books", undefined, undefined, userCtx.accessToken),
  });

  const mutation = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/books",
        "PUT",
        { title, author, year },
        userCtx.accessToken
      ),
    onSuccess: () => {
      setTitle("");
      setAuthor("");
      setYear("");
      queryClient.invalidateQueries(["books"]);
    },
  });

  return (
    <div className="container">
      <h1>Book List</h1>
      <div className="row">
        <input
          type="text"
          value={title}
          placeholder="title"
          className="col-md-3"
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          value={author}
          placeholder="author"
          className="col-md-3"
          onChange={(event) => setAuthor(event.target.value)}
        />
        <input
          type="text"
          value={year}
          placeholder="year published"
          className="col-md-3"
          onChange={(event) => setYear(event.target.value)}
        />
        <button className="col-md-3" onClick={mutation.mutate}>
          add
        </button>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-md-3">Title</div>
        <div className="col-md-3">Author</div>
        <div className="col-md-2">Year Published</div>
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
      </div>

      {isFetching && <h1>Loading...</h1>}

      {isError && <div>{error.message}</div>}
      {/* {mutation.isError && <div>{mutation.error.message}</div>} */}

      {isSuccess &&
        data.map((item) => {
          return (
            <Book
              key={item._id}
              id={item._id}
              title={item.title}
              author={item.author}
              yearPublished={item.year_published}
            />
          );
        })}
    </div>
  );
};

export default Display;
