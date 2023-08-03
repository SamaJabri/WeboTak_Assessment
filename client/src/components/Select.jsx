const Select = ({ name, options }) => {
  return (
    <select name={name}>
      {options?.map(({ option, index }) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
