import { Suspense } from 'react';
import { MovieSectionSkeleton } from '../(home)/movie-section/skeleton';
import { ErrorMessage } from '@/components/error-message';
import { searchMovies } from '@/lib/api/movies';
import { SearchResults } from './search-results';

export default async function SearchPage({
	searchParams,
}: {
	searchParams: { query?: string; page?: string };
}) {
	const { query, page } = searchParams;

	if (!query) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<ErrorMessage endpoint='Search' errorMessage='Please enter a search term' />
			</div>
		);
	}

	const SearchResultsContent = async () => {
		try {
			const data = await searchMovies(query, page);
			console.log('🚀 ~ SearchResultsContent ~ data:', data);
			return <SearchResults data={data} searchQuery={query} />;
		} catch (error) {
			return (
				<ErrorMessage
					endpoint='Search Movies'
					errorMessage={error instanceof Error ? error.message : 'Unknown error'}
				/>
			);
		}
	};

	return (
		<main>
			<div className='px-4'>
				<Suspense fallback={<MovieSectionSkeleton />}>
					<SearchResultsContent />
				</Suspense>
			</div>
		</main>
	);
}
