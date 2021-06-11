import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import {cleanObject} from "./index";

/***
 * 返回页面 url 中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam, setSearchParam] = useSearchParams()
  return [
    useMemo(
      () => keys.reduce((prev, key) => {
        return {...prev, [key]: searchParam.get(key) || ''}
      }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParam]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({...Object.fromEntries(searchParam), ...params}) as URLSearchParamsInit
      return setSearchParam(o)
    }
  ] as const
}