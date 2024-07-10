import React, { useContext, useState } from "react";
import styles from "./Book.module.css";
import UpdateModal from "./UpdateModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const Book = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/api/books/" + props.id,
        "DELETE",
        undefined,
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          title={props.title}
          author={props.author}
          yearPublished={props.yearPublished}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div className={`row ${styles.book}`}>
        <div className="col-sm-3">{props.title}</div>
        <div className="col-sm-3">{props.author}</div>
        <div className="col-sm-2">{props.yearPublished}</div>

        {userCtx.role === "admin" ? (
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
        )}
      </div>
    </>
  );
};

export default Book;
