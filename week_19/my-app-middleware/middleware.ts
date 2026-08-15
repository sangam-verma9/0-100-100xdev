import {NextResponse} from 'next/server';

let count = 0;
export function middleware(request: Request) {
    count++;
    const response = NextResponse.next();
    console.log(`Request count: ${count}`);
    return response;
}