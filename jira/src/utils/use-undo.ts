import {useCallback, useReducer, useState} from "react";

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
  past: T[];
  present: T;
  future: T[];
}

type Action<T> = { newPresent?: T, type: typeof UNDO | typeof REDO | typeof SET | typeof RESET }

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const {past, present, future} = state;
  const {newPresent, type} = action;
  switch (action.type) {
    case UNDO: {
      if (past.length === 0) {
        return state
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
    }

    case REDO: {
      if (future.length === 0) {
        return state
      }

      const next = future[0]
      const newFuture = future.slice(1)

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    }

    case SET: {
      // 如果传入的新的 newPresent 和现在的 present 是一样的就不操作
      if (newPresent === present) {
        return state
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: [] // 如果直接 set 的话，就不存在 redo 这个操作了
      }
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    }
  }
  return state
}


export const useUndo = <T>(initialPresent: T) => {
  // 用来存储上一步的历史值
  // const [past, setPast] = useState<T[]>([])
  // const [present, setPresent] = useState(initialPresent)
  // // 用来存储下一步的历史值
  // const [future, setFuture] = useState<T[]>([])

  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  } as State<T>)

  // const [state, setState] = useState<{
  //   past: T[],
  //   present: T,
  //   future: T[]
  // }>({
  //   past: [],
  //   present: initialPresent,
  //   future: []
  // })

  // 返回上一步
  const canUndo = state.past.length !== 0
  //返回下一步
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => dispatch({type: UNDO}), []);

  const redo = useCallback(() => dispatch({type: REDO}), []);

  const set = useCallback((newPresent: T) => dispatch({type: SET, newPresent}), [])

  const reset = useCallback((newPresent: T) => dispatch({type: RESET, newPresent}), []);

  return [
    state,
    {set, reset, undo, redo, canUndo, canRedo}
  ] as const;
}