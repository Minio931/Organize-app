import classes from "./TaskStats.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";

import { Line } from "react-chartjs-2";
import useMenu from "../../hooks/useMenu";
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler,
  Colors
);

const TaskStats = (props) => {
  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getGradient = (ctx, chartArea) => {
    const colorStart = "rgba(253,251,255,0.4)";
    const colorMid = " rgba(219,218,219,0.4)";
    const colorEnd = "rgba(194,193,195,0.4)";

    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: [14, 5, 6, 20, 10, 15, 10],
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return getGradient(ctx, chartArea);
        },
        borderColor: "rgba(253,251,255,0.8)",

        tension: 0.3,
      },
    ],
  };
  const options = {
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(253,251,255,0.2)",
        },
        ticks: {
          color: "rgba(253,251,255,0.8)",
        },
      },

      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(253,251,255,0.2)",
        },
        ticks: {
          color: "rgba(253,251,255,0.8)",
        },
      },
    },
    color: "rgba(253,251,255,1)",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };
  const { state: activeState, activeHandler } = useMenu([
    "isWeekly",
    "isMonthly",
    "isYearly",
  ]);

  const { isWeekly, isMonthly, isYearly } = activeState;

  const weeklyClickHandler = () => {
    activeHandler("isWeekly");
  };
  const monthlyClickHandler = () => {
    activeHandler("isMonthly");
  };
  const yearlyClickHandler = () => {
    activeHandler("isYearly");
  };
  let weeklyClass = classes["chart-options-list-item"];
  let monthlyClass = classes["chart-options-list-item"];
  let yearlyClass = classes["chart-options-list-item"];
  if (isWeekly) {
    weeklyClass = `${classes["chart-options-list-item"]} ${classes["chart-options-list-item-active"]}`;
  }
  if (isMonthly) {
    monthlyClass = `${classes["chart-options-list-item"]} ${classes["chart-options-list-item-active"]}`;
  }
  if (isYearly) {
    yearlyClass = `${classes["chart-options-list-item"]} ${classes["chart-options-list-item-active"]}`;
  }

  return (
    <div className={classes["stats-wrapper"]}>
      <div className={classes["count-container"]}>
        <h2>Proggress</h2>
        <div className={classes["stats-done"]}>
          <div>100</div>
          <p>done</p>
        </div>
        <div className={classes["stats-notdone"]}>
          <div>23</div>
          <p>not done</p>
        </div>
      </div>
      <div className={classes["chart-container"]}>
        <Line options={options} data={data} />
      </div>
      <div className={classes["chart-options"]}>
        <ul className={classes["chart-options-list"]}>
          <li className={weeklyClass} onClick={weeklyClickHandler}>
            Weekly
          </li>
          <li className={monthlyClass} onClick={monthlyClickHandler}>
            Monthly
          </li>
          <li className={yearlyClass} onClick={yearlyClickHandler}>
            Yearly
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TaskStats;
