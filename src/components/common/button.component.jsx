const Button = ({ className, type, onEvent, text }) => (
  <button className={` btn ${className}`} onClick={onEvent} type={type}>
    {text}
  </button>
);
export default Button;
