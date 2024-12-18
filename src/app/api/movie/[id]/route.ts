import { DEFAULT_PARAMS, tmdbApi } from '@/lib/api/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const { searchParams } = request.nextUrl;

		const queryParams = {
			language: searchParams.get('language') || DEFAULT_PARAMS.language,
		};

		const response = await tmdbApi().get(`/movie/${id}`, {
			params: queryParams,
		});

		return NextResponse.json(response.data);
	} catch (error) {
		console.error('🚀 ~ error API:', error);
		return NextResponse.json(
			{ error: 'Error fetching movie details' },
			{ status: 500 },
		);
	}
}
