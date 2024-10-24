# Express.js and React.js Demo

Express.js backend with JWT authentication and a React.js frontend. 

## Server features: 

1. JWT authentication chain. 
2. Param filtering. 
3. Query string sanitization. 
4. Prisma ORM (Object relationship mapping): Used to map models to the DB tables, run migrations and provide an API for querying the DB.
5. Search caching configuration.
 
### Front end features: 

1. JWT authentication (Signup, login and logout).
2. Search autocomplete and select. 
3. Cache settings update. 

## Steps to run: 

Clone the repo: 

```bash
git clone https://github.com/JarredBaker/express_react_demo.git
cd express_react_demo
```

### Server: 

#### DB setup: 

Please note the below bash commands will create your DB and seed it. However, if you would rather use the pg_dump please follow that section. 

Database connection: 

In the following file `'./server/.env'`. Please add your PostgresSQL username and password to the line mentioned below. 
If you are running PostgresSQL on a different port, please update that too.

Placeholders are: `<your_username>`, `<your_password>`

```bash
DATABASE_URL="postgresql://<your_username>:<your_password>@localhost:5432/starwars_db?schema=public"
```

Please run the following commands one by one: 

**Important** the last two commands will create your postgres DB and seed it.

### Option 1 (DB created through prisma): 

```bash
 cd server
 npm install
 npx prisma migrate deploy
 npx prisma db seed
```

### Option 2 (DB manually created): 

```bash
 cd server
 npm install
```

Replace `<your_username>` with the username of your PostgresSQL user.

**Place the dump file in the directory you are going to run the following commands in**

```bash
psql -U <your_username> -h localhost -p 5432 -c "CREATE DATABASE starwars_db;"
# OR 
psql -U <your_username> -d postgres -h localhost -p 5432 -c "CREATE DATABASE starwars_db;"
# AND
pg_restore -U <your_username> -h localhost -p 5432 -d starwars_db -F c start_up.dump
# OR
pg_restore -U <your_username> -d postgres -h localhost -p 5432 -d starwars_db -F c start_up.dump
```

```bash
 npx prisma db seed
```

### Run the server: 

```bash
DEBUG=server:* npm start 
```

### Front end:

Please run the following commands one by one: 

```bash
 cd frontend
 npm install
```

Run the frontend: 

```bash
 npm start
```

### Clean up: 

The database name is `starwars_db`. Please log into your PostgresSQL db and manually delete it. 
Eg: 

```bash
psql -U <username> -d postgres
DROP DATABASE starwars_db;
\q
```
