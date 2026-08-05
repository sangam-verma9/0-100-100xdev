## Medium Blog like application

#### Tech and Tools listed below
- React in the frontend
- cloudflae workers in backend
- zod as the validation library, type inferece for the frontend types
- Typescript as the language
- Prisma as the ORM, with connectin pooling
- Postgress as the database
- JWT for the authentication (Cookies approach)

#### Initialize the backend project
```
npm create hono@latest
npm i prisma
npx prisma init
```

> Use connection pool url of db instead of direct db url in case of serverless backend

```
npx prisma migrate dev --name init_schema
npx prisma generate
```
### Deploy common type from common folder to npm
```
npm login
npm publish
```

