import classes from "./ProggressBar.module.css";

const ProggressBar = () => {
  return (
    <div className={classes.proggress}>
      <div className={classes["inner-proggress"]}></div>
    </div>
  );
};

export default ProggressBar;
