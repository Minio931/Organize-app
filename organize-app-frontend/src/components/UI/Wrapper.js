import classes from "./Wrapper.module.css";

const Wrapper = (props) => {
  const className = props.className
    ? `${classes.wrapper} ${props.className}`
    : classes.wrapper;
  return <div className={className}>{props.children}</div>;
};

export default Wrapper;
