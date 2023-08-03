import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import ExportButton from "./ExportButton";
import TableFilter from "./TableFilter";

const Table = ({ title, data, columns }) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredData = data.filter((f_data) =>
    f_data.username.toLowerCase().includes(filterText.toLowerCase())
  );

  const exportReport = useMemo(() => <ExportButton data={data} />, [data]);

  const search = useMemo(
    () => (
      <TableFilter
        filterText={filterText}
        setFilterText={setFilterText}
        resetPaginationToggle={resetPaginationToggle}
        setResetPaginationToggle={setResetPaginationToggle}
      />
    ),
    [filterText, resetPaginationToggle]
  );

  return (
    <>
      <DataTable
        title={title}
        columns={columns}
        data={filteredData}
        actions={exportReport}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={search}
        persistTableHead
      />
    </>
  );
};

export default Table;
