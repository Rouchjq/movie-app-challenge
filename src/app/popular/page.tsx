// main tools
import { Suspense } from 'react';

// components
import { MovieSectionSkeleton } from '../(home)/movie-section/skeleton';
import { ErrorMessage } from '@/components/error-message';

// libs
import { getMovies } from '@/lib/api/movies';

// types
import { PopularPageContent } from './popular-page-content';

export default async function PopularPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const page = (await searchParams).page;
	const popularPromise = getMovies('POPULAR', `page=${page}`);

	const PopularPageContentResolver = async () => {
		try {
			const data = await popularPromise;
			return <PopularPageContent data={data} />;
		} catch (error) {
			return (
				<div>
					<ErrorMessage
						endpoint='Top Rated Movies'
						errorMessage={error instanceof Error ? error.message : 'Unknown error'}
					/>
				</div>
			);
		}
	};

	return (
		<main>
			<div className='px-4'>
				<Suspense fallback={<MovieSectionSkeleton />}>
					<PopularPageContentResolver />
				</Suspense>
			</div>
		</main>
	);
}
