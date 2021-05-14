import React from 'react';
import './App.css';
import {useAuth} from "./context/auth-context";
import {AuthenticatedApp} from "./authenticated-app";
import {UnauthenticatedApp} from "./unauthenticated-app";

// import { TsReactTest } from "usetest/try-use-array"
// import { ProjectListScreen } from "screens/project-list"

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
    </div>
  );
}

export default App;
