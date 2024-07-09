import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ApplyJobModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const OverLay = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  // const [title, setTitle] = useState(props.title);
  // const [author, setAuthor] = useState(props.author);
  // const [year, setYear] = useState(props.yearPublished);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  // const fileInput = createRef();
  const formData = new FormData();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    event.target.files[0] && setIsFilePicked(true);
  };

  // formData.set("resume", fileInput.current.value);
  formData.append("File", selectedFile);

  const { mutate: callApplyJob } = useMutation({
    mutationFn: async () =>
      await usingFetch("/api/jobs/resume/" + props.id, "POST", formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      props.setShowApplyJobModal(false);
    },
  });

  // const { mutate: callUpdateBook } = useMutation({
  //   mutationFn: async () =>
  //     await usingFetch(
  //       "/api/books/" + props.id,
  //       "PATCH",
  //       {
  //         title,
  //         author,
  //         year,
  //       },
  //       userCtx.accessToken
  //     ),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["books"]);
  //     props.setShowUpdateModal(false);
  //   },
  // });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.row}>
          <div className={styles.col}>
            <strong>Title:</strong> {props.title}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <strong>Company:</strong> {props.company}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <strong>Job Description:</strong> {props.jobDes}
          </div>
        </div>
        <div className={styles.row}>
          {/* <button className="col-md-3" onClick={callUpdateBook}>
            update
          </button> */}
          <input type="file" name="file" onChange={changeHandler}></input>
        </div>
        <div className={styles.row}>
          <button type="submit" onClick={callApplyJob}>
            Submit
          </button>
          <button
            className={`${styles.cancel}`}
            onClick={() => props.setShowApplyJobModal(false)}
          >
            Cancel
          </button>
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
          company={props.company}
          jobDes={props.jobDes}
          setShowApplyJobModal={props.setShowApplyJobModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
