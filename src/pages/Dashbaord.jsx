import React, { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import CategoryPage from "./CategoryPage";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(data);
  }, []);

  const addCategory = () => {
    if (!name) return;
    const newCat = { id: Date.now(), name };
    const updated = [...categories, newCat];
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
    setName("");
  };

  const deleteCategory = (id) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
    const allLinks = JSON.parse(localStorage.getItem("links")) || [];
    localStorage.setItem("links", JSON.stringify(allLinks.filter(l => l.categoryId !== id)));
  };

  if (selected) return <CategoryPage category={selected} goBack={()=>setSelected(null)} />;

  return (
    <div className="dashboard">
      <h2>URLy</h2>
      <input className="input-field" placeholder="New Category" value={name} onChange={e=>setName(e.target.value)} />
      <button className="save-btn" onClick={addCategory}>Add Category</button>
      <div className="categories-list">
        {categories.map(c => (
          <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <CategoryCard category={c} onClick={()=>setSelected(c)} />
            <button className="category-delete-btn" onClick={()=>deleteCategory(c.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;