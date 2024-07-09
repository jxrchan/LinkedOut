import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import "./Login.css";

const Login = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isError, error, data, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        return await usingFetch("/auth/login", "POST", { email, password });
      } catch (error) {
        throw error.message;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setRole(decoded.role);
      userCtx.setLoggedInUserRole(decoded.role); // Set logged-in user role here
    }
  }, [data]);

  useEffect(() => {
    props.setEmail(email);
  }, [email]);


  return (
    <div className="login-body">
      <div className="container">
        {isError && (
          <div className="alert alert-danger">{JSON.stringify(error)}</div>
        )}
        <div className="login-container">
          <div className="row mb-3">
            <div className="col text-center">
              <img
                src="/LinkedOut.png"
                alt="User icon"
                className="img-fluid login-logo"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <button className="btn btn-primary w-100" onClick={refetch}>
                Login
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button
                className="btn btn-secondary w-100"
                onClick={() => props.setShowLogin(false)}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
