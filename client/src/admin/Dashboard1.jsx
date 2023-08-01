import DataTable from "react-data-table-component";
import SideNav from "../components/SideNav";
import { useEffect, useMemo, useState } from "react";
import { publicRequest } from "../request-methods";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard1 = () => {
  const [films, setFilms] = useState([]);

  const convertArrayOfObjectsToCSV = (array) => {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(films[0]);
    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  };

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => <button onClick={onExport}>Export</button>;

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(films)} />,
    [films]
  );

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
  ];

  const getMovies = async () => {
    try {
      const url = "/film";
      let data = [];
      const { result } = (await publicRequest.get(url)).data;
      result.forEach((r) => {
        data = [...data, { title: r.film_name, year: r.year }];
      });
      setFilms(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      // legend: {
      //   position: 'top' as const,
      // },
      title: {
        display: true,
        text: "Movies",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      // {
      //   label: "Dataset 1",
      //   data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      //   borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
      {
        label: "Users",
        data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <section className="flex flex-col px-5 gap-10">
      {/* <SideNav /> */}
      <div className="">
        <DataTable
          columns={columns}
          data={films}
          selectableRows
          actions={actionsMemo}
          pagination
        />
      </div>

      <div className="">
        <Line options={options} data={data} />;
      </div>
    </section>
  );
};

export default Dashboard1;
