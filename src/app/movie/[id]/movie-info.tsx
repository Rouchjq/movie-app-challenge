'use client';

// main tools
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';

// components
import { Typography } from '@/components/atoms/typography';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/atoms/button';

// icons
import { Heart, PlayCircle, Star } from 'lucide-react';

// utils
import { getImageUrl } from '@/lib/api/tmdb';

// types
import type { MovieDetailsType } from '@/types/models/movie';
import type { FC } from 'react';

interface MovieInfoProps {
	movie: MovieDetailsType;
}

export const MovieInfo: FC<MovieInfoProps> = ({ movie }) => {
	const { push } = useRouter();
	const { isFavorite, toggleMovieFavorite } = useFavorites();

	return (
		<section className='container mx-auto px-4 -mt-32 relative z-10'>
			<div className='flex flex-col md:flex-row gap-8 items-start'>
				<div className=' overflow-hidden top-5 right-5 rounded-lg w-[280px]'>
					<div className='relative aspect-[2/3] '>
						<Image
							fill
							alt={movie.title}
							className='object-cover'
							src={getImageUrl(movie.poster_path, 'poster', 'w500')!}
						/>
					</div>
				</div>
				<div className='flex-1'>
					<div className='mb-4'>
						<Typography as='h1' variant='h1' weight='bold' className='text-white'>
							{movie.title}
						</Typography>
						<Typography as='span' variant='lead' className='text-gray-400 italic'>
							&quot;{movie.tagline}&quot;
						</Typography>
					</div>

					<div className='flex items-center gap-4 mb-6'>
						<div className='flex items-center space-x-1'>
							<Star className='w-8 h-8 text-yellow-400' />
							<span className='text-lg font-medium text-white'>
								{movie.vote_average.toFixed(1)}
							</span>
						</div>

						<div
							role='button'
							onClick={() => toggleMovieFavorite(movie.id)}
							className='cursor-pointer'
						>
							<Heart
								size={30}
								fill={isFavorite(movie.id) ? 'white' : 'transparent'}
								className='hover:scale-110 transition-transform'
							/>
						</div>
					</div>

					<div className='mb-6'>
						<Typography as='span' variant='lead'>
							{movie.overview}
						</Typography>
					</div>

					<div>
						<div>
							<Typography weight='semibold' className=''>
								Release Date
							</Typography>
						</div>
						<div>
							<Typography>
								{dayjs(movie.release_date).format('MMMM D, YYYY')}
							</Typography>
						</div>
					</div>
					<div className='flex flex-col justify-center items- md:flex-row md:justify-start gap-4 mt-8'>
						{movie.video && (
							<div className='w-full md:w-1/3'>
								<Button
									startIcon={<PlayCircle className='w-5 h-5' />}
									size='full'
									className='bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 '
								>
									Play Trailer
								</Button>
							</div>
						)}
						{movie.homepage && (
							<div className='w-full md:w-1/3'>
								<Button
									onClick={() => push(movie.homepage)}
									size='full'
									className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg'
								>
									See now
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
