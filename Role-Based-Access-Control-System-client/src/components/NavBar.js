import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();

  const onLogout = async () => {
    await logout();
    history.push("/login");
  };

  if (!user) return null;

  return (
    <nav
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link to="/blogs" style={{ marginRight: "1rem" }}>
          Blogs
        </Link>
        {user.role === "ADMIN" && (
          <>
            <Link to="/admin-blogs" style={{ marginRight: '1rem' }}>Admin Blogs</Link>
            <Link to="/admin-users" style={{ marginRight: '1rem' }}>Admin Users</Link>
          </>
        )}
      </div>

      <div>
        <span style={{ marginRight: "1rem" }}>Hello, {user.name}</span>
        <Link to="/profile" style={{ marginRight: "1rem" }}>
          Profile
        </Link>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
