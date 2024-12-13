import { BACKDROP_SIZES_ENUMS, POSTER_SIZES_ENUMS } from '@/common/enums';
import { MovieType } from './movie';

export interface TMDBImageConfigurationType {
	base_url: string;
	logo_sizes: string[];
	still_sizes: string[];
	poster_sizes: string[];
	secure_base_url: string;
	profile_sizes: string[];
	backdrop_sizes: string[];
}

export type BackdropSizeType =
	(typeof BACKDROP_SIZES_ENUMS)[keyof typeof BACKDROP_SIZES_ENUMS];

export type PosterSizeType =
	(typeof POSTER_SIZES_ENUMS)[keyof typeof POSTER_SIZES_ENUMS];

export type ResponseType = {
	page: number;
	total_pages: number;
	results: MovieType[];
	total_results: number;
};
