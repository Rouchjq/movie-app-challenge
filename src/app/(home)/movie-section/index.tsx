'use client';

import { Typography } from '@/components/atoms/typography';
import { Carousel } from '@/components/molecules/carousel';
import { MovieCard } from '@/components/molecules/movie-card';
import { MovieType } from '@/types/models/movie';

type MovieSectionProps = {
	title: string;
	movies: MovieType[];
};

export const MovieSection = ({ title, movies }: MovieSectionProps) => {
	return (
		<section className='py-8'>
			<Typography as='h2' variant='h3' weight='bold' className='mb-6'>
				{title}
			</Typography>
			<Carousel<MovieType>
				items={movies}
				className='w-full'
				showControls={false}
				classNameContent='-ml-2 md:-ml-4'
				classNameItem='pl-2 md:pl-4 max-w-max'
				renderItem={(movie) => <MovieCard movie={movie} />}
				options={{
					loop: true,
					align: 'start',
				}}
			/>
		</section>
	);
};
