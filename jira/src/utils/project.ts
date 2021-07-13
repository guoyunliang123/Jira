import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {useAddConfig, useDeleteConfig, useEditConfig} from "./use-optimistic-options";
import {Project} from "../types/project";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[]>(['projects', param], () => client('projects', {data: param}))
}

// 编辑项目列表
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, {
      method: 'PATCH',
      data: params
    }),
    useEditConfig(queryKey)
  )
}

// 新建项目
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) => client(`projects`, {
      data: params,
      method: 'POST',
    }),
    useAddConfig(queryKey)
  )
}

// 删除项目
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({id}: { id: number }) => client(`projects/${id}`, {
      method: 'DELETE',
    }),
    useDeleteConfig(queryKey)
  )
}

// 获取项目详情 希望 id 为 undefined 的时候不在请求
export const useProject = (id?: number) => {
  const client = useHttp()

  return useQuery<Project>(
    ['projects', {id}],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id) // 或者 !!id 只有当这个 id 有值的时候 才会触发这个 useProject
    }
  )
}