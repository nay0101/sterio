import { FileDownload } from "@mui/icons-material";

const ExportButton = ({ data }) => {
  const convertArrayOfObjectsToCSV = (data) => {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);
    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    data.forEach((item) => {
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

  function downloadCSV(data) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(data);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  return (
    <button
      className="flex justify-center items-center gap-2 border border-teal-700 rounded px-8 py-2 uppercase text-xl hover:text-white hover:bg-green-600"
      onClick={() => downloadCSV(data)}
    >
      Export <FileDownload fontSize="" />
    </button>
  );
};

export default ExportButton;
