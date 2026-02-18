import type { Axios, AxiosResponse } from "axios"
import { Authentication_Url, Super_admin, User_Url } from "../ApiEndPoints"
import { instance } from "../Axios"

 
 
export const getUserList=async(page: number, limit: number)=>{
    const response: AxiosResponse<any> = await instance.get(
    User_Url.GET_USER_LIST,
    {
      params: {
        userType: "admin",
        page,
        limit,
      },
    }
  );

  return response.data; // return data only (best practice)
}
export const getUserRoleList=async()=>{
     const response:AxiosResponse<any>=await instance.get(User_Url.GET_ROLE_LIST);
    return response;
}
export interface UpdateAdminProps{
    firstName:string,
    lastName:string,
    userId:string,
}
export const getUserProfileDetailsById=async(id?:string)=>{
        const response:AxiosResponse<any>=await instance.get(User_Url.GET_USER_DETAILS+(id?`?id=${id}`:""));
    return response;
}
export const getDashboardCount=async()=>{
        const response:AxiosResponse<any>=await instance.get(Super_admin.GET_DASHBOARD_DETAILS);
    return response;
}
export const updateAdmin=async({firstName,lastName,userId}:UpdateAdminProps)=>{
    const requestObject={
        userId:userId,
        firstName:firstName,
        lastName:lastName
    }
     const response:AxiosResponse<any>=await instance.patch(Authentication_Url.UPDATE_NURSE,requestObject);
    return response;   
}
 
export const getUserProfileDetails=async()=>{
     const response:AxiosResponse<any>=await instance.get(User_Url.GET_USER_DETAILS);
    return response;
}

export interface SuperAdminLoginProps{
    email:string,
    password:string
}
export const superAdminLogin=async({email,password}:SuperAdminLoginProps)=>{
    const requestObject={
        email:email,
        password:password
    }
     const response:AxiosResponse<any>=await instance.post(Super_admin.SUPER_ADMIN_LOGIN,requestObject);
    return response;
}
export interface CreateAdminProps{
    firstName:string,
    lastName:string,
    email:string,
    password:String
}
export const createAdmin=async({firstName,lastName,email,password}:CreateAdminProps)=>{
    const requestObject={
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
    }
     const response:AxiosResponse<any>=await instance.post(Authentication_Url.CREATE_USER,requestObject);
    return response;
}
export const deactivateAdmin=async(adminId:string)=>{
    const requestObject={
        adminId:adminId
    }
    const response:AxiosResponse<any>=await instance.post(Super_admin.DEACTIVATE_ADMIN,requestObject);
    return response;
}
export const activateAdmin=async(adminId:string)=>{
    const requestObject={
        adminId:adminId
    }
    const response:AxiosResponse<any>=await instance.post(Super_admin.ACTIVATE_ADMIN,requestObject);
    return response;
}