import { useTranslation } from "react-i18next";
import { DashboardStatCard } from "../../components/dashboard-card/DashboardStatCard"
 
import {  GrowthIcon, ShieldIcon } from "../../assets/icons/Icons";
import { useGetDashboardCount } from "../../hooks/SuperAdmin/SuperAdmin";
import { useEffect, useState } from "react";
export const AdminDashboard = () => {
    const { t } = useTranslation();
    const {data:dashboardDataHook}=useGetDashboardCount()
    const [dashboardData,setDashboardData]=useState<any>();
    useEffect(()=>{
        if(dashboardDataHook){
            setDashboardData(dashboardDataHook?.data?.responseObject)
        }
    },[dashboardDataHook])
    
    return (
        <>
            <div>
                <div className="dashboard-page">
                    {/* ================= STATS ================= */}
                    <div className="dashboard_stats_grid">
                        <DashboardStatCard
                            title={t("dashboard.totaladmin")}
                            value={dashboardData?.totalAdminCount ?? 0}
                            icon={<GrowthIcon />}
                            color="purple_bg_rbg"
                        />
                        <DashboardStatCard
                            title={t("dashboard.totalnurses")}
                            value={dashboardData?.totalNursesCount ?? 0}
                            icon={<ShieldIcon />}
                            color="orange_bg_rbg"
                        />
                        
                    </div>
                </div>
                

            </div>
        </>
    )
}