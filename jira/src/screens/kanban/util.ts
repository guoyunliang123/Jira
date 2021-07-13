import {useLocation} from "react-router";
import {useProject} from "../../utils/project";
import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";

// 从 url 获取项目 id
export const useProjectIdInUrl = () => {
  const {pathname} = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

// 获取项目名称
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()]

export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name
    }),
    [param, projectId])
}

export const useTasksQueryKey = () => ["tasks", useTaskSearchParams()]
