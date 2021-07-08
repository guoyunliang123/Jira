import {Project} from "../screens/project-list/list"
import {useHttp} from "./http";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useProjectsSearchParams} from "../screens/project-list/util";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[]>(['projects', param], () => client('projects', {data: param}))
}

// 编辑项目列表
export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  const [searchParams] = useProjectsSearchParams()
  const queryKey = ['projects', searchParams]

  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    method: 'PATCH',
    data: params
  }), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 乐观更新 优先修改本地缓存数据
    async onMutate(target) {
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: Project[]) => {
        return old?.map(project => project.id === target.id ? {...project, ...target} : project) || []
      })
      return {previousItems}
    },
    onError(error, newItem, context) {
      queryClient.setQueryData(queryKey, (context as {previousItems: Project[]}).previousItems)
    }
  })
}

// 新建项目
export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params: Partial<Project>) => client(`projects`, {
    data: params,
    method: 'POST',
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
}

// 获取项目详情 希望 id 为 undefined 的时候不在请求
export const useProject = (id?: number) => {
  const client = useHttp()

  return useQuery<Project>(
    ['project', {id}],
    () => client(`project/${id}`),
    {
      enabled: Boolean(id) // 或者 !!id 只有当这个 id 有值的时候 才会触发这个 useProject
    }
  )
}