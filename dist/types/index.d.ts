export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    created_at: Date;
    updated_at: Date;
}
export interface JwtPayload {
    id: number;
    username: string;
    email: string;
}
//# sourceMappingURL=index.d.ts.map