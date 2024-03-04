export type LoginSchema = {
    email: string;
    password: string;
    remember?: boolean;
    isLoading?: boolean;
    error?: string | unknown;
    message?: string | unknown;
    confirmPassword?: string;
}

export interface RegisterSchema {
    email: string;
    password: string;
    isLoading: boolean;
    error?: string | unknown;
}

export interface ChangePasswordSchema {
    password: string;
    confirmPassword: string;
    isLoading: boolean;
    error?: string | unknown;
}
