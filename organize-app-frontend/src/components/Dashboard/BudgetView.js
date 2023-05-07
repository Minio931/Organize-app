import classes from "./BudgetView.module.css";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bubble } from "react-chartjs-2";
ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);
export const data = {
  datasets: [
    {
      label: "Expenses",
      data: [
        {
          x: "2023-05-07",
          y: 300,
          r: 10,
        },
        {
          x: "2023-05-08",
          y: 400,
          r: 15,
        },
        {
          x: "2023-05-09",
          y: 100,
          r: 5,
        },
        {
          x: "2023-05-10",
          y: 200,
          r: 7,
        },
        {
          x: "2023-05-11",
          y: 300,
          r: 10,
        },
        {
          x: "2023-05-12",
          y: 300,
          r: 10,
        },
        {
          x: "2023-05-13",
          y: 300,
          r: 10,
        },
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

const BudgetView = (props) => {
  const options = props.options;
  return (
    <div className={classes["budget-view"]}>
      <h2 className={classes["budget-header"]}>Budget</h2>
      <div className={classes["budget-chart-container"]}>
        <div className={classes.chart}>
          <Bubble className={classes.chart} options={options} data={data} />
        </div>
        <div className={classes["budget-chart-options"]}>
          <ul>
            <li>Weekly</li>
            <li>Monthly</li>
            <li>Yearly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BudgetView;
