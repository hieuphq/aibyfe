import { useState } from 'react';
import createUseContext from 'constate';
import { AppRootState, AuthState } from 'types/app.d';

const TokenKey = 'token';
const ProjectIdKey = 'projectId';
function loadAppStateFromLocal(): Partial<AppRootState> {
  return {
    auth: {
      isLogin: !!localStorage.getItem(TokenKey),
      token: localStorage.getItem(TokenKey)
    },
    projectId: localStorage.getItem(ProjectIdKey)
  };
}

function useAppState() {
  let initialAppState: Partial<AppRootState> = loadAppStateFromLocal();

  const [appState, setAppState] = useState(initialAppState);
  const setAuthState = (token: string) => {
    setAppState({ auth: { isLogin: !!token } });
    localStorage.setItem(TokenKey, token);
  };
  const isLogin = (): boolean | undefined => {
    return appState.auth?.isLogin;
  };
  const getProjectId = (): string | undefined | null => {
    return appState.projectId;
  };
  const setProjectId = (projectId: string) => {
    setAppState({ ...appState, projectId });
    localStorage.setItem(ProjectIdKey, projectId);
  };
  const getToken = (): string => {
    return appState.auth?.token || '';
  };

  return {
    appState,
    isLogin,
    getProjectId,
    setAppState,
    setAuthState,
    getToken,
    setProjectId
  };
}

export const useAppContext = createUseContext(useAppState);
