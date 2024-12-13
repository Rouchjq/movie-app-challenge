'use client';
import * as React from 'react';
import {
	CarouselItem,
	CarouselNext,
	CarouselContent,
	CarouselPrevious,
	Carousel as CarouselPrimitive,
} from '@/components/atoms/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

interface CarouselProps<T> {
	items: T[];
	autoPlay?: boolean;
	className?: string;
	showControls?: boolean;
	classNameItem?: string;
	classNameContent?: string;
	renderItem: (item: T) => React.ReactNode;
	options?: {
		align?: 'start' | 'center' | 'end';
		loop?: boolean;
	};
}

export const Carousel = <T,>({
	items,
	className,
	renderItem,
	classNameItem,
	classNameContent,
	autoPlay = false,
	showControls = true,
	options = {
		loop: true,
		align: 'center',
	},
}: CarouselProps<T>) => {
	return (
		<CarouselPrimitive
			opts={options}
			plugins={autoPlay ? [Autoplay({ delay: 5000 })] : []}
			className={cn('relative w-full ', className)}
		>
			<CarouselContent className={cn(classNameContent)}>
				{items.map((item, index) => (
					<CarouselItem className={cn(classNameItem)} key={index}>
						{renderItem(item)}
					</CarouselItem>
				))}
			</CarouselContent>
			{showControls && (
				<>
					<CarouselPrevious />
					<CarouselNext />
				</>
			)}
		</CarouselPrimitive>
	);
};
