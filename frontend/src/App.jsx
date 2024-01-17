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
import AdminSite from "./pages/AdminSite";
import AdminActivity from "./pages/AdminActivity";
import AddSite from "./pages/AddSite";
import ModifySite from "./pages/ModifySite";
import ModifySiteId from "./pages/ModifySiteId";
import DeleteSite from "./pages/DeleteSite";
import CreateActivity from "./pages/CreateActivity";
import AddActivity from "./pages/AddActivity";
import DeleteActivity from "./pages/DeleteActivity";

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
            path="/admin/sites"
            element={userToken ? <AdminSite /> : <Unauthorized />}
          />
          <Route
            path="/admin/activities"
            element={userToken ? <AdminActivity /> : <Unauthorized />}
          />
          <Route
            path="/admin/sites/add"
            element={userToken ? <AddSite /> : <Unauthorized />}
          />
          <Route
            path="/admin/sites/modify"
            element={userToken ? <ModifySite /> : <Unauthorized />}
          />
          <Route
            path="/admin/sites/modify/:siteId"
            element={userToken ? <ModifySiteId /> : <Unauthorized />}
          />
          <Route
            path="/admin/sites/delete"
            element={userToken ? <DeleteSite /> : <Unauthorized />}
          />
          <Route
            path="/admin/activities/create"
            element={userToken ? <CreateActivity /> : <Unauthorized />}
          />
          <Route
            path="/admin/activities/add"
            element={userToken ? <AddActivity /> : <Unauthorized />}
          />
          <Route
            path="/admin/activities/delete"
            element={userToken ? <DeleteActivity /> : <Unauthorized />}
          />
        </Routes>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
