// components
import { MovieCardSkeleton } from '@/components/molecules/movie-card/skeleton';
import { Skeleton } from '@/components/atoms/skeleton';

// types
import type { FC } from 'react';

export const MovieSectionSkeleton: FC = () => {
	return (
		<section className='py-8'>
			<Skeleton className='w-48 h-8 mb-6' />

			<div className='flex gap-4'>
				{[...Array(5)].map((_, index) => (
					<MovieCardSkeleton key={index} />
				))}
			</div>
		</section>
	);
};
