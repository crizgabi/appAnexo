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

### :memo: Configuração do .env 

<pre>
PORT=3000
DATABASE_URL=
REDIS_URL=

JWT_SECRET=

FB_DB_52IJF07_HOST
FB_DB_52IJF07_PORT=
FB_DB_52IJF07_DATABASE=
FB_DB_52IJF07_USER=
FB_DB_52IJF07_PASSWORD=
</pre>

### :bulb: Como rodar a aplicação em docker:

1. Instale o docker para desktop.
2. Abra um terminal PowerShell.  
**Primeiro, remova tudo da sua aplicação para evitar conflitos:**

<pre>Remove-Item -Recurse -Force .\node_modules    
Remove-Item -Recurse -Force .\prisma\migrations </pre>

3. Abra o docker
4. Em seguida, suba o container:
<pre>docker compose up --build</pre>

5. Quando a aplicação subir, rode:

<pre>docker exec -it node_app npx prisma migrate dev --init</pre>

6. Em outro terminal, rode:

<pre>docker exec -it node_app npx prisma studio</pre>

7. Logo em seguida, acesse pelo browser:
http://localhost:5555  

8. Acesse a tabela tenants e crie um registro com os seguintes dados:
<pre>id: 52IJF07
dbtype: firebird
dbEnvkey: FB_DB_52IJF07</pre>
Clique em salvar.

9. Acesse a tabela empresa e crie um registro com os seguintes dados:
<pre>id: anexo00521
nome: Anexo Tecnologia
tenantId: 52IJF07</pre>
Clique em salvar.

Agora a aplicação vai estar funcionando corretamente. Note que por enquanto só existem clients para banco FIREBIRD, mas podem ser criados clientes para mySQL, Postgres e etc somente alterando DBClientFactory e adicionando os clients na pasta repositories, assim como ja existem os clients FireBird.

### 🧪  Teste rápido de autenticação no insomnia

**Rota:** POST /users/login

**Body:**
<pre>
 json
 
{
	"login": "gabi",
	"password": "Teste",
	"empresaId": "Anexo00521"
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
	"refreshToken": "<refresh_token>",
	"tenantId": "<tenantId>"
}
</pre>



