import classes from "./ProggressBar.module.css";

const ProggressBar = ({ proggress }) => {
  return (
    <div className={classes.proggress}>
      <div
        className={classes["inner-proggress"]}
        style={{ width: `${proggress}%` }}
      ></div>
    </div>
  );
};

export default ProggressBar;
