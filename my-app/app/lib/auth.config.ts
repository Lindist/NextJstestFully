export const authConfig = {
    providers: [],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
        async authorized({ auth, request }: any) {
            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl.pathname.startsWith("/admin");
            const isOnBlogPage = request.nextUrl.pathname.startsWith("/blog");
            const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");

            // Only apply to admin and login pages
            if (isOnAdminPanel) {
                if (!user?.isAdmin) return false; // Redirect to login if not logged in
            }

            if (isOnBlogPage) {
                if (!user) return false; // Redirect to login if logged in is invalid
            }

            if (isOnLoginPage) {
                if (user) return Response.redirect(new URL("/", request.nextUrl));
            }

            return true;
        },
    },
}