import { useState } from 'react';
import createUseContext from 'constate';
import { AppRootState, AuthState } from 'types/app.d';

function loadAppStateFromLocal(): Partial<AppRootState> {
  return {
    auth: {
      isLogin: !!localStorage.getItem('token'),
      token: localStorage.getItem('token')
    }
  };
}

function useAppState() {
  let initialAppState: Partial<AppRootState> = loadAppStateFromLocal();

  const [appState, setAppState] = useState(initialAppState);
  const setAuthState = (token: string) => {
    setAppState({ auth: { isLogin: !!token } });
    localStorage.setItem('token', token);
  };

  return { appState, setAppState, setAuthState };
}

export const useAppContext = createUseContext(useAppState);
