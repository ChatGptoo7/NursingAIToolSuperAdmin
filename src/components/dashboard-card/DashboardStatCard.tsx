import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
export interface DashboardStatCardProps{
    title:string;
    value:string;
    color:string;
    icon:any;
}
export const DashboardStatCard=({title,value,color,icon}:DashboardStatCardProps)=>{
    const { t } = useTranslation();
  return (
    <div className="stat_card">
      <div className="stat_card_header">
        <div className="stat_left">
          <p>{title}</p>
          <h2>{value}</h2>
        </div>
        <div className={`stat_icon ${color}`}>{icon}</div>
      </div>
      <div className="stats_card_footer">
        <Badge pill bg="success">
          {t("dashboard.statOnTrack")}
        </Badge>
        <p>{t("dashboard.statReceivedToday")}</p>
      </div>
    </div>
  );
}