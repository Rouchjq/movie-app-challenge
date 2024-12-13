// utils
import { cn } from '@/lib/utils';

// types
import type { FC } from 'react';

type VideoPlayerProps = {
	videoUrl: string;
	isPlaying: boolean;
};

export const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl, isPlaying }) => {
	return (
		<div
			className={cn(
				'absolute inset-0 bg-black transition-opacity duration-500',
				isPlaying ? 'opacity-100' : 'opacity-0',
			)}
		>
			<iframe
				allowFullScreen
				className='w-full h-full'
				src={`${videoUrl}?autoplay=${isPlaying ? 1 : 0}&mute=1`}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			/>
		</div>
	);
};
