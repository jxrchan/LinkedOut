import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import ProfileModal from "./ProfileModal";

const Registration = (props) => {
  const usingFetch = useFetch();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => await usingFetch("/roles"),
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await usingFetch("/auth/register", "POST", { email });
    },
    onSuccess: () => setShowProfileModal(true),
  });

  return (
    <>
      {showProfileModal && (
        <ProfileModal
          email={email}
          role={role}
          setShowProfileModal={setShowProfileModal}
        />
      )}
      <body className="register-body">
        <div className="container registration-container">
          <h2 className="text-center">Sign Up</h2>
          <div className="form-group">
            <label htmlFor="roles">Register as</label>
            <select
              name="roles"
              id="roles"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="none">Select</option>
              {data &&
                data.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              placeholder="hello@gmail.com"
              type="text"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary w-100" onClick={mutate}>
              Register
            </button>
          </div>

          <div className="form-group">
            <button
              className="btn btn-secondary w-100"
              onClick={() => props.setShowLogin(true)}
            >
              Login Now!
            </button>
          </div>
        </div>
      </body>
    </>
  );
};

export default Registration;
