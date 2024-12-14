export interface UserType {
	id: string;
	email: string;
	name: string;
}

export interface AuthStateType {
	user: UserType | null;
	isAuthenticated: boolean;
}
