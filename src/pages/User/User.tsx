import { useTranslation } from "react-i18next";
import CommonTable from "../../comman/DataTable"
import { useNavigate } from "react-router-dom";
import { AdminUserRoleList } from "../../constant/Table";
import AddUserModal from "../../components/adduser/AddUser";
import { useState } from "react";
import './User.scss'
import { Button } from "react-bootstrap";
import { useGetUserList } from "../../hooks/User/User";
import { useActivateAdmin, useDeactivateAdmin } from "../../hooks/SuperAdmin/SuperAdmin";
import { toast } from "sonner";

export const User = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: userList, refetch: refetchUserList, isLoading } = useGetUserList(page, limit);
    const deactivateAdmin = useDeactivateAdmin();
    const activateAdmin = useActivateAdmin();

    const [addUserModalOpen, setAddUserModalOpen] = useState(false);
    const [dataToEdit, setDataToEdit] = useState<any>();
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newLimit: number, newPage: number) => {
        setLimit(newLimit);
        setPage(newPage);
    };
    const onStatusChange = async (row: any) => {
        try {
            if (row.status == 'active') {
                await deactivateAdmin.mutateAsync(row?.id);
            } else {
                await activateAdmin.mutateAsync(row?.id)
            }
            refetchUserList()
        } catch (error: any) {
            toast.error("Something went wrong!")
        }
    }
    const onEdit = (row: any) => {
        setAddUserModalOpen(true)
        setDataToEdit(row)
    }
    return (
        <>
            <div className="common_card">
                <div className="top_bar_flx mb_20">
                    <div className="top_bar_tittle">
                        <h2>User Management</h2>
                        <p>Create, view and manage platform users</p>
                    </div>
                    <div className="top_right_flx">
                        {/* <Button variant="secondary" size="sm">Export CSV</Button> */}
                        <Button variant="primary" size="sm" onClick={() => setAddUserModalOpen(true)}>Add User</Button>
                    </div>
                </div>



                <CommonTable
                    data={userList?.responseObject?.data}
                    columns={AdminUserRoleList(
                        (row: any) => navigate(`/user/details/${row.id}`),
                        (row: any) => onEdit(row),
                        t,
                        onStatusChange
                    )}
                    loading={false}
                    totalRows={1}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                />
            </div>
            <AddUserModal
                visible={addUserModalOpen}
                onClose={() => setAddUserModalOpen(false)}
                onSuccess={() => { }}
                dataToEdit={dataToEdit}
                refetchUserList={() => refetchUserList()}
            />

        </>
    )
}