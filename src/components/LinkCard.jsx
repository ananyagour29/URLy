import React from "react";

function LinkCard({ link, onDelete }) {
  return (
    <div className="link-card">
      <p>{link.description || "No description"}</p>
      <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
        <button className="link-delete" onClick={() => onDelete(link.id)}>
          Delete
        </button>
        <a href={link.url} target="_blank" rel="noreferrer">Open Link 🔗</a>
      </div>
    </div>
  );
}

export default LinkCard;