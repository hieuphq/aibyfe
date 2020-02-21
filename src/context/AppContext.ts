import { useState } from 'react';
import constate from 'constate';
import { AppRootState } from '@types';

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
  const isLogin = (): boolean => {
    return appState.auth?.isLogin || false;
  };
  const getProjectId = (): string => {
    return appState.projectId || '';
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

export const [AppProvider, useAppContext] = constate(useAppState);
