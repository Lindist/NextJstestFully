import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";


const login = async (credentials: any) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials?.username });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(credentials?.password.toString(), user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to sign in");
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    })
  ],
  callbacks:{
    async signIn({ user, account, profile }){
        // console.log(user, account, profile)
        if(account?.provider === "github"){
            await connectToDb();
            try{
                const user = await User.findOne({ email: profile?.email });
                if(!user){
                    const newUser = new User({
                        username: (profile as any)?.login,
                        email: profile?.email,
                        image: (profile as any)?.avatar_url,
                    });
                    await newUser.save();
                }
            }catch(err){
                console.log(err);
                return false;
            }
        }
        return true;
    },
    ...authConfig.callbacks,
  }
})