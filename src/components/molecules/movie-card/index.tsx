'use client';

// main tools
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';

// components
import { Typography } from '@/components/atoms/typography';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/atoms/button';

// lib
import { getImageUrl } from '@/lib/api/tmdb';
import { cn } from '@/lib/utils';

// icons
import { Heart, Star, Calendar } from 'lucide-react';

// types
import type { MovieType } from '@/types/models/movie';
import type { FC } from 'react';

type MovieCardProps = {
	movie: MovieType;
};

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
	const { push } = useRouter();
	const { isFavorite, toggleMovieFavorite } = useFavorites();

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
							<div>
								<Button
									size='sm'
									onClick={() => push(`/movie/${movie.id}`)}
									className={cn(
										' rounded-full transform transition-all duration-300',
										'bg-black/50 hover:bg-black/70',
										'opacity-0 group-hover:opacity-100',
										'hover:scale-110 text-white font-semibold',
									)}
								>
									More Details
								</Button>
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

						<div>
							<Typography size='sm' className='text-gray-300 line-clamp-2'>
								{movie.overview}
							</Typography>
						</div>
					</div>
				</div>

				<Button
					size='icon'
					onClick={() => toggleMovieFavorite(movie.id)}
					className={cn(
						'absolute top-3 right-3 p-0 rounded-full',
						'transform transition-all duration-300',
						'bg-black/50 hover:bg-black/70',
						'opacity-0 group-hover:opacity-100',
						'hover:scale-110',
					)}
				>
					<Heart
						fill={isFavorite(movie.id) ? 'white' : 'transparent'}
						className='w-5 h-5 text-white'
					/>
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
