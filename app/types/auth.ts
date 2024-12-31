// /types/auth.ts
export interface AuthUser {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
    companyId?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export type AuthErrorCode =
    | "INVALID_CREDENTIALS"
    | "USER_NOT_FOUND"
    | "ACCOUNT_DISABLED"
    | "COMPANY_INACTIVE";
