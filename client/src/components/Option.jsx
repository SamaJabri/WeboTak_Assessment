const Option = ({ value, className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {value}
    </div>
  );
};

export default Option;
