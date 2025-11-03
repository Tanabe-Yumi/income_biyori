import DataTable from "../../mui/dataTable";
import OperationButton from "../../mui/operationButtons";

export default function Content() {
  return (
    <div>
      {/* button: click to get high dividend stocks */}
      <OperationButton />
      <DataTable />
    </div>
  );
}
