import { withAuth } from 'next-auth/middleware'


// route guard
export default withAuth({
    pages: {
        signIn: '/',
    }
})

export const config = {
    matcher: [
        '/users/:path*'
    ]
}