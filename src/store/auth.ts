import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface IAuthToken {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setToken: (tokens: Partial<Pick<IAuthToken, 'accessToken' | 'refreshToken'>>) => void;
  clear: () => void;
}

export const useAuthToken = create<IAuthToken>()(
  devtools(
    persist(
      (set) => {
        return {
          accessToken: undefined,
          refreshToken: undefined,
          setAccessToken: (accessToken) => set({ accessToken }),
          setRefreshToken: (refreshToken) => set({ refreshToken }),
          setToken: (tokens) => set(tokens),
          clear: () => set({ accessToken: undefined, refreshToken: undefined }),
        };
      },
      {
        name: `${import.meta.env.VITE_MODE}::auth-token`,
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export interface IAuthUser {
  id: string | undefined;
  name: string | undefined;
  setUser: (data: Partial<Pick<IAuthUser, 'id' | 'name'>>) => void;
}

export const useAuthUser = create<IAuthUser>()(
  devtools((set) => ({
    id: undefined,
    name: undefined,
    setUser: (data) => set(data),
  }))
);
