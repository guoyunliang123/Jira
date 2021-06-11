import './wdyr' // 一定要放在第一句引入
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadServer, DevTools} from 'jira-dev-tool';
// 一定要放在 loadDevTools 后面引入，因为 jira-dev-tool 中也使用了 antd
import 'antd/dist/antd.less';
import { AppProviders } from 'context';

loadServer(() => ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
