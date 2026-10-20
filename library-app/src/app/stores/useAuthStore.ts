import { create } from "zustand";


interface UseAuthStore {
    name: string;
    role: string;
    setAuth: (name: string, role: string) => void;
}

export const useAuthStore = create<UseAuthStore>((set) => ({
    name: '',
    role: '',
    setAuth: (name, role) => set(() => ({name, role}))
}))