import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2, Check } from 'lucide-react';

// Definimos las variantes del botón
const buttonVariants = cva(
	'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden active:scale-95',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				success: 'bg-green-600 text-white hover:bg-green-700',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				full: 'h-10 px-4 py-2 w-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

// Interfaz para el efecto Ripple
interface RippleProps {
	x: number;
	y: number;
	size: number;
}

// Componente para el efecto Ripple
const Ripple: React.FC<RippleProps> = ({ x, y, size }) => {
	return (
		<span
			className='absolute bg-white/30 rounded-full pointer-events-none animate-ripple'
			style={{
				left: x - size / 2,
				top: y - size / 2,
				width: size,
				height: size,
			}}
		/>
	);
};

// Interfaz de props del botón
export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
	processing?: boolean;
	success?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	loadingText?: string;
	processingText?: string;
	successText?: string;
	tooltip?: string;
	enableRipple?: boolean;
	enableHaptic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			loading = false,
			processing = false,
			success = false,
			disabled,
			children,
			startIcon,
			endIcon,
			loadingText,
			processingText,
			successText,
			tooltip,
			enableRipple = true,
			enableHaptic = true,
			onClick,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		const [ripples, setRipples] = React.useState<RippleProps[]>([]);

		// Manejador del efecto ripple
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

		// Manejador para el feedback táctil
		const triggerHaptic = () => {
			if (enableHaptic && window.navigator.vibrate) {
				window.navigator.vibrate(50);
			}
		};

		// Manejador combinado para el clic
		const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
			handleRipple(event);
			triggerHaptic();
			onClick?.(event);
		};

		// Componente para el contenido del botón con animaciones específicas para cada estado
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
				<ButtonContent />
				{ripples.map((ripple, index) => (
					<Ripple key={index} {...ripple} />
				))}
			</Comp>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };
