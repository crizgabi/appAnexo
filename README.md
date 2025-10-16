 ## :iphone: API de Autenticação para PWA Mobile 

Este projeto é uma API em Node.js com Express que gerencia usuários e autenticação para um PWA mobile. 
Ele integra banco legado Firebird (do ERP) e MySQL via Prisma (para refresh tokens), usando JWT para autenticação.

O projeto está organizado em camadas, seguindo boas práticas de separação de responsabilidades:

1. **Controllers** → recebem requisições HTTP e chamam os serviços.
2. **Services** → lógica de negócio (login, atualização de senha, tokens).
3. **Repositories** → acesso a bancos de dados (Firebird e MySQL).
4. **Models** → definem estruturas de dados (usuário, refresh token, roles).
5. **Middleware** → valida autenticação e permissões.
6. **DB** → gerencia conexões com Firebird e Prisma.

 ### :computer: Bibliotecas usadas

- **express** → cria o servidor HTTP e rotas.
- **body-parser** → interpreta dados JSON enviados no corpo das requisições.
- **dotenv** → lê variáveis de ambiente do arquivo .env.
- **jsonwebtoken** → cria e valida tokens JWT.
- **crypto** → gera refresh tokens aleatórios.
- **date-fns** → formata datas (ex: data de nascimento do usuário).
- **node-firebird** → conecta ao banco Firebird.
- **@prisma/client / prisma** → ORM para MySQL

### :books: Estrutura do projeto

<img width="452" height="520" alt="image" src="https://github.com/user-attachments/assets/0f28c855-73c1-4001-895e-190f09b1b234" />

### :memo: Configuração do .env 

<pre>FB_HOST=localhost
FB_PORT=3050 
FB_DATABASE=C:/firebird/data/app_users.fdb 
FB_USER=seu_usuario 
FB_PASSWORD=sua_senha 
JWT_SECRET=supersegredo 
PORT=3000 </pre>

### :bulb: Como rodar o projeto 

1. Instale dependências:
<img width="408" height="99" alt="Screenshot 2025-10-16 150050" src="https://github.com/user-attachments/assets/0dfc02e3-6604-481b-8eb4-04af0dea10c7" />

2. Configure o .env com os dados de acesso do banco de dados
3. Rode o servidor:
<img width="408" height="103" alt="Screenshot 2025-10-16 150351" src="https://github.com/user-attachments/assets/d161bba0-7adf-453c-a09a-475ac1028bda" />

4. O servidor vai rodar na porta definida:
<img width="321" height="70" alt="Screenshot 2025-10-16 151501" src="https://github.com/user-attachments/assets/7c3b7683-fb31-4c79-a7d0-e283cae1de43" />


