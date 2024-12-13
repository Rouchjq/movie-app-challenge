// main tools
import { Suspense } from 'react';

// components
import { MovieSectionSkeleton } from './(home)/movie-section/skeleton';
import { HeroBannerSkeleton } from './(home)/banner/skeleton';
import { ErrorMessage } from '@/components/error-message';
import { MovieSection } from './(home)/movie-section';
import { HeroBanner } from './(home)/banner';

// libs
import { getRandomMovies } from '@/lib/movies';
import { getMovies } from '@/lib/api/movies';

export default function Home() {
	const popularPromise = getMovies('POPULAR');
	const upcomingPromise = getMovies('UPCOMING');
	const topRatedPromise = getMovies('TOP_RATED');
	const nowPlayingPromise = getMovies('NOW_PLAYING');

	const BannerAndInitialSections = async () => {
		try {
			const [popularData, nowPlayingData] = await Promise.all([
				popularPromise,
				nowPlayingPromise,
			]);

			const popularMovies = popularData.results.sort(() => 0.5 - Math.random());
			const nowPlayingMovies = nowPlayingData.results.sort(
				() => 0.5 - Math.random(),
			);

			const bannerMovies = getRandomMovies(
				[...popularMovies.slice(0, 3), ...nowPlayingMovies.slice(0, 3)],
				6,
			);

			return (
				<>
					<HeroBanner movies={bannerMovies} />
					<div className='mt-8 px-4'>
						<MovieSection title='Popular Movies' movies={popularData.results} />
						<MovieSection title='Now Playing' movies={nowPlayingData.results} />
					</div>
				</>
			);
		} catch (error) {
			return (
				<div>
					<ErrorMessage
						endpoint={error instanceof Error ? error.message : 'Unknown error'}
					/>
				</div>
			);
		}
	};

	const UpcomingSection = async () => {
		try {
			const data = await upcomingPromise;
			return <MovieSection title='Upcoming Movies' movies={data.results} />;
		} catch (error) {
			return (
				<div>
					<ErrorMessage
						endpoint='Upcoming Movies'
						errorMessage={error instanceof Error ? error.message : 'Unknown error'}
					/>
				</div>
			);
		}
	};

	const TopRatedSection = async () => {
		try {
			const data = await topRatedPromise;
			return <MovieSection title='Top Rated Movies' movies={data.results} />;
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
			<Suspense fallback={<HeroBannerSkeleton />}>
				<BannerAndInitialSections />
			</Suspense>

			<div className='px-4'>
				<Suspense fallback={<MovieSectionSkeleton />}>
					<UpcomingSection />
				</Suspense>

				<Suspense fallback={<MovieSectionSkeleton />}>
					<TopRatedSection />
				</Suspense>
			</div>
		</main>
	);
}
