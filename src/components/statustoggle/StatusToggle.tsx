import "./StatusToggle.css";

type Props = {
  checked: boolean;
  onChange: () => void;
};

const StatusToggle = ({ checked, onChange }: Props) => {
  return (
    <div className="status-wrapper">
      <span className={`status-label ${checked ? "on" : "off"}`}>
        {checked ? "active" : "inactive"}
      </span>

      <div
        className={`mini-toggle ${checked ? "on" : "off"}`}
        onClick={onChange}
      >
        <div className="mini-circle" />
      </div>
    </div>
  );
};

export default StatusToggle;
