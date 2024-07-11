import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./UpdateModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user"

const OverLay = (props) => {
  const userCtx = useContext(UserContext)
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [position, setPosition] = useState(props.position);
  const [description, setDescription] = useState(props.description);

  const updateJob = useMutation({
    mutationFn: async () =>
      await usingFetch("/employers/jobs", "PATCH", {
        position,
        description,
        id: props.id,
      }, userCtx.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries(["active jobs"]);
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
          <div className="col-md-3">Position</div>
          <input
            type="text"
            className="col-md-3"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Description</div>
          <input
            type="text"
            className="col-md-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="col-md-3"></div>
        </div>

        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <button className="col-md-3" onClick={updateJob.mutate}>
            Update
          </button>
          <button
            className="col-md-3"
            onClick={() => props.setShowUpdateModal(false)}
          >
            Cancel
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
          position={props.position}
          description={props.description}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
