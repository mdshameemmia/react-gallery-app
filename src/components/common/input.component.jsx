const Input = ({ type, checked, className, onEvent }) => (
  <input type={type} checked={checked} className={className} onChange={onEvent} />
);
export default Input;
