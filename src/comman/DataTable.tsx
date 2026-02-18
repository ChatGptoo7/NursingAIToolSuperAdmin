// import React from "react";
// import DataTable from "react-data-table-component";
// import { Eye } from "lucide-react";
// import "./commonTable.scss";
// import { EyeIcon } from "../../assets/icons/Icons";
// import Badge from 'react-bootstrap/Badge';

// const PatientCell = ({ row }) => {
//   const initials =
//     row.patientName && row.patientName !== "-"
//       ? row.patientName
//           .split(" ")
//           .map((n) => n[0])
//           .join("")
//           .slice(0, 2)
//       : "";

//   return (
//     <div className="patient_user_cell">
//       <div className="avatar">{initials}</div>
//       <div>
//         <h4 className="name">{row.patientName || "-"}</h4>
//         <p className="email">{row.patientEmail || "john@example.com"}</p>
//       </div>
//     </div>
//   );
// };

// const columns = (onView) => [
//   {
//     name: "Patient",
//     cell: (row) => <PatientCell row={row} />,
//     grow: 2,
//   },
//   {
//     name: "Facility",
//     selector: (row) => row.facilityName || "-",
//   },
//   {
//     name: "Test",
//     selector: (row) => row.testType || "-",
//   },
//   {
//     name: "Date",
//     selector: (row) =>
//       row.testDate
//         ? new Date(row.testDate).toLocaleDateString()
//         : "-",
//   },
//   {
//     name: "Status",
//     cell: (row) => (
//       <Badge
//         pill
//         className={`status-pill ${row.status
//           ?.toLowerCase()
//           .replace(" ", "-")}`}
//       >
//         {row.status}
//       </Badge>
//     ),
//   },
//   {
//     name: "Action",
//     cell: (row) => (
//       <span
//         className="action-icon"
//         onClick={() => onView(row)}
//       >
//         <EyeIcon />
//       </span>
//     ),
//     width: "80px",
//   },
// ];
// const CommonTable = ({
//   data = [],
//   loading = false,
//   onView,
// }) => {
//   return (
//     <DataTable
//       className="common_table"
//       columns={columns(onView)}
//       data={data}
//       progressPending={loading}
//       pagination
//       highlightOnHover
//       noDataComponent={
//         <div className="empty-state">No cases found</div>
//       }
//     />
//   );
// };

// export default CommonTable;

import DataTable from "react-data-table-component";
import "../assets/css/commanTable.scss";
export interface CommanTableProps{
    columns:any;
    data:any;
    loading:boolean;
    totalRows:number;
    onChangePage:(page:number)=>void;
    onChangeRowsPerPage:(newLimit:number,rowNumber:any)=>void
}
const CommonTable = ({
  columns,
  data = [],
  loading = false,
  totalRows = 0,
  onChangePage,
  onChangeRowsPerPage,
}:CommanTableProps) => {
  return (
    <DataTable
      className="common_table"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      highlightOnHover
      noDataComponent={<div className="empty-state">No cases found</div>}
    />
  );
};

export default CommonTable;
