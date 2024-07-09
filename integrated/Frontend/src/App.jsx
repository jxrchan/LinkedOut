import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/user";
import Login from "./components/Login";
import Registration from "./components/Registration";
import EmployerDashboard from "./components/EmployerDashboard";
import JobSeekerDashboard from "./components/Applicant";
import Applicant from "./components/Applicant";
import Display from "./components/Display";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [role, setRole] = useState("");
  const [loggedInUserRole, setLoggedInUserRole] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          loggedInUserRole,
          setLoggedInUserRole,
        }}
      >
        {!accessToken && showLogin && <Login setShowLogin={setShowLogin} />}
        {!accessToken && !showLogin && (
          <Registration setShowLogin={setShowLogin} />
        )}

        {loggedInUserRole === "Employer" && accessToken && <Display />}
        {loggedInUserRole === "Job Seeker" && accessToken && <Applicant />}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
