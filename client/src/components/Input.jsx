import React from "react";

const Input = ({ placeholder, type, textarea, name }) => {
  return (
    <>
      {textarea ? (
        <textarea
          className="input"
          placeholder={placeholder}
          name={name}
          rows={8}
          required
        ></textarea>
      ) : (
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          name={name}
          required
        />
      )}
    </>
  );
};

export default Input;
