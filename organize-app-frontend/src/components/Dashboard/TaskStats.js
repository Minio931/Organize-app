import classes from "./TaskStats.module.css";
import { useEffect, useState } from "react";
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
  const [chartData, setChartData] = useState();
  const [chartLabel, setChartLabel] = useState();
  const [numberOfDoneTasks, setNumberOfDoneTasks] = useState(0);
  const [numberOfUndoneTasks, setNumberOfUndoneTasks] = useState(0);

  const weeklyData = [];
  const monthlyData = [];
  const yearlyData = [];

  const calculateWeeklyData = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay();
    const last = first + 6;
    const firstDay = new Date(today.setDate(first));
    const lastDay = new Date(today.setDate(last));

    const weeklyTasks = props.tasks.filter((task) => {
      const taskDate = new Date(task.execution_date);

      return taskDate >= firstDay && taskDate <= lastDay && task.completion;
    });

    for (let i = 0; i < 7; i++) {
      const day = new Date(today.setDate(first + i));
      const dayTasks = weeklyTasks.filter((task) => {
        const taskDate = new Date(task.execution_date);
        return taskDate.getDate() - 1 === day.getDate();
      });
      weeklyData.push(dayTasks.length);
    }
  };

  const calculateMonthlyData = () => {
    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthlyTasks = props.tasks.filter((task) => {
      const taskDate = new Date(task.execution_date);
      return taskDate >= first && taskDate <= last && task.completion;
    });
    const labels = [];
    for (let i = 0; i < last.getDate(); i++) {
      const day = new Date(first.setDate(i + 1));
      labels.push(day.getDate());
      const dayTasks = monthlyTasks.filter((task) => {
        const taskDate = new Date(task.execution_date);

        return taskDate.getDate() - 1 === day.getDate();
      });
      monthlyData.push(dayTasks.length);
    }
    setChartLabel(labels);
  };

  const calculateYearlyData = () => {
    const today = new Date();
    const first = new Date(today.getFullYear(), 0, 1);
    const last = new Date(today.getFullYear(), 11, 31);

    const yearlyTasks = props.tasks.filter((task) => {
      const taskDate = new Date(task.execution_date);
      return taskDate >= first && taskDate <= last && task.completion;
    });

    for (let i = 0; i < 12; i++) {
      const monthTasks = yearlyTasks.filter((task) => {
        const taskDate = new Date(task.execution_date);
        return taskDate.getMonth() === i;
      });
      yearlyData.push(monthTasks.length);
    }
  };

  useEffect(() => {
    calculateWeeklyData();
    setChartLabel(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    setChartData(weeklyData);

    const doneTasks = props.tasks.filter((task) => task.completion);
    const undoneTasks = props.tasks.filter((task) => !task.completion);
    setNumberOfDoneTasks(doneTasks.length);
    setNumberOfUndoneTasks(undoneTasks.length);
  }, []);

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
    labels: chartLabel,
    datasets: [
      {
        label: "Todos",
        data: chartData,
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
    calculateWeeklyData();
    setChartLabel(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    setChartData(weeklyData);
    activeHandler("isWeekly");
  };
  const monthlyClickHandler = () => {
    calculateMonthlyData();
    setChartData(monthlyData);
    activeHandler("isMonthly");
  };
  const yearlyClickHandler = () => {
    calculateYearlyData();
    setChartData(yearlyData);
    setChartLabel([
      "Jun",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);
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
          <div>{numberOfDoneTasks}</div>
          <p>done</p>
        </div>
        <div className={classes["stats-notdone"]}>
          <div>{numberOfUndoneTasks}</div>
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
