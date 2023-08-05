import { Clear } from "@mui/icons-material";

const TableFilter = ({
  filterText,
  setFilterText,
  resetPaginationToggle,
  setResetPaginationToggle,
}) => {
  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  return (
    <div className="flex items-center gap-2 my-3">
      <input
        id="search"
        type="text"
        placeholder="Filter"
        className="px-2 py-1 outline outline-0 border-b"
        onChange={(e) => setFilterText(e.target.value)}
        value={filterText}
      />
      <button onClick={handleClear} className="text-2xl hover:text-red-500">
        <Clear fontSize="" />
      </button>
    </div>
  );
};

export default TableFilter;
