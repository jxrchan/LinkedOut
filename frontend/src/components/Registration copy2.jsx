import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useMutation, useQuery } from "@tanstack/react-query";

const Registration = (props) => {
  const usingFetch = useFetch();
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => await usingFetch("/roles"),
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await usingFetch("/auth/register", "PUT", { email, password, role });
    },
    onSuccess: () => props.setShowLogin(true),
  });

  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-4"></div>
        <input
          className="col-md-4"
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <input
          className="col-md-4"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <select
          name="roles"
          id="roles"
          className="col-md-4"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value="none">select</option>
          {data &&
            data.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
        <div className="col-md-4"></div>

        <div className="row">
          <div className="col-md-4"></div>
          <button className="col-md-4" onClick={mutate}>
            register
          </button>
          <div className="col-md-4"></div>
        </div>

        <div className="row">
          <div className="col-md-4"></div>
          <button className="col-md-4" onClick={() => props.setShowLogin(true)}>
            go to login screen
          </button>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Registration;
