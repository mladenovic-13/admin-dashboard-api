# Admin Dashboard API

## Built with:

- Node
- Express
- TypeScript
- Firebase Admin SDK
- Morgan

So, as we all know, Firebase SDK is not made for servers. The purpose of Firebase is to integrate everything on the client side, from authentication and authorization to fetching data from a database. But we can use Firebase Admin SDK on the server side. So I decided to give it a chance and try it.

All routes are made with an Express router and authorized with Firebase Token that is generated on the client side.

