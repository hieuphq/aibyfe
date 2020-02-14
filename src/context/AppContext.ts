import { useState } from 'react';
import createUseContext from 'constate';
import { AppRootState, AuthState } from 'types/app.d';

function loadAppStateFromLocal(): Partial<AppRootState> {
  return {
    auth: {
      isLogin: !!localStorage.getItem('token'),
      token: localStorage.getItem('token')
    },
    projectId: localStorage.getItem('projectId')
  };
}

function useAppState() {
  let initialAppState: Partial<AppRootState> = loadAppStateFromLocal();

  const [appState, setAppState] = useState(initialAppState);
  const setAuthState = (token: string) => {
    setAppState({ auth: { isLogin: !!token } });
    localStorage.setItem('token', token);
  };
  const isLogin = (): boolean | undefined => {
    return appState.auth?.isLogin;
  };
  const getProjectId = (): string | undefined | null => {
    return appState.projectId;
  };

  return { appState, isLogin, getProjectId, setAppState, setAuthState };
}

export const useAppContext = createUseContext(useAppState);
