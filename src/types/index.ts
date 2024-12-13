// types
import {
	Dispatch,
	FormEvent,
	FocusEvent,
	ChangeEvent,
	KeyboardEvent,
	SetStateAction,
} from 'react';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

export type ChangeType = ChangeEvent<HTMLInputElement>;
export type FocusType = FocusEvent<HTMLInputElement>;
export type SubmitType = FormEvent<HTMLFormElement>;

export type KeyType = KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>;

export type GetSSPropsType<PropsType> = PropsType extends GetServerSideProps<
	infer Props,
	ParsedUrlQuery
>
	? Props
	: PropsType;

export type SetStateType<objectType> = Dispatch<SetStateAction<objectType>>;
