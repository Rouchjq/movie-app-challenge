import * as React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { Loader2, Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
	'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden active:scale-95',
	{
		variants: {
			variant: {
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				success: 'bg-green-600 text-white hover:bg-green-700',
				link: 'text-primary underline-offset-4 hover:underline',
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
			},
			size: {
				icon: 'h-10 w-10',
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				full: 'h-10 px-4 py-2 w-full',
			},
		},
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	},
);

interface RippleProps {
	x: number;
	y: number;
	size: number;
}

const Ripple: React.FC<RippleProps> = ({ x, y, size }) => {
	return (
		<span
			className='absolute bg-white/30 rounded-full pointer-events-none animate-ripple'
			style={{
				width: size,
				height: size,
				left: x - size / 2,
				top: y - size / 2,
			}}
		/>
	);
};

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	alone?: boolean;
	tooltip?: string;
	asChild?: boolean;
	loading?: boolean;
	success?: boolean;
	processing?: boolean;
	loadingText?: string;
	successText?: string;
	enableRipple?: boolean;
	enableHaptic?: boolean;
	processingText?: string;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			size,
			endIcon,
			tooltip,
			variant,
			children,
			onClick,
			disabled,
			className,
			startIcon,
			loadingText,
			successText,
			alone = false,
			processingText,
			asChild = false,
			loading = false,
			success = false,
			processing = false,
			enableRipple = true,
			enableHaptic = true,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		const [ripples, setRipples] = React.useState<RippleProps[]>([]);

		const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
			if (!enableRipple) return;

			const button = event.currentTarget;
			const rect = button.getBoundingClientRect();
			const size = Math.max(button.clientWidth, button.clientHeight) * 2;

			const ripple = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
				size,
			};

			setRipples([...ripples, ripple]);
			setTimeout(() => {
				setRipples((prev) => prev.slice(1));
			}, 850);
		};

		const triggerHaptic = () => {
			if (enableHaptic && window.navigator.vibrate) {
				window.navigator.vibrate(50);
			}
		};

		const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
			handleRipple(event);
			triggerHaptic();
			onClick?.(event);
		};

		const ButtonContent = () => {
			if (loading) {
				return (
					<div className='flex items-center gap-2 animate-fade-in'>
						<Loader2 className='animate-spin' />
						<span>{loadingText || children}</span>
					</div>
				);
			}

			if (processing) {
				return (
					<div className='flex items-center gap-2 animate-pulse'>
						<Loader2 className='animate-spin' />
						<span>{processingText || children}</span>
					</div>
				);
			}

			if (success) {
				return (
					<div className='flex items-center gap-2 animate-fade-in'>
						<Check className='animate-bounce' />
						<span>{successText || children}</span>
					</div>
				);
			}

			return (
				<div className='flex items-center gap-2'>
					{startIcon}
					<span>{children}</span>
					{endIcon}
				</div>
			);
		};

		return (
			<Comp
				ref={ref}
				title={tooltip}
				onClick={handleClick}
				disabled={loading || processing || disabled}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			>
				{alone ? children : <ButtonContent />}

				{ripples.map((ripple, index) => (
					<Ripple key={index} {...ripple} />
				))}
			</Comp>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };
