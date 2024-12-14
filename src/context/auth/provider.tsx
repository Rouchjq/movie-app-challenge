'use client';

// main tools
import { useEffect, useState } from 'react';
import { AuthContext } from './context';
import { toast } from 'sonner';

// types
import { UserType } from '@/types/models/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserType | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const loginUser = async (email: string, password: string) => {
		try {
			const mockUser = {
				id: '1',
				email,
				password,
				name: email.split('@')[0],
			};

			setUser(mockUser);
			setIsAuthenticated(true);
			localStorage.setItem('user', JSON.stringify(mockUser));
			return true;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
				toast.error('Error logging in');
			} else console.log('unknown error');

			return false;
		}
	};

	const logoutUser = () => {
		setUser(null);
		setIsAuthenticated(false);
		localStorage.removeItem('user');
	};

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			setUser(parsedUser);
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, loginUser, logoutUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
