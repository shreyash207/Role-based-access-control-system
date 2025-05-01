import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import BlogList from "../components/BlogList";

export default function Blogs() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/blogPosts")
      .then((r) => setPosts(r.data))
      .catch(console.error);
  }, []);

  return (
    <div className="blogs-page">
      <h2>Blog Posts</h2>
      <BlogList
        items={posts}
        role={user.role}
        onSave={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
}
