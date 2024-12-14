'use client';

// main tools
import { useEffect, useState } from 'react';
import { FavoritesContext } from './context';

// hooks
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export const FavoritesProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [favorites, setFavorites] = useState<number[]>([]);
	const { isAuthenticated } = useAuth();

	const toggleMovieFavorite = (movieId: number) => {
		if (!isAuthenticated) {
			toast.error('You must be logged in to add favorites');
			return false;
		}

		setFavorites((prevFavorites) => {
			const newFavorites = prevFavorites.includes(movieId)
				? prevFavorites.filter((id) => id !== movieId)
				: [...prevFavorites, movieId];

			localStorage.setItem('favorites', JSON.stringify(newFavorites));
			return newFavorites;
		});

		return true;
	};

	const isFavorite = (movieId: number) => favorites.includes(movieId);

	useEffect(() => {
		if (isAuthenticated) {
			const storedFavorites = localStorage.getItem('favorites');
			if (storedFavorites) {
				setFavorites(JSON.parse(storedFavorites));
			}
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (!isAuthenticated) setFavorites([]);
	}, [isAuthenticated]);

	return (
		<FavoritesContext.Provider
			value={{ favorites, toggleMovieFavorite, isFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	);
};
