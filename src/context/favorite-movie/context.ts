import { createContext } from 'react';

interface FavoritesContextType {
	favorites: number[];
	isFavorite: (movieId: number) => boolean;
	toggleMovieFavorite: (movieId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined,
);
