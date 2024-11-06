import { SessionOptions } from "iron-session";

export interface SessionData {
    userId?: number;
    rol?: number;
    name?: string;
    lastname?: string;
    islogged: boolean;
    reemo?: string;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: 'gana-session',
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    },
    ttl: 60 * 60 * 1 * 1 // 1 hour
}

export const defaultSession: SessionData = {
    islogged: false
}