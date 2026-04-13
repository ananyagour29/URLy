import React, { useState, useEffect } from "react";
import LinkCard from "../components/LinkCard";

function CategoryPage({ category, goBack }) {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const allLinks = JSON.parse(localStorage.getItem("links")) || [];
    setLinks(allLinks.filter(l => l.categoryId === category.id));
  }, [category]);

  const addLink = () => {
    if (!url) return;
    const newLink = { id: Date.now(), url, description: desc, categoryId: category.id };
    const allLinks = JSON.parse(localStorage.getItem("links")) || [];
    const updated = [...allLinks, newLink];
    localStorage.setItem("links", JSON.stringify(updated));
    setLinks(updated.filter(l => l.categoryId === category.id));
    setUrl(""); setDesc("");
  };

  const deleteLink = (id) => {
    const allLinks = JSON.parse(localStorage.getItem("links")) || [];
    const updated = allLinks.filter(l => l.id !== id);
    localStorage.setItem("links", JSON.stringify(updated));
    setLinks(updated.filter(l => l.categoryId === category.id));
  };

  return (
    <div className="category-page">
      <button className="back-btn" onClick={goBack}>⬅ Back</button>
      <h2>{category.name}</h2>
      <input className="input-field" placeholder="Paste URL" value={url} onChange={e=>setUrl(e.target.value)} />
      <input className="input-field" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
      <button className="save-btn" onClick={addLink}>Save Link</button>
      <div className="links-list">
        {links.map(l => <LinkCard key={l.id} link={l} onDelete={deleteLink} />)}
      </div>
    </div>
  );
}

export default CategoryPage;