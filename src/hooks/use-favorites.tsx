import { FavoritesContext } from '@/context/favorite-movie/context';
import { useContext } from 'react';

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (context === undefined) {
		throw new Error('useFavorites must be used within a FavoritesProvider');
	}
	return context;
};
