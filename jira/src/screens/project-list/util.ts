import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";
import {useProject} from "../../utils/project";

//  项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
    setParam
  ] as const
}

export const useProjectModal = () => {
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])
  const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])
  const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

  const open = () => setProjectCreate({projectCreate: true})
  const close = () => projectCreate
    ? setProjectCreate({projectCreate: undefined})
    : setEditingProjectId({editingProjectId: undefined});
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

  // 超过三个返回值的时候使用对象
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }

  // 返回个数少于三个的时候可返回数组
  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const
  // 用法：const [a, b, c] = useProjectModal 可随意命名
}