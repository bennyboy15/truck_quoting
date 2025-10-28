import React from "react";

function Input({ icon: Icon, placeholder }) {
  return (
    <label className="input flex items-center gap-2 border rounded-xl px-3 py-2">
      {Icon && <Icon className="w-5 h-5 text-gray-500" />}
      <input
        type="search"
        className="grow outline-none bg-transparent"
        placeholder={placeholder}
      />
    </label>
  );
}

export default Input;
