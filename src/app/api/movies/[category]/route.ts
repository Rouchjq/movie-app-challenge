import { DEFAULT_PARAMS, tmdbApi } from '@/lib/api/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ category: string }> },
) {
	try {
		const { category } = await params;
		const { searchParams } = request.nextUrl;

		const queryParams = {
			...DEFAULT_PARAMS,
			language: searchParams.get('language') || DEFAULT_PARAMS.language,
			page: Number(searchParams.get('page')) || DEFAULT_PARAMS.page,
		};

		const response = await tmdbApi().get(`/movie/${category}`, {
			params: queryParams,
		});

		return NextResponse.json(response.data);
	} catch (error) {
		console.log('🚀 ~ error API:', error);
		return NextResponse.json({ error: 'Error fetching movies' }, { status: 500 });
	}
}
