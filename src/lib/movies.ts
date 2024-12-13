import { MovieType } from '@/types/models/movie';

export const getRandomMovies = (movies: MovieType[], count: number) => {
	const shuffled = [...movies].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};
