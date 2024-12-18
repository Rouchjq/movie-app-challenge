'use client';

// main tools
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// components
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';

// icons
import { Search } from 'lucide-react';

// types
import type { FC } from 'react';

export const SearchBar: FC = () => {
	const router = useRouter();
	const [query, setQuery] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			router.push(`/search?query=${encodeURIComponent(query.trim())}`);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='relative w-full max-w-md'>
			<Input
				type='text'
				value={query}
				placeholder='Search movies...'
				onChange={(e) => setQuery(e.target.value)}
				className='pr-12 bg-background'
			/>
			<Button
				type='submit'
				variant='ghost'
				size='icon'
				className='absolute right-0 top-0 h-full'
			>
				<Search className='h-4 w-4' />
			</Button>
		</form>
	);
};
