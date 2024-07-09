import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const OverLay = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(props.title);
  const [author, setAuthor] = useState(props.author);
  const [year, setYear] = useState(props.yearPublished);

  const { mutate: callUpdateBook } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/books/" + props.id,
        "PATCH",
        {
          title,
          author,
          year,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      props.setShowUpdateModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Title</div>
          <input
            type="text"
            className="col-md-3"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Author</div>
          <input
            type="text"
            className="col-md-3"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Year Published</div>
          <input
            type="text"
            className="col-md-3"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
          <div className="col-md-3"></div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <button className="col-md-3" onClick={callUpdateBook}>
            update
          </button>
          <button
            className="col-md-3"
            onClick={() => props.setShowUpdateModal(false)}
          >
            cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          title={props.title}
          author={props.author}
          yearPublished={props.yearPublished}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
