import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  user: any | null;
  token: string | null;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: Cookies.get('token') || null,
  setAuth: (user, token) => {
    Cookies.set('token', token, { expires: 1 }); 
    set({ user, token });
  },
  logout: () => {
    Cookies.remove('token');
    set({ user: null, token: null });
    window.location.href = '/login';
  },
}));
