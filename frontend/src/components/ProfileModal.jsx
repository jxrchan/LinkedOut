import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ProfileModal.module.css";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const OverLay = (props) => {
  const usingFetch = useFetch();
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState(props.role);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await usingFetch("/auth/register", "PUT", {
        email,
        password,
        role,
        name,
        description,
      });
    },
    onSuccess: () => props.setShowProfileModal(false),
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h5 className={styles.textCenter}>Register Now</h5>
        <div className={styles.row}>
          <div className="col-md-3">Email</div>
          <input type="text" value={email} readOnly className={styles.input} />
        </div>
        <div className={styles.row}>
          <div className="col-md-3">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <div className="col-md-3">Name</div>
          <input
            placeholder="Please provide your name or the name of your company"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <div className="col-md-3">Description</div>
          <input
            placeholder="Please provide a personal statement or a description of your company"
            style={{ height: "80px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.register} onClick={mutate}>
            Register
          </button>
          <button
            className={styles.cancel}
            onClick={() => props.setShowProfileModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          email={props.email}
          setShowProfileModal={props.setShowProfileModal}
          role={props.role}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ProfileModal;
// import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import ReactDOM from "react-dom";
// import styles from "./Modal.module.css";
// import useFetch from "../hooks/useFetch";

// const OverLay = (props) => {

// const usingFetch = useFetch();
// const [email, setEmail] = useState(props.email);
// const [password, setPassword] = useState("");
// const [name, setName] = useState("");
// const [description, setDescription] = useState("");
// const [role, setRole] = useState(props.role)

// const {mutate} = useMutation({
//     mutationFn: async () => {
//       await usingFetch("/auth/register", "PUT", { email,
//         password, role, name, description
//        }, );
//     },
//     onSuccess: () => props.setShowProfileModal(false)
//   });

//   return (
//     <div className={styles.backdrop}>
//       <div className={styles.modal}>
//         <br />
//         <br />
//         Complete your registration
//         <div className="row">
//           <div className="col-md-3"></div>
//           <div className="col-md-3">Email</div>
//           <input
//             type="text"
//             className="col-md-3"
//             value={email}
//           />
//           <div className="col-md-3"></div>
//         </div>

//         <div className="row">
//           <div className="col-md-3"></div>
//           <div className="col-md-3">Password</div>
//           <input
//             type="password"
//             className="col-md-3"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="col-md-3"></div>
//         </div>

//         <br />

//         <div className="row">
//           <div className="col-md-3"></div>
//           <div className="col-md-3">Name</div>
//           <input
//             placeholder="Please provide your name or the name of your company"
//             type="text"
//             className="col-md-3"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <div className="col-md-3"></div>
//         </div>

//         <br/>

//         <div className="row">
//           <div className="col-md-3"></div>
//           <div className="col-md-3">Description</div>
//           <input
//             placeholder="Please provide a personal statement or a description of your company"
//             style= {{height: "50px"}}
//             type="text"
//             className="col-md-3"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <div className="col-md-3"></div>
//         </div>

//         <br/>

//         <div className="row">
//           <div className="col-md-3"></div>
//           <button className="col-md-3" onClick={mutate}>
//             Register
//           </button>
//           <button
//             className="col-md-3"
//             onClick={() => props.setShowProfileModal(false)}
//           >
//             Cancel
//           </button>
//           <div className="col-md-3"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProfileModal = (props) => {
//   return (
//     <>
//       {ReactDOM.createPortal(
//         <OverLay
//           email = {props.email}
//           setShowProfileModal = {props.setShowProfileModal}
//           role = {props.role}
//         />,
//         document.querySelector("#modal-root")
//       )}
//     </>
//   );
// };

// export default ProfileModal;
