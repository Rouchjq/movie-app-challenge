'use client';

// main tools
import { useState } from 'react';
import Image from 'next/image';

// components
// import { RaitingCircle } from '@/components/molecules/raiting-circle';
import { Typography } from '@/components/atoms/typography';
import { Heart, Play, Star } from 'lucide-react';

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
	const [isHovered, setIsHovered] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const backdropUrl = getImageUrl(movie.backdrop_path, 'backdrop', 'original');

	return (
		<div
			className='relative w-full h-[70vh]'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false);
				setIsPlaying(false);
			}}
		>
			<div className='relative w-full h-full'>
				<Image
					fill
					priority
					alt={movie.title}
					src={backdropUrl!}
					className={cn(
						'object-cover transition-opacity duration-500',
						isPlaying ? 'opacity-0' : 'opacity-100',
					)}
				/>

				{/* Video Player (si tiene trailer) //TODO DELETE */}

				{movie.video && isHovered && (
					<div
						className={cn(
							'absolute inset-0 transition-opacity duration-500',
							isPlaying ? 'opacity-100' : 'opacity-0',
						)}
					>
						{/* Aquí iría el componente de video o iframe de YouTube */}
					</div>
				)}

				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />

				{/* Play Button */}
				{movie.video && isHovered && !isPlaying && (
					<button
						onClick={() => setIsPlaying(true)}
						className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all'
					>
						<Play className='w-12 h-12 text-white' />
					</button>
				)}

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
