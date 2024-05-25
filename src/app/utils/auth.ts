import { NextAuthOptions } from "next-auth"
import AzureADProvider from 'next-auth/providers/azure-ad'

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    })
  ],    
  callbacks: {
    jwt({ token, account, profile }) {
      //account object has the id token, refresh token and access token
      if(account) if(profile) token.roles = profile.roles
        return token
    },
    session({ session, token}) {
      session.user.roles = token.roles;
      session.user.picture = token.picture;
      session.user.name = token.name;
      session.user.initials = token.name?.split(' ').map(a => a[0]).join('');
      session.user.email = token.email;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
} satisfies NextAuthOptions