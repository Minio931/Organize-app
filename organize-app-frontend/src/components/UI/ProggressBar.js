import classes from "./ProggressBar.module.css";

const ProggressBar = ({ proggress, className }) => {
  return (
    <div className={`${classes.proggress} ${className}`}>
      <div
        className={classes["inner-proggress"]}
        style={{ width: `${proggress}%` }}
      ></div>
    </div>
  );
};

export default ProggressBar;
