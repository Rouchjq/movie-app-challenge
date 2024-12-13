import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva('m-0 p-0', {
	variants: {
		variant: {
			large: 'text-lg font-semibold',
			button: 'text-sm font-medium',
			lead: 'text-xl text-muted-foreground',
			muted: 'text-sm text-muted-foreground',
			p: 'leading-7 [&:not(:first-child)]:mt-6',
			small: 'text-sm font-medium leading-none',
			h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
			h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
			h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
			h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
			h6: 'scroll-m-20 text-base font-semibold tracking-tight',
			h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
			label:
				'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		},
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			lg: 'text-lg',
			xl: 'text-xl',
			base: 'text-base',
			'2xl': 'text-2xl',
			'3xl': 'text-3xl',
			'4xl': 'text-4xl',
		},
		weight: {
			bold: 'font-bold',
			light: 'font-light',
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			extrabold: 'font-extrabold',
		},
		textColor: {
			accent: 'text-accent',
			primary: 'text-primary',
			default: 'text-foreground',
			secondary: 'text-secondary',
			card: 'text-card-foreground',
			muted: 'text-muted-foreground',
			destructive: 'text-destructive',
			popover: 'text-popover-foreground',
			'accent-foreground': 'text-accent-foreground',
			'primary-foreground': 'text-primary-foreground',
			'secondary-foreground': 'text-secondary-foreground',
			'destructive-foreground': 'text-destructive-foreground',
		},
		align: {
			left: 'text-left',
			right: 'text-right',
			center: 'text-center',
			justify: 'text-justify',
		},
	},
	defaultVariants: {
		variant: 'p',
		size: 'base',
		align: 'left',
		weight: 'normal',
		textColor: 'default',
	},
});

type ValidElement =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'div'
	| 'label'
	| 'span'
	| 'a';

type BaseProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'>;

interface TypographyProps
	extends BaseProps,
		VariantProps<typeof typographyVariants> {
	href?: string;
	htmlFor?: string;
	as?: ValidElement;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	(
		{
			as,
			size,
			align,
			weight,
			variant,
			textColor,
			className,
			children,
			...props
		},
		ref,
	) => {
		const Tag = as || (variant as ValidElement) || 'p';

		return React.createElement(
			Tag,
			{
				ref,
				className: cn(
					typographyVariants({
						size,
						align,
						weight,
						variant,
						textColor,
						className,
					}),
				),
				...props,
			},
			children,
		);
	},
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants, type TypographyProps };
