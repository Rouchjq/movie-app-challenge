export type MovieType = {
	id: number;
	title: string;
	video: boolean;
	adult: boolean;
	overview: string;
	vote_count: number;
	popularity: number;
	genre_ids: number[];
	release_date: string;
	vote_average: number;
	original_title: string;
	original_language: string;
	poster_path: string | null;
	backdrop_path: string | null;
};
