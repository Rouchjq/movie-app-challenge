'use client';

// main tools
import Image from 'next/image';

// components
import { Typography } from '@/components/atoms/typography';
import { Heart, Star } from 'lucide-react';

// utils
import { cn } from '@/lib/utils';

// lib
import { getImageUrl } from '@/lib/api/tmdb';

// types
import type { MovieType } from '@/types/models/movie';
import type { FC } from 'react';

type HeroMovieProps = {
	movie: MovieType;
};

export const HeroMovie: FC<HeroMovieProps> = ({ movie }) => {
	const backdropUrl = getImageUrl(movie.backdrop_path, 'backdrop', 'original');

	return (
		<div className='relative w-full h-[70vh]'>
			<div className='relative w-full h-full'>
				<Image
					fill
					priority
					alt={movie.title}
					src={backdropUrl!}
					className={cn('object-cover transition-opacity duration-500')}
				/>

				<div className='absolute bottom-0 w-full p-8 flex justify-between items-end'>
					<div className='max-w-2xl'>
						<Typography as='h2' variant='h1' weight='bold' className='mb-4'>
							{movie.title}
						</Typography>
						<Typography className='text-white/80 line-clamp-3'>
							{movie.overview}
						</Typography>
					</div>

					<div className='flex items-center gap-4'>
						<Heart
							size={30}
							className='bg-transparent hover:bg-transparent rounded-full hover:scale-110 transition-transform'
						/>

						<div className='bg-black/50 rounded-full px-2 py-1'>
							<div className='flex items-center space-x-1'>
								<Star className='w-6 h-6 text-yellow-400' />
								<div>
									<Typography as='span' size='lg'>
										{movie.vote_average.toFixed(1)}
									</Typography>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
