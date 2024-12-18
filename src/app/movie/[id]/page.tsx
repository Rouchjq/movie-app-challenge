// main tools
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// components
import { MovieDetailSkeleton } from './movie-skeleton';
import { MovieHero } from './movie-hero';
import { MovieInfo } from './movie-info';
import { MovieStats } from './movie-stats';

// libs
import { getMovieById } from '@/lib/api/movies';

// types
import type { Metadata } from 'next';

type MovieDetailPageProps = {
	params: {
		id: string;
	};
};

export default async function MovieDetailPage({
	params,
}: MovieDetailPageProps) {
	try {
		const id = await params.id;
		const movie = await getMovieById(id);
		console.log('🚀 ~ movie:', movie);

		if (!movie) {
			notFound();
		}

		return (
			<main className='min-h-screen bg-black text-white'>
				<Suspense fallback={<MovieDetailSkeleton />}>
					<MovieHero movie={movie} />
					<MovieInfo movie={movie} />
					<MovieStats movie={movie} />
				</Suspense>
			</main>
		);
	} catch (error) {
		console.log('error in movie detail page', error);
		notFound();
	}
}

export async function generateMetadata({
	params,
}: MovieDetailPageProps): Promise<Metadata> {
	try {
		const id = await params.id;
		const movie = await getMovieById(id);

		return {
			title: `${movie.title} | Movie Details`,
			description: movie.overview,
		};
	} catch (error) {
		console.log('error in movie detail page', error);
		return {
			title: 'Movie Not Found',
			description: 'The requested movie could not be found',
		};
	}
}
