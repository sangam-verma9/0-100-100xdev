## Middleware in Nextjs
Middlewares are code that runs before / after your request handler.

## Client side rendering
Client-side rendering (CSR) is a modern technique used in web development where the rendering of a webpage is performed in the browser using JavaScript. Instead of the server sending a fully rendered HTML page to the client

## Server side rendering
When the rendering process (converting JS components to HTML) happens on the server, it’s called SSR. 

#### Downsides of SSR?
> Expensive since every request needs to render on the server

## Static site generation
If a page uses Static Generation, the page HTML is generated at build time. That means in production, the page HTML is generated when you run next build. This HTML will then be reused on each request. It can be cached by a CDN. This also solve problem of heavy load on server.

