export const Authentication_Url = {
  LOGIN: "/api/user/login",
  CREATE_USER:"/api/user/create",
  CREATE_NURSE:"/api/user/create-nurse",
  UPDATE_NURSE:'/api/user/update',
} as const;

export const User_Url={
  GET_USER_LIST:"/api/user/list",
  GET_ROLE_LIST:'/api/user/roles',
  UPDATE_USER_STATUS:"/api/user/update-status",
  GET_USER_DETAILS:'/api/user/profile-details',
}
 export const Super_admin={
  SUPER_ADMIN_LOGIN:"/api/super-admin/login",
  GET_DASHBOARD_DETAILS:"/api/user/dashboard-count/super",
  DEACTIVATE_ADMIN:'/api/super-admin/deactivate-admin-user',
  ACTIVATE_ADMIN:'/api/super-admin/activate-admin-user'
 }