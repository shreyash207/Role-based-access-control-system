import React, { useState, useEffect } from "react";
import "../styles/BlogList.css";

export default function BlogList({ items, role, onSave, onDelete }) {
  const [posts, setPosts] = useState(items);

  useEffect(() => {
    setPosts(items);
  }, [items]);

  const updateField = (id, field, value) => {
    setPosts(ps =>
      ps.map(p => (p._id === id ? { ...p, [field]: value } : p))
    );
  };

  const [page, setPage] = useState(1);
  const pageSize = 2;
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageItems = posts.slice(start, start + pageSize);

  return (
    <div className="bloglist-container">
      <ul className="posts-list">
        {pageItems.map(p => (
          <li key={p._id}>
            <div className="post-meta">
              Posted on{" "}
              {new Date(p.timestamp).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                value={p.title}
                onChange={e => updateField(p._id, "title", e.target.value)}
                disabled={role !== "ADMIN"}
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                value={p.content}
                onChange={e => updateField(p._id, "content", e.target.value)}
                disabled={role !== "ADMIN"}
              />
            </div>

            {role === "ADMIN" && (
              <div className="btn-row">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    onSave(p._id, { title: p.title, content: p.content })
                  }
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          className="btn"
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn"
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
