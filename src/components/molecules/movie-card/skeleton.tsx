// component
import { Skeleton } from '@/components/atoms/skeleton';

// types
import type { FC } from 'react';

export const MovieCardSkeleton: FC = () => {
	return (
		<div className='w-[280px]'>
			<Skeleton className='aspect-[2/3] rounded-lg mb-2' />
			<Skeleton className='h-5 w-[80%]' />
		</div>
	);
};
