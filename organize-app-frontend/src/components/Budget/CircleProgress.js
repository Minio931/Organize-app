import classes from "./CircleProgress.module.css";

const CircleProgress = ({ progress, color }) => {
  const currentProgress = 175 - (175 * progress) / 100;
  return (
    <svg className={classes.progres_bar}>
      <circle
        cx="30"
        cy="34"
        r="28"
        className={classes["progress_bar__greyout"]}
      />
      <circle
        cx="30"
        cy="34"
        r="28"
        className={classes["progress_bar__progress"]}
        style={{ strokeDashoffset: `${currentProgress}`, stroke: `${color}` }}
      />
    </svg>
  );
};

export default CircleProgress;
