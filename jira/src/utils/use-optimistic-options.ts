import {QueryKey, useQueryClient} from "react-query";
import {Project} from "../types/project";

/**
 * 用来生成乐观更新的功能
 * 参数：
 * queryKey: 用来获取数据时的参数
 * callback: 在增，删，改的时候，唯一不同的是在本地暂时把缓存里的数据处理一下，处理本地缓存数据的操作不同
 * @param queryKey
 * @param callback
 */
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 乐观更新 优先修改本地缓存数据
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      return {previousItems}
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.filter(item => item.id !== target.id) || [])
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.map(item => item.id === target.id ? {...item, ...target} : item) || [])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old ? [...old, target] : [])