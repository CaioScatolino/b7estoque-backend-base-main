# B7Estoque Backend

Este projeto é um back-end de um sistema de estoque (B7Estoque) sendo construído com **Node.js, Express, TypeScript, Zod** (para validação) e **Drizzle ORM** com **MySQL**.

Este arquivo serve como um resumo dos meus estudos e um passo a passo do que foi desenvolvido até agora para facilitar revisões futuras.

## 🚀 Tecnologias Utilizadas
- **Node.js + Express**: Servidor e gerenciamento de rotas HTTP.
- **TypeScript**: Adiciona tipagem estática, garantindo um código mais seguro e previsível.
- **Drizzle ORM**: Biblioteca moderna que permite interagir com o banco de dados via TypeScript de forma tipada.
- **MySQL2**: Driver de conexão para o banco de dados MySQL.
- **Zod**: Biblioteca para criar esquemas de validação de dados de entrada da forma mais segura possível.
- **Bcrypt**: Biblioteca utilizada para o hash (criptografia) de senhas.
- **TSX**: Executor para rodar arquivos TypeScript diretamente sem precisar compilar manualmente durante o desenvolvimento.

## 📂 Arquitetura do Projeto

O projeto foi organizado em camadas (layered architecture), o que facilita a manutenção e testes. Cada pasta tem uma responsabilidade única:

- `src/server.ts`: Arquivo principal que sobe o servidor Express, configura bibliotecas globais (como `cors` e `express.json`) e atrela as rotas.
- `src/routes/`: Onde ficam definidas as URLs da API (ex: `/api/users`) e para qual Controller a requisição deve ser enviada.
- `src/controllers/`: A camada responsável por receber a requisição da Rota (`req`, `res`), chamar o validador, encaminhar a ação para o Service e pegar o resultado para enviar a resposta (status 200, 201, etc) para o cliente.
- `src/validators/`: Onde criamos os schemas do **Zod** para validar dados de entrada (ex: se o e-mail enviado é realmente um e-mail válido, se a senha tem pelo menos 'x' caracteres).
- `src/services/`: Essa é a camada que possui as **regras de negócio**. É aqui em que validamos se um usuário já existe no banco, onde criamos o hash de senha e de onde chamamos as funções de inserir as coisas no banco de dados.
- `src/db/`: Tudo relacionado ao banco de dados fica aqui.
  - `connection.ts`: Onde criamos a conexão para o BD.
  - `schema/`: Onde declaramos as tabelas para o Drizzle ORM entender a tipagem delas.

## 🔄 Fluxo de uma Requisição (Passo a Passo)

Aqui está um resumo do ciclo de vida quando uma requisição chega para **criar um novo usuário**:

1. **A Requisição Chega**: O usuário manda os dados via POST (ex: `email`, `password`, `name`).
2. **Rota**: O arquivo `routes` captura o endpoint e manda pro Controller certo.
3. **Validação (Controller + Zod)**: O `user.controller.ts` usa o esquema feito no `user.validator.ts` para ler e formatar os parâmetros de entrada com `createUserSchema.parse(req.body)`. Se faltar algum dado essencial, o esquema barra a operação e dispara um erro de validação.
4. **Business Logic (Service)**: O Controller então passa os dados validados para `userService.createUser(data)`.
5. **No Service (`user.service.ts`)**:
   - É feita a validação de regra de negócio: verificamos se o email já existe. Se existir, ele dispara um erro ('Email já está em uso').
   - Fazemos o *Hash* (embaralhamento com Bcrypt) da senha para não guardar senhas puras/em texto livremente no banco.
   - Criamos os dados para a inserção (UUID etc.) e usamos o comando do **Drizzle ORM** `db.insert(users).values(...)` para persistir isso no MySQL.
6. **Retorno**: Como o MySQL não retorna a linha inserida por padrão, nós usamos a sintaxe `.$returningId()` do Drizzle para pegar o ID que acabou de ser gerado, efetuamos a busca deste usuário recém-criado, formatamos as propriedades (como remover o hash da senha) e enfim retornamos a estrutura segura.
7. **The End (Controller Responde)**: O Service devolve a estrutura tipada (`User`), e o Controller apenas usa o `res.status(201).json({ data: user })` para responder ao cliente.

## 📝 Pontos de Estudo Notáveis
- Diferente do PostgreSQL, o **MySQL não suporta a cláusula `.returning()` diretamente** pra recebermos dados de forma embutida após um `.insert().values()`. Por isso, fazemos uso do `.$returningId()` do Drizzle que supre isso da forma que se deve e permite fazermos um `select` para retornarmos os conteúdos completos ao invés de só mostrar que deu certo.
- Tudo foi criado para ser rodado nativamente com as extensões `.env` suportadas nas novas versões do Node. Por exemplo, `node --env-file=.env src/server.ts` e afins. (Usando a funcionalidade nativa do Node em vez do antigo `dotenv`).

---
_Estudos de Back-end Node.js / Express / Projeto Portfolio_
