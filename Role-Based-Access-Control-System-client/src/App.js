import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext";
import NavBar from "./components/NavBar";
import { ProtectedRoute } from "./ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import Profile from "./pages/Profile";
import AdminBlogDashboard from "./pages/AdminBlogDashboard";
import AdminUserDashboard from "./pages/AdminUserDashboard";

function AppRoutes() {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return <div>Loading…</div>;
  }

  return (
    <>
      {user && <NavBar />}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <ProtectedRoute path="/blogs">
          <Blogs />
        </ProtectedRoute>

        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute path="/admin-blogs">
          <AdminBlogDashboard />
        </ProtectedRoute>

        <ProtectedRoute path="/admin-users">
          <AdminUserDashboard />
        </ProtectedRoute>

        <Route path="/">
          {user === null
            ? <Redirect to="/login" />
            : <Redirect to="/blogs" />
          }
        </Route>
      </Switch>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
