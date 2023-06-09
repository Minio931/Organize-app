import classes from "./BudgetView.module.css";

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
  Filler
);

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const BudgetView = (props) => {
  const getGradient = (ctx, chartArea) => {
    const colorStart = "rgba(138,45,187, 0.4)";
    const colorMid = "rgba(226,52,226, 0.4)";
    const colorEnd = "rgba(255,136,244, 0.4)";

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
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return getGradient(ctx, chartArea);
        },
        borderColor: "rgba(138,45,187, 0.8)",
        tension: 0.2,
      },
    ],
  };

  const options = {
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

  let budgetWeeklyClass = `${classes["budget-chart-option-item"]} `;
  let budgetMonthlyClass = `${classes["budget-chart-option-item"]} `;
  let budgetYearlyClass = `${classes["budget-chart-option-item"]} `;

  const { state: activeState, activeHandler } = useMenu([
    "isWeekly",
    "isMonthly",
    "isYearly",
  ]);

  const weeklyHandler = () => {
    activeHandler("isWeekly");
  };
  const monthlyHandler = () => {
    activeHandler("isMonthly");
  };
  const yearlyHandler = () => {
    activeHandler("isYearly");
  };

  if (activeState.isWeekly) {
    budgetWeeklyClass = `${classes["budget-chart-option-item"]} ${classes["budget-chart-option-item-active"]}`;
  }
  if (activeState.isMonthly) {
    budgetMonthlyClass = `${classes["budget-chart-option-item"]} ${classes["budget-chart-option-item-active"]}`;
  }
  if (activeState.isYearly) {
    budgetYearlyClass = `${classes["budget-chart-option-item"]} ${classes["budget-chart-option-item-active"]}`;
  }

  return (
    <div className={classes["budget-view"]}>
      <h2 className={classes["budget-header"]}>Budget</h2>
      <div className={classes["budget-chart-container"]}>
        <div className={classes.chart}>
          <Line
            id="budget-chart"
            className={classes.chart}
            options={options}
            data={data}
          />
        </div>
        <div className={classes["budget-chart-options"]}>
          <ul>
            <li onClick={weeklyHandler} className={budgetWeeklyClass}>
              Weekly
            </li>
            <li onClick={monthlyHandler} className={budgetMonthlyClass}>
              Monthly
            </li>
            <li onClick={yearlyHandler} className={budgetYearlyClass}>
              Yearly
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BudgetView;
