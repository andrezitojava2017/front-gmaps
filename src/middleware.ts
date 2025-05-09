import { NextResponse } from 'next/server';
import { auth } from '../auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  
  // Rotas públicas que não precisam de autenticação
  const isPublicRoute = req.nextUrl.pathname === '/login';
  
  // Se estiver tentando acessar uma rota pública estando logado, redireciona para a página inicial
  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  // Se tentar acessar uma rota protegida sem estar logado, redireciona para o login
  if (!isPublicRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    
    // Armazena a URL atual para redirecionar de volta após o login
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
});

// Configuração: Aplica o middleware a todas as rotas que não sejam de API ou arquivos estáticos
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 