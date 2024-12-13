'use client';

// components
import { HeroMovie } from './hero-movie';
import { Carousel } from '@/components/molecules/carousel';

//types
import type { MovieType } from '@/types/models/movie';
import type { FC } from 'react';

type HeroBannerProps = {
	movies: MovieType[];
};

export const HeroBanner: FC<HeroBannerProps> = ({
	movies,
}: HeroBannerProps) => {
	return (
		<Carousel<MovieType>
			autoPlay
			items={movies}
			showControls={false}
			renderItem={(movie) => <HeroMovie movie={movie} />}
			options={{
				loop: true,
				align: 'center',
			}}
		/>
	);
};
