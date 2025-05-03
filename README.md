# Front GMaps

Aplicação front-end para visualização e interação com o Google Maps, desenvolvida com Next.js, TypeScript, Tailwind CSS e Shadcn UI.

## 🚀 Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) (ícones)

## 📋 Pré-requisitos

- Node.js 18.17 ou superior
- npm, yarn ou pnpm

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://seu-repositorio/front-gmaps.git
cd front-gmaps
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave da API do Google Maps:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_api
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse `http://localhost:3000` no seu navegador.

## 🏗️ Estrutura do Projeto

```
front-gmaps/
├── src/
│   ├── app/              # Diretórios e arquivos de páginas (App Router)
│   │   ├── page.tsx     # Página principal
│   │   └── ...          # Outros arquivos de página
│   ├── components/       # Componentes reutilizáveis
│   │   ├── ui/           # Componentes de UI do Shadcn
│   │   └── ...           # Outros componentes
│   └── lib/              # Bibliotecas e utilitários
├── public/               # Arquivos públicos
└── ...                   # Arquivos de configuração
```

## 📱 Funcionalidades

- Visualização de mapas interativos
- Busca de locais e endereços
- Layout responsivo
- Interface elegante com componentes do Shadcn UI

## 🚀 Deploy

A aplicação pode ser facilmente implantada na Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/front-gmaps)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🧑‍💻 Desenvolvimento

Para contribuir com o projeto, siga estas etapas:

1. Faça um fork do projeto
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
