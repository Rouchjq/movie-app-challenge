import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const rowVariants = cva('flex w-full', {
	variants: {
		wrap: {
			wrap: 'flex-wrap',
			nowrap: 'flex-nowrap',
			reverse: 'flex-wrap-reverse',
		},
		direction: {
			row: 'flex-row',
			col: 'flex-col',
			'row-reverse': 'flex-row-reverse',
			'col-reverse': 'flex-col-reverse',
		},
		justify: {
			end: 'justify-end',
			start: 'justify-start',
			center: 'justify-center',
			around: 'justify-around',
			evenly: 'justify-evenly',
			between: 'justify-between',
		},
		align: {
			end: 'items-end',
			start: 'items-start',
			center: 'items-center',
			stretch: 'items-stretch',
			baseline: 'items-baseline',
		},
		gap: {
			0: 'gap-0',
			1: 'gap-1',
			2: 'gap-2',
			3: 'gap-3',
			4: 'gap-4',
			5: 'gap-5',
			6: 'gap-6',
			8: 'gap-8',
			10: 'gap-10',
		},
		responsive: {
			none: '',
			stack: 'md:flex-row flex-col',
			restack: 'md:flex-col flex-row',
		},
		grow: {
			true: 'grow',
			false: 'grow-0',
		},
	},
	defaultVariants: {
		gap: 0,
		grow: false,
		wrap: 'wrap',
		direction: 'row',
		justify: 'start',
		align: 'stretch',
		responsive: 'none',
	},
});

interface RowProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof rowVariants> {
	children: React.ReactNode;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(
	(
		{
			gap,
			wrap,
			grow,
			align,
			justify,
			children,
			direction,
			className,
			responsive,
			...props
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={cn(
					rowVariants({
						gap,
						wrap,
						grow,
						align,
						justify,
						direction,
						responsive,
						className,
					}),
				)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

Row.displayName = 'Row';

export { Row, rowVariants, type RowProps };
