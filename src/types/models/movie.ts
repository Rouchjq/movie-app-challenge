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

export type MovieDetailsType = MovieType & {
	status: string;
	tagline: string;
	budget: number;
	revenue: number;
	runtime: number;
	homepage: string;
	imdb_id: string;
	origin_country: string[];
	belongs_to_collection: null;
	genres: {
		id: number;
		name: string;
	}[];
	spoken_languages: {
		name: string;
		iso_639_1: string;
		english_name: string;
	}[];
	production_countries: {
		name: string;
		iso_3166_1: string;
	}[];
	production_companies: {
		id: number;
		name: string;
		logo_path: string | null;
		origin_country: string;
	}[];
};
