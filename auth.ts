
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',  // Error code passed in query string as ?error=
    },
    providers: [
        Credentials({
          // Definição dos campos que serão submetidos
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Senha", type: "password" },
          },
          authorize: async (credentials) => {
            if (!credentials?.email || !credentials?.password) {
              return null;
            }

            try {
              // Requisição para o servidor de autenticação
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: credentials.email,
                  senha: credentials.password,  // Aqui corrigimos para "password" conforme enviado do frontend
                })
              });
              
              if (!response.ok) {
                console.error('Falha na autenticação:', response.status);
                return null;
              }

              const data = await response.json();
              console.log(data)
              // Valida se a resposta indica sucesso
              if (data) {
                // Cria um objeto de usuário com as informações retornadas pela API
                const email = credentials.email as string;
                return {
                  id: data.id, // Usamos o email como ID já que a API não retorna um ID específico
                  email: email,
                  name: email.split('@')[0], // Sugestão: usar parte do email como nome
                  evolutionApiKey: data.evolutionApiKey,
                  instance: data.instancia
                };
              }
              
              return null;
            } catch (error) {
              console.error('Erro na autenticação:', error);
              return null;
            }
          },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Quando o usuário faz login, adicionamos seus dados extras ao token
            if (user) {
                token.id = user.id
                token.evolutionApiKey = user.evolutionApiKey
                token.instance = user.instance
            }
            return token
        },
        async session({ session, token }) {
            // Adicionamos os dados extras do token à sessão
            if (token && session.user) {
                session.user.id = token.id as string
                session.user.evolutionApiKey = token.evolutionApiKey as string | undefined
                session.user.instance = token.instance as string | undefined
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 3600, // 1 hora
    },
    secret: process.env.AUTH_SECRET,
})

// Extenda os tipos para incluir os campos personalizados
declare module "next-auth" {
  interface User {
    id: string
    evolutionApiKey?: string
    instance?: string
  }
  
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      image?: string
      evolutionApiKey?: string
      instance?: string
    }
  }
}

// Definição adicional para o JWT
declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    evolutionApiKey?: string
    instance?: string
  }
}