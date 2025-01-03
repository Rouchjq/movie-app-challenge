// components/ui/col/col.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const colVariants = cva('flex flex-col', {
	variants: {
		xs: {
			1: 'w-1/12',
			2: 'w-2/12',
			3: 'w-3/12',
			4: 'w-4/12',
			5: 'w-5/12',
			6: 'w-6/12',
			7: 'w-7/12',
			8: 'w-8/12',
			9: 'w-9/12',
			12: 'w-full',
			10: 'w-10/12',
			11: 'w-11/12',
			auto: 'w-auto',
		},
		sm: {
			1: 'sm:w-1/12',
			2: 'sm:w-2/12',
			3: 'sm:w-3/12',
			4: 'sm:w-4/12',
			5: 'sm:w-5/12',
			6: 'sm:w-6/12',
			7: 'sm:w-7/12',
			8: 'sm:w-8/12',
			9: 'sm:w-9/12',
			12: 'sm:w-full',
			10: 'sm:w-10/12',
			11: 'sm:w-11/12',
			auto: 'sm:w-auto',
		},
		md: {
			1: 'md:w-1/12',
			2: 'md:w-2/12',
			3: 'md:w-3/12',
			4: 'md:w-4/12',
			5: 'md:w-5/12',
			6: 'md:w-6/12',
			7: 'md:w-7/12',
			8: 'md:w-8/12',
			9: 'md:w-9/12',
			12: 'md:w-full',
			10: 'md:w-10/12',
			11: 'md:w-11/12',
			auto: 'md:w-auto',
		},
		lg: {
			1: 'lg:w-1/12',
			2: 'lg:w-2/12',
			3: 'lg:w-3/12',
			4: 'lg:w-4/12',
			5: 'lg:w-5/12',
			6: 'lg:w-6/12',
			7: 'lg:w-7/12',
			8: 'lg:w-8/12',
			9: 'lg:w-9/12',
			10: 'lg:w-10/12',
			11: 'lg:w-11/12',
			12: 'lg:w-full',
			auto: 'lg:w-auto',
		},
		xl: {
			1: 'xl:w-1/12',
			2: 'xl:w-2/12',
			3: 'xl:w-3/12',
			4: 'xl:w-4/12',
			5: 'xl:w-5/12',
			6: 'xl:w-6/12',
			7: 'xl:w-7/12',
			8: 'xl:w-8/12',
			9: 'xl:w-9/12',
			10: 'xl:w-10/12',
			11: 'xl:w-11/12',
			12: 'xl:w-full',
			auto: 'xl:w-auto',
		},
		'2xl': {
			1: '2xl:w-1/12',
			2: '2xl:w-2/12',
			3: '2xl:w-3/12',
			4: '2xl:w-4/12',
			5: '2xl:w-5/12',
			6: '2xl:w-6/12',
			7: '2xl:w-7/12',
			8: '2xl:w-8/12',
			9: '2xl:w-9/12',
			10: '2xl:w-10/12',
			11: '2xl:w-11/12',
			12: '2xl:w-full',
			auto: '2xl:w-auto',
		},
	},
	defaultVariants: {
		xs: 12,
	},
});

interface ColProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof colVariants> {
	asChild?: boolean;
}

const Col = React.forwardRef<HTMLDivElement, ColProps>(
	({ className, xs, sm, md, lg, xl, '2xl': _2xl, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					colVariants({
						xs,
						sm,
						md,
						lg,
						xl,
						'2xl': _2xl,
						className,
					}),
				)}
				{...props}
			/>
		);
	},
);
Col.displayName = 'Col';

export { Col, colVariants, type ColProps };
