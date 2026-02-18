import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activateAdmin, createAdmin, deactivateAdmin, getDashboardCount, superAdminLogin, type CreateAdminProps, type SuperAdminLoginProps } from "../../services/UserApi/UsetApi";

export const useSuperAdminLogin=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:(payload:SuperAdminLoginProps)=>superAdminLogin(payload),
    onSuccess:()=>{
      void queryClient.invalidateQueries({queryKey:['']})
    }
  })
}
export const useDeactivateAdmin=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:(adminId:string)=>deactivateAdmin(adminId),
    onSuccess:()=>{
      void queryClient.invalidateQueries({queryKey:['']})
    }
  })
}
export const useActivateAdmin=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:(adminId:string)=>activateAdmin(adminId),
    onSuccess:()=>{
      void queryClient.invalidateQueries({queryKey:['']})
    }
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
export const useGetDashboardCount = () => {
  return useQuery({
    queryKey: ['dashboardCount'],
    queryFn: async () => {
      return await getDashboardCount()
    },
    enabled:true
  })
}