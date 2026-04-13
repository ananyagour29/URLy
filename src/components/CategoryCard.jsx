import React from "react";

function CategoryCard({ category, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <span>{category.name}</span>
    </div>
  );
}

export default CategoryCard;