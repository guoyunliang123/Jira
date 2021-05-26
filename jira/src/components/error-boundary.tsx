import React from 'react';

// 实现一个自定义错误边界(只能使用 class 组件来实现)
type FallbackRender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
  state = {error: null}

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    const {error} = this.state;
    const {fallbackRender, children} = this.props;
    if (error) {
      return fallbackRender({error})
    }
    return children
  }
}