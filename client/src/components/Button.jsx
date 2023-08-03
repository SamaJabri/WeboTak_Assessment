const Button = ({ text, bgColor, color, navigateTo, type, onClick }) => {
  const buttonStyle = {
    background: bgColor,
    color: color,
  };

  return (
    <a href={navigateTo}>
      <button
        type={type}
        className="button"
        style={buttonStyle}
        onClick={onClick}
      >
        {text}
      </button>
    </a>
  );
};

export default Button;
