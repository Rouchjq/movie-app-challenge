'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/api/tmdb';
import type { MovieType } from '@/types/models/movie';
import type { FC } from 'react';

interface MovieHeroProps {
	movie: MovieType;
}

export const MovieHero: FC<MovieHeroProps> = ({ movie }) => {
	return (
		<div className='relative h-[600px]  '>
			{movie.backdrop_path && (
				<Image
					fill
					priority
					alt={movie.title}
					className='object-cover opacity-50'
					src={getImageUrl(movie.backdrop_path, 'backdrop', 'original')!}
				/>
			)}
			<div className='absolute inset-0 bg-gradient-to-t from-black to-transparent' />
		</div>
	);
};
