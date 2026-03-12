import { UserType } from '@/app/auth/dto/user';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


interface AuthState {
    user: UserType | null;
    isAuthenticated: boolean;
    setUser: (user: UserType | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage', // ✅ name of the item in the storage
            storage: createJSONStorage(() => localStorage), // ✅ local storage to persist user data
        }
    )
);
