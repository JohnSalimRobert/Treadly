import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

export type User = {
  username: string;
  email: string;
  profilePic?: string;
  bio?: string;
  // Extend this with your API user schema
};

interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    devtools((set) => ({
      user: null,
      token: null,
      login: (token, user) => {
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
      isAuthenticated: false,
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
