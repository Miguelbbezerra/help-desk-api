# Help Desk — API

Backend de um sistema de chamados (help desk). Usuários abrem tickets, anexam
imagens e conversam com o suporte num chat em tempo real dentro de cada ticket.

O frontend em React está em [help-desk-front](https://github.com/Miguelbbezerra/help-desk-front).

**Stack:** Node.js · Express · TypeORM · MySQL · Socket.io · JWT · Multer

## Funcionalidades

- **Login com JWT** e dois níveis de usuário: `admin` e `comum`.
- **Tickets** com título, descrição, categoria e status. Categorias e status são
  cadastráveis, então cada time monta o próprio fluxo (aberto, em andamento...).
- **Anexos:** upload de imagens no ticket com Multer. Os arquivos ficam em
  `src/uploads` e são servidos como estáticos.
- **Chat por ticket em tempo real.** A mensagem chega pelo Socket.io, é salva no
  banco e é reenviada para todos os clientes conectados.
- **Notificações em tempo real** quando um ticket é criado ou alterado e quando chega
  mensagem nova no chat.

## Estrutura

```
src/
├── app.js               # Express + servidor HTTP + Socket.io
├── app-data-source.js   # conexão TypeORM (MySQL)
├── router.js            # todas as rotas
├── middleware/auth.js   # valida o JWT do header Authorization
├── schema/              # entidades: users, tickets, chats, categories, status, anexos, notifications
├── controllers/         # um controller por ação (List, Store, Update, Delete)
└── validator/
```

Cada operação tem o próprio controller (`StoreTicketController`,
`ListTicketController`...), em vez de um controller grande por recurso.

## Rodando

Precisa de Node 18+ e de um MySQL local com um banco chamado `helpdesk`. A conexão
está em `src/app-data-source.js` (usuário `root`, sem senha). As tabelas são criadas
automaticamente na primeira execução (`synchronize: true` do TypeORM).

```bash
npm install
npm start        # sobe em http://localhost:5000
```

## Rotas

| Recurso | Rotas |
|---|---|
| Login | `POST /login`, `POST /validate-token` |
| Usuários | `GET /user`, `POST /user`, `PUT /user/:id` |
| Tickets | `GET /ticket`, `POST /ticket`, `PUT /ticket/:id` |
| Chat | `GET /chat`, `POST /chat`, `PUT /chat/:id` |
| Categorias | `GET /category`, `POST /category`, `PUT /category/:id` |
| Status | `GET /status`, `POST /status`, `PUT /status/:id` |
| Anexos | `GET /anexosticket`, `POST /anexosticket` (multipart), `PUT /anexosticket/:id` (desativa) |
| Notificações | `GET /notification`, `POST /notification`, `PUT /notification/:id` |

Fora `/login`, `/validate-token` e as rotas de chat, todas exigem
`Authorization: Bearer <token>`.

Eventos do Socket.io: `chat message` (enviar e receber mensagens) e `notification`.

## Pontos conhecidos para melhorar

Projeto de 2024. O que ficou para melhorar:

- **Segredo do JWT e credenciais do banco estão fixos no código.** O certo é ler de
  variáveis de ambiente (`.env`).
- **`synchronize: true`** deixa o TypeORM alterar as tabelas sozinho a cada start.
  Em produção, o caminho seria usar migrations.
- **As rotas de chat não exigem autenticação.**
- **As notificações não estão sendo gravadas no banco.** O envio em tempo real
  funciona, mas o servidor chama a própria API por HTTP para salvar: nos tickets a
  URL está errada (`/notifications` em vez de `/notification`) e no chat a chamada
  vai sem token, então o `auth` recusa. Chamar o service direto, sem passar por HTTP,
  resolveria as duas coisas.
- **Não há testes automatizados.**
