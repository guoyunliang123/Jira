import {useAsync} from "./use-async";
import {Project} from "../screens/project-list/list"
import {useCallback, useEffect} from "react";
import {cleanObject} from "./index";
import {useHttp} from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const {run, ...result} = useAsync<Project[]>()

  const fetchProjects = useCallback(
    () => client('projects', {data: cleanObject(param || {})}), [param, client]
  );

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
  },[param, run, fetchProjects])

  return result
}

// 编辑项目列表
export const useEditProject = () => {
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}

// 新建项目
export const useAddProject = () => {
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}