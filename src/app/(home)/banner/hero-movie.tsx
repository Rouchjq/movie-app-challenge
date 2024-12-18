'use client';

// main tools
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import { Typography } from '@/components/atoms/typography';
import { Button } from '@/components/atoms/button';
import { Heart, Star } from 'lucide-react';

// hooks
import { useFavorites } from '@/hooks/use-favorites';

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
	const { push } = useRouter();
	const { isFavorite, toggleMovieFavorite } = useFavorites();
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

				<div className='absolute bottom-0 w-full p-8 flex justify-between items-end mt-5 bg-gradient-to-t from-black/80 via-black/60 to-transparent'>
					<div className='max-w-2xl'>
						<Typography
							as='h2'
							variant='h1'
							weight='bold'
							className='mb-4 text-white'
						>
							{movie.title}
						</Typography>
						<Typography className='text-white/80 line-clamp-3'>
							{movie.overview}
						</Typography>
					</div>

					<div className='flex items-center gap-4'>
						<div role='button' onClick={() => toggleMovieFavorite(movie.id)}>
							<Heart
								size={30}
								color='white'
								fill={isFavorite(movie.id) ? 'white' : 'transparent'}
								className='rounded-full hover:scale-110 transition-transform'
							/>
						</div>

						<div>
							<Button
								size='sm'
								onClick={() => push(`/movie/${movie.id}`)}
								className={cn(
									' rounded-full transform transition-all duration-300',
									'bg-black/50 hover:bg-black/70',
									'hover:scale-110 text-white font-semibold',
								)}
							>
								More Details
							</Button>
						</div>

						<div className='bg-black/50 rounded-full px-2 py-1'>
							<div className='flex items-center space-x-1'>
								<Star className='w-6 h-6 text-yellow-400' />
								<div>
									<Typography as='span' size='lg' className='text-white'>
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
