import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminBlogDashboard.css";
import BlogList from "../components/BlogList";

export default function AdminBlogDashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const load = async () => {
    const r = await axios.get("/api/blogPosts");
    setPosts(r.data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    await axios.post("/api/blogPosts", { title, content });
    setTitle("");
    setContent("");
    load();
  };

  const savePost = async (id, updated) => {
    await axios.put(`/api/blogPosts/${id}`, updated);
    load();
  };

  const deletePost = async (id) => {
    await axios.delete(`/api/blogPosts/${id}`);
    load();
  };

  return (
    <div className="admin-container">
      <h2>Admin: Blog Management</h2>

      <section className="create-post">
        <h3>Create New Post</h3>
        <div className="form-group">
          <label>Title</label>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={create}>
          Create
        </button>
      </section>

      <section className="existing-post">
        <h3>Existing Posts</h3>
        <BlogList
          items={posts}
          role="ADMIN"
          onSave={savePost}
          onDelete={deletePost}
        />
      </section>
    </div>
  );
}
