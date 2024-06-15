# BACKEND-nlwExpert-RN
Servidor criado para servir a aplicação desenvolvida no evento da Rocketseat - NLW Expert - tilha React Native

## Setup

É necessário ter o NodeJS e o Docker instalado

Primeiro certifique-se de estar com o terminal na pasta do projeto e então instale as dependências com

```bash
npm install
```

### Criar Container com Docker

criar os container:

```bash
docker-compose up -d
```

Verificar containers criados:

```bash
docker ps -a
```

Copie o nome do container que deseja executar e escreva no terminal:

```bash
docker start nomecontainer
```

## Criar as tabelas do banco de dados

No terminal, executa:
Depois o prisma vai pedir para adicionar um nome que pode ser algo como "criando as tabelas"

```bash
npx prisma migrate dev
```

### Executar o servidor

```bash
npm run dev
```

## Vizualizar banco de dados

No terminal, executar:

```bash
npx prisma studio
```
