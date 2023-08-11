import { faker } from "@faker-js/faker";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";
import ExportButton from "../components/ExportButton";
import AdminTitleBar from "../components/AdminTitleBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const weeklyUserOption = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Weekly Active Users",
      },
    },
  };

  const weeklyUserLabel = [
    dayjs().add(-6, "day").format("dddd"),
    dayjs().add(-5, "day").format("dddd"),
    dayjs().add(-4, "day").format("dddd"),
    dayjs().add(-3, "day").format("dddd"),
    dayjs().add(-2, "day").format("dddd"),
    dayjs().add(-1, "day").format("dddd"),
    dayjs().add(0, "day").format("dddd"),
  ];

  const weeklyUserData = {
    labels: weeklyUserLabel,
    datasets: [
      {
        label: "Users",
        data: weeklyUserLabel.map(() =>
          faker.number.int({ min: 100, max: 1000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const weeklySubscriptionOption = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Weekly Subscription Revenues",
      },
    },
  };

  const weeklySubscriptionLabel = [
    dayjs().add(-6, "day").format("dddd"),
    dayjs().add(-5, "day").format("dddd"),
    dayjs().add(-4, "day").format("dddd"),
    dayjs().add(-3, "day").format("dddd"),
    dayjs().add(-2, "day").format("dddd"),
    dayjs().add(-1, "day").format("dddd"),
    dayjs().add(0, "day").format("dddd"),
  ];

  const weeklySubscriptionData = {
    labels: weeklySubscriptionLabel,
    datasets: [
      {
        label: "Revenues (in $)",
        data: weeklyUserLabel.map(() =>
          faker.number.int({ min: 1000, max: 100000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const monthlyUserOption = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Active Users",
      },
    },
  };

  const monthlyUserLabel = [
    dayjs().add(-11, "month").format("MMM"),
    dayjs().add(-10, "month").format("MMM"),
    dayjs().add(-9, "month").format("MMM"),
    dayjs().add(-8, "month").format("MMM"),
    dayjs().add(-7, "month").format("MMM"),
    dayjs().add(-6, "month").format("MMM"),
    dayjs().add(-5, "month").format("MMM"),
    dayjs().add(-4, "month").format("MMM"),
    dayjs().add(-3, "month").format("MMM"),
    dayjs().add(-2, "month").format("MMM"),
    dayjs().add(-1, "month").format("MMM"),
    dayjs().add(0, "month").format("MMM"),
  ];

  const monthlyUserData = {
    labels: monthlyUserLabel,
    datasets: [
      {
        label: "Users",
        data: monthlyUserLabel.map(() =>
          faker.number.int({ min: 1000, max: 100000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const monthlySubscriptionOption = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Active Subscriptions",
      },
    },
  };

  const monthlySubscriptionLabel = [
    dayjs().add(-11, "month").format("MMM"),
    dayjs().add(-10, "month").format("MMM"),
    dayjs().add(-9, "month").format("MMM"),
    dayjs().add(-8, "month").format("MMM"),
    dayjs().add(-7, "month").format("MMM"),
    dayjs().add(-6, "month").format("MMM"),
    dayjs().add(-5, "month").format("MMM"),
    dayjs().add(-4, "month").format("MMM"),
    dayjs().add(-3, "month").format("MMM"),
    dayjs().add(-2, "month").format("MMM"),
    dayjs().add(-1, "month").format("MMM"),
    dayjs().add(0, "month").format("MMM"),
  ];

  const monthlySubscriptionData = {
    labels: monthlySubscriptionLabel,
    datasets: [
      {
        label: "Renevues (in $)",
        data: monthlySubscriptionLabel.map(() =>
          faker.number.int({ min: 10000, max: 1000000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataForReport = (labels, data) => {
    const dataLength = labels.length;
    const values = data.datasets[0].data;
    let dataArray = [];
    for (let i = 0; i < dataLength; i++) {
      dataArray = [...dataArray, { label: labels[i], value: values[i] }];
    }
    return dataArray;
  };

  return (
    <>
      <div className="py-5 pr-5">
        <AdminTitleBar />
        <div className="grid lg:grid-cols-2 mt-10 border p-5 gap-10">
          <div>
            <ExportButton
              data={dataForReport(weeklyUserLabel, weeklyUserData)}
            />
            <Line options={weeklyUserOption} data={weeklyUserData} />
          </div>
          <div>
            <ExportButton
              data={dataForReport(monthlyUserLabel, monthlyUserData)}
            />
            <Line options={monthlyUserOption} data={monthlyUserData} />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 mt-10 border p-5 gap-3">
          <div>
            <ExportButton
              data={dataForReport(
                weeklySubscriptionLabel,
                weeklySubscriptionData
              )}
            />
            <Line
              options={weeklySubscriptionOption}
              data={weeklySubscriptionData}
            />
          </div>
          <div>
            <ExportButton
              data={dataForReport(
                monthlySubscriptionLabel,
                monthlySubscriptionData
              )}
            />
            <Line
              options={monthlySubscriptionOption}
              data={monthlySubscriptionData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
