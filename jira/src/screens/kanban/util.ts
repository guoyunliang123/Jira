import {useLocation} from "react-router";
import {useProject} from "../../utils/project";

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

export const useTaskSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useTasksQueryKey = () => ["tasks", useTaskSearchParams()]
