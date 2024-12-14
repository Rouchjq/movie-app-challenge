// main tools
import { createContext } from 'react';

// types
import { UserType } from '@/types/models/auth';

interface AuthContextType {
	user: UserType | null;
	logoutUser: () => void;
	isAuthenticated: boolean;
	loginUser: (email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
