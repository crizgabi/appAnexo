 ## :iphone: API de Autenticação para PWA Mobile 

Este projeto é uma API em Node.js com Express que gerencia usuários e autenticação para um PWA mobile. 
Ele integra banco legado Firebird (do ERP) e utiliza o Redis para gerenciamento de refresh tokens e sessões, com autenticação baseada em JWT.

O projeto está organizado em camadas, seguindo boas práticas de separação de responsabilidades:

1. **Controllers** → recebem requisições HTTP e chamam os serviços.
2. **Services** → lógica de negócio (login, atualização de senha, tokens).
3. **Repositories** → acesso a bancos de dados (Firebird e MySQL).
4. **Models** → definem estruturas de dados (usuário, refresh token, roles).
5. **Middleware** → valida autenticação e permissões.
6. **DB** → gerencia conexões com Firebird e Redis

 ### :computer: Bibliotecas usadas

- **express** → cria o servidor HTTP e rotas.
- **body-parser** → interpreta dados JSON enviados no corpo das requisições.
- **dotenv** → lê variáveis de ambiente do arquivo .env.
- **jsonwebtoken** → cria e valida tokens JWT.
- **crypto** → gera refresh tokens aleatórios.
- **date-fns** → formata datas (ex: data de nascimento do usuário).
- **node-firebird** → conecta ao banco Firebird.
- **redis** → armazena refresh tokens e sessões de login de forma rápida e escalável.

### :books: Estrutura do projeto



### :memo: Configuração do .env 

<pre>
FB_HOST=localhost
FB_PORT=3050 
FB_DATABASE=C:/firebird/data/app_users.fdb 
FB_USER=seu_usuario 
FB_PASSWORD=sua_senha 
JWT_SECRET=supersegredo 
REDIS_URL=redis://localhost:6379
</pre>

### :bulb: Como rodar o projeto 


1. Instale o docker para desktop
2. Abra o docker
3. Instale as dependências:
 
 <pre>npm install</pre>

3. Configure o arquivo .env com as credenciais do Firebird e do Redis.

4. Inicie o Redis via docker

<pre>docker run --name redis -p 6379:6379 -d redis</pre>

5. Rode o servidor

<pre>npm run dev</pre>

### 🧪  Teste rápido de autenticação no insomnia

**Rota:** POST /users/login

**Body:**
<pre>
 json
 
{
	"login": "gabi",
	"password": "Teste"
}
</pre>

**Resposta:**
<pre>
 json

 {
	"message": "Login successful",
	"user": {
		"login": "gabi"
	},
	"token": "<jwt>",
	"refreshToken": "<refresh_token>"
}
</pre>



