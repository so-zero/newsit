import React from "react";

export default function Checkbox({ children, disabled, checked, onChange }) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
        className="checked:bg-black checked:border-0 focus:outline-none focus:ring-0 cursor-pointer"
      />
      {children}
    </label>
  );
}
