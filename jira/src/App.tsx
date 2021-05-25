import React from 'react';
import './App.css';
import {useAuth} from "./context/auth-context";
import {AuthenticatedApp} from "./authenticated-app";
import {UnauthenticatedApp} from "./unauthenticated-app";
import {ErrorBoundary} from "./components/error-boundary";
import {FullPageErrorFallback} from "./components/lib";

// import { TsReactTest } from "usetest/try-use-array"
// import { ProjectListScreen } from "screens/project-list"

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
      </ErrorBoundary>
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
    </div>
  );
}

export default App;
