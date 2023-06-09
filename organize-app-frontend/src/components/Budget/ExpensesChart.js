import classes from "./ExpensesChart.module.css";
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

const ExpensesChart = ({ className, transactions }) => {
  const transaction = transactions.transactions
    ? transactions.transactions
    : [];
  const transactionData = [];
  const labels = [];
  const preprocessTransactionData = (transactions) => {
    transactions.map((transaction) => {
      transactionData.push(
        parseInt(transaction.value.slice(1).replaceAll(",", ""))
      );
      labels.push(
        new Date(transaction.transaction_date).toUTCString().slice(0, 10)
      );
    });
  };

  preprocessTransactionData(transaction);
  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(138,45,187, 0)",
        borderColor: "rgba(138,45,187, 0.8)",
        tension: 0.2,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  const chartWrapperClasses = `${classes["chart-wrapper"]} ${className}`;
  return (
    <div className={chartWrapperClasses}>
      <div className={classes["chart-title"]}>Expenses</div>
      <div className={classes["chart-container"]}>
        <Line
          id="budget-chart"
          className={classes["chart"]}
          // height={450}
          // width={1100}
          style={{ width: "100%", height: "90%" }}
          options={options}
          data={data}
        />
      </div>
    </div>
  );
};

export default ExpensesChart;
