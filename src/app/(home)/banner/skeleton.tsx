// components
import { Skeleton } from '@/components/atoms/skeleton';

//types
import type { FC } from 'react';

export const HeroBannerSkeleton: FC = () => {
	return (
		<div className='relative w-full h-[70vh]'>
			<Skeleton className='w-full h-full rounded-none' />

			<div className='absolute bottom-0 w-full p-8 flex justify-between items-end'>
				<div className='max-w-2xl space-y-4'>
					<Skeleton className='h-10 w-[60%]' />
					<div className='space-y-2'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-[90%]' />
						<Skeleton className='h-4 w-[80%]' />
					</div>
				</div>

				<div className='flex flex-col items-end gap-4'>
					<Skeleton className='w-8 h-8 rounded-full' />
					<Skeleton className='w-16 h-16 rounded-full' />
				</div>
			</div>
		</div>
	);
};
