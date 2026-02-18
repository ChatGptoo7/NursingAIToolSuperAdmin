import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAdmin, getUserList, getUserProfileDetails, getUserProfileDetailsById, getUserRoleList, updateAdmin, type CreateAdminProps, type UpdateAdminProps } from "../../services/UserApi/UsetApi";
export const useGetUserList = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["userList", page, limit],
    queryFn: () => getUserList(page, limit),
    enabled: true,
  });
};
export const useGetUserRoleList = () => {
  return useQuery({
    queryKey: ['roleList'],
    queryFn: async () => {
      return await getUserRoleList()
    },
    enabled:true
  })
}
export const useGetuserProfileDetails = () => {
  return useQuery({
    queryKey: ['getUserDetails'],
    queryFn: async () => {
      return await getUserProfileDetails()
    },
    enabled:true
  })
}
export const useCreateAdmin=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:(payload:CreateAdminProps)=>createAdmin(payload),
    onSuccess:()=>{
      void queryClient.invalidateQueries({queryKey:['']})
    }
  })
}
export const useGetUserProfileDetailsById=(id?:string)=>{
  return useQuery({
    queryKey: ['getUserDetailByid'],
    queryFn: async () => {
      return await getUserProfileDetailsById(id)
    },
    enabled:!!id
  })
}
export const useUpdateAdmin=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:(payload:UpdateAdminProps)=>updateAdmin(payload),
    onSuccess:()=>{
      void queryClient.invalidateQueries({queryKey:['']})
    }
  })
}
 