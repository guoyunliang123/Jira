import {useCallback, useState} from "react";

export const UseUndo = <T>(initialPresent: T) => {
  // 用来存储上一步的历史值
  // const [past, setPast] = useState<T[]>([])
  // const [present, setPresent] = useState(initialPresent)
  // // 用来存储下一步的历史值
  // const [future, setFuture] = useState<T[]>([])

  const [state, setState] = useState<{
    past: T[],
    present: T,
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: []
  })

  // 返回上一步
  const canUndo = state.past.length !== 0
  //返回下一步
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    setState(currentState => {
      const {past, present, future} = currentState
      if(past.length === 0) {
        return currentState
      }

      // 上一步中最头上的，也就是距离这次操作最近的一次
      const previous = past[past.length - 1]
      // 存储一共有多少步, 是不包含最后一步操作
      const newPast = past.slice(0, past.length - 1)

      return {
        past: newPast,
        present: previous,
        future: [present]
      }
    })
  }, []);

  const redo = useCallback(() => {
    setState(currentState => {
      const {past, present, future} = currentState
      if(future.length === 0) {
        return currentState
      }

      const next = future[0]
      const newFuture = future.slice(1)

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    })
  }, []);

  const set = useCallback((newPresent: T) => {
    setState(currentState => {
      const {past, present, future} = currentState
      // 如果传入的新的 newPresent 和现在的 present 是一样的就不操作
      if(newPresent === present) {
        return currentState
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: [] // 如果直接 set 的话，就不存在 redo 这个操作了
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    })
  }, []);

  return [
    state,
    {set, reset, undo, redo, canUndo, canRedo}
  ] as const;
}