'use client';
// main tools
import Image from 'next/image';
import dayjs from 'dayjs';

// lib
import { getImageUrl } from '@/lib/api/tmdb';
import { cn } from '@/lib/utils';

// icons
import { Heart, Star, Calendar } from 'lucide-react';

// types
import type { MovieType } from '@/types/models/movie';
import type { FC } from 'react';
import { Button } from '@/components/atoms/button';
import { Typography } from '@/components/atoms/typography';

type MovieCardProps = {
	movie: MovieType;
};

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
	return (
		<div className='relative group w-[280px]'>
			<div className='relative overflow-hidden rounded-lg bg-gray-800'>
				<div className='relative aspect-[2/3] transition-transform duration-300 group-hover:scale-105'>
					<Image
						fill
						alt={movie.title}
						className='object-cover'
						src={getImageUrl(movie.poster_path, 'poster', 'w500')!}
					/>
				</div>

				<div
					className={cn(
						'absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent',
						'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
					)}
				>
					<div className='absolute bottom-0 p-4 w-full'>
						<div className='flex items-center justify-between mb-2'>
							<div className='flex items-center space-x-1'>
								<Star className='w-4 h-4 text-yellow-400' />
								<span className='text-sm text-white'>
									{movie.vote_average.toFixed(1)}
								</span>
							</div>
							<div className='flex items-center space-x-1'>
								<Calendar className='w-4 h-4 text-gray-400' />
								<span className='text-sm text-gray-400'>
									{dayjs(movie.release_date).format('yyyy')}
								</span>
							</div>
						</div>

						<Typography variant='h3' weight='semibold' className='leading-tight mb-2'>
							{movie.title}
						</Typography>

						<p className='text-sm text-gray-300 line-clamp-2'>{movie.overview}</p>
					</div>
				</div>

				<Button
					size='icon'
					// onClick={() => onAddToFavorites?.(movie)}
					className={cn(
						'absolute top-3 right-3 p-0 rounded-full',
						'transform transition-all duration-300',
						'bg-black/50 hover:bg-black/70',
						'opacity-0 group-hover:opacity-100',
						'hover:scale-110',
					)}
				>
					<Heart className='w-5 h-5 text-white' />
				</Button>

				<div className='absolute top-3 left-3 bg-black/50 rounded-full px-2 py-1'>
					<div className='flex items-center space-x-1'>
						<Star className='w-4 h-4 text-yellow-400' />
						<span className='text-sm font-medium text-white'>
							{movie.vote_average.toFixed(1)}
						</span>
					</div>
				</div>
			</div>

			<Typography variant='h3' weight='medium' className='mt-2 px-1 line-clamp-1'>
				{movie.title}
			</Typography>
		</div>
	);
};
