// StickySearchBar.jsx
import React from "react";
import "./StickySearchBar.css";

const StickySearchBar = ({ value, onChange, inputRef }) => {
  return (
    <div className="sticky-search">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search shops..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default StickySearchBar;
