import { Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import Cookies from "js-cookie";
import AdminContext from "./context/AdminContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Sites from "./pages/Sites";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Admin from "./pages/Admin";
import AddSite from "./pages/AddSite";
import ModifySite from "./pages/ModifySite";
import ModifySiteId from "./pages/ModifySiteId";
import DeleteSite from "./pages/DeleteSite";

import "./App.css";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 1 / 24,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  const adminContextValue = useMemo(
    () => ({
      userToken,
      setUser,
      setUserToken,
    }),
    [userToken, setUser, setUserToken]
  );

  return (
    <div className="App">
      <AdminContext.Provider value={adminContextValue}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sites/:id" element={<Sites />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={userToken ? <Admin /> : <Unauthorized />}
          />
          <Route
            path="/sites/add"
            element={userToken ? <AddSite /> : <Unauthorized />}
          />
          <Route
            path="/sites/modify"
            element={userToken ? <ModifySite /> : <Unauthorized />}
          />
          <Route
            path="/sites/modify/:siteId"
            element={userToken ? <ModifySiteId /> : <Unauthorized />}
          />
          <Route
            path="/sites/delete"
            element={userToken ? <DeleteSite /> : <Unauthorized />}
          />
        </Routes>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
