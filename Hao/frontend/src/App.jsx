import React, { useState } from "react";
import Display from "./components/Display";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/user";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Applicant from "./components/Applicant";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, role, setRole }}
      >
        {/* {!accessToken && showLogin && <Login setShowLogin={setShowLogin} />}
        {!accessToken && !showLogin && (
          <Registration setShowLogin={setShowLogin}></Registration>
        )}
        {accessToken && <Display />} */}
        <Applicant></Applicant>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
