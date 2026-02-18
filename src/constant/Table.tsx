import { CFormSwitch, CTableDataCell } from "@coreui/react";
import { Edit, Eye, EyeIcon, Pencil } from "lucide-react";
import { Badge } from "react-bootstrap";
import StatusToggle from "../components/statustoggle/StatusToggle";

const PatientCell = ({ row }: any) => {
  const initials =
    row.patientName && row.patientName !== "-"
      ? row.patientName
        .split(" ")
        .map((n: any) => n[0])
        .join("")
        .slice(0, 2)
      : "";

  return (
    <div className="patient_user_cell">
      <div className="avatar">{initials}</div>
      <div>
        <h4 className="name">{row.patientName || "-"}</h4>
        <p className="email">
          {row.patientEmail || "john@example.com"}
        </p>
      </div>
    </div>
  );
};
export const AdminUserRoleList = (onView: any, onEdit: any, t: any, handleStatusToggle: any) => [
  {
    name: t("table.name"),
    selector: (row: any) => row?.firstName + " " + (row?.lastName ?? ""),
  },
  {
    name: t("table.email"),
    selector: (row: any) => row?.email
  },
  {
    name: t("table.role"),
    selector: (row: any) => row?.role
  },
  {
    name: t("table.status"),
    cell: (row: any) => (
      <StatusToggle
        checked={row.status === "active"}
        onChange={() => handleStatusToggle(row)}
      />
    )
  },
  {
    name: t("table.action"),
    cell: (row: any) => (
      <>
        <div className="d-flex gap-3">
          <button onClick={() => onView(row)} className="bg-transparent border-0 p-0 d-flex align-items-center justify-content-center">
            <Eye size={22} color="#344054"/>
          </button>
          <button onClick={() => onEdit(row)} className="bg-transparent border-0 p-0 d-flex align-items-center justify-content-center">
            <Pencil size={22} color="#344054"/>
          </button>
        </div>
      </>
    ),
  },
]
export const AdminDashboardTable = (onView: any, t: any) => [
  {
    name: t("table.reportId"),
    selector: (row: any) => getReportId(row?.reportId),
  },
  {
    name: t("table.patient"),
    cell: (row: any) => <PatientCell row={row} />,
    grow: 2,
  },
  {
    name: t("table.type"),
    selector: (row: any) => row.testType || "-",
  },
  {
    name: t("table.assignedTo"),
    selector: (row: any) => row?.firstName || "-",
  },
  {
    name: t("table.status"),
    cell: (row: any) => {
      const statusConfig =
        STATUS_BADGE_MAP[row.status as StatusType] ?? {
          bg: "dark",
          text: row.status || "Unknown",
        };

      return (
        <Badge
          pill
          bg={statusConfig.bg}
          text={statusConfig.text}
        >
          {statusConfig.text}
        </Badge>
      );
    },
  },
  {
    name: t("table.action"),
    cell: (row: any) => (
      <span
        className="action-icon"
        onClick={() => onView(row)}
      >
        <EyeIcon />
      </span>
    ),
  },
];
function getReportId(id: any) {
  return `REP-${id.slice(-6).toUpperCase()}`;
}
type StatusType = "Completed" | "Reviewed" | "Pending" | "Rejected";

const STATUS_BADGE_MAP: Record<
  StatusType,
  { bg: string; text: string }
> = {
  Completed: { bg: "success", text: "Completed" },
  Reviewed: { bg: "warning", text: "Reviewed" },
  Pending: { bg: "danger", text: "Pending" },
  Rejected: { bg: "secondary", text: "Rejected" },
};