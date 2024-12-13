import type { FC } from 'react';

type RaitingCircleProps = {
	vote_average: number;
};

export const RaitingCircle: FC<RaitingCircleProps> = ({ vote_average }) => {
	return (
		<div className='relative w-16 h-16'>
			<svg className='w-full h-full' viewBox='0 0 36 36'>
				<path
					d='M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831'
					fill='none'
					stroke='#444'
					strokeWidth='3'
				/>
				<path
					d='M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831'
					fill='none'
					stroke='#4CAF50'
					strokeWidth='3'
					strokeDasharray={`${vote_average * 10}, 100`}
				/>
				<text
					x='18'
					y='20.35'
					textAnchor='middle'
					className='!text-white text-[10px] font-bold'
				>
					{Math.round(vote_average * 10)}%
				</text>
			</svg>
		</div>
	);
};
