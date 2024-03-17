import { withAuth } from 'next-auth/middleware'


export default withAuth({
    pages: {
        signIn: '/',
    }
})

// route guard: https://nextjs.org/docs/app/building-your-application/routing/middleware
export const config = {
    matcher: [
        '/users/:path*'
    ]
}