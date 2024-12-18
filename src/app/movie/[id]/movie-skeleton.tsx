// components
import { Skeleton } from '@/components/atoms/skeleton';

// types
import type { FC } from 'react';

export const MovieDetailSkeleton: FC = () => {
	return (
		<div className='min-h-screen bg-black'>
			{/* Hero Skeleton */}
			<div className='relative h-[600px]'>
				<Skeleton className='w-full h-full' />
			</div>

			{/* Info Skeleton */}
			<section className='container mx-auto px-4 -mt-32 relative z-10'>
				<div className='flex flex-col md:flex-row gap-8'>
					<div className='flex-1'>
						<Skeleton className='h-12 w-3/4 mb-4' />
						<div className='flex items-center gap-4 mb-6'>
							<Skeleton className='w-16 h-16 rounded-full' />
							<Skeleton className='w-8 h-8' />
						</div>
						<div className='space-y-2 mb-6'>
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-5/6' />
							<Skeleton className='h-4 w-4/6' />
						</div>
					</div>
				</div>
			</section>

			{/* Stats Skeleton */}
			<section className='container mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{[...Array(3)].map((_, index) => (
						<Skeleton key={index} className='h-32 rounded-lg' />
					))}
				</div>
			</section>
		</div>
	);
};
