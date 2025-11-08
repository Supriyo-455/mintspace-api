## Mintspace - Empowering Knowledge Sharing

Mintspace is a platform for easy blogging and knowledge sharing.  
Read, write, and connect with others who share your interests.

## Technologies

- NodeJS: Backend runtime
- TypeScript: Strongly typed JavaScript
- MySQL: Database
- Markdown: For clean content formatting

## API Routes

Home (/v1)

- GET /?page={number} → Public blogs
- GET /{id} → Blog by ID  
  (Authenticated users can see both regular and premium blogs)

Login (/v1/login)

- GET /
- POST /

Signup (/v1/signup)

- GET /
- POST /

Profile (/v1/profile) [Protected]

- GET /
- POST /

Blog Create (/v1/write) [Protected]

- GET /
- POST /

Admin (/v1/admin) [Admin Only]

- GET /
- POST /

## Data Models

Blog:  
ID, AuthorEmail, IsPremium, Title, Content

User:  
Email, Name, IsAdmin, DateOfBirth, ProfileCreatedDate, EncryptedPassword

## Setup Instructions

1. Install TypeScript  
   npm install -g typescript

2. Check TypeScript version  
   tsc --v

3. Install dependencies  
   npm install

4. Build project  
   npm run build

5. Configure .env with MySQL settings

6. Create a database named goblogapi

7. Seed the database  
   npm run seedDb

8. Start the server  
   npm run start

## Server URL

http://localhost:5006/v1/

## Swagger docs

http://localhost:5006/docs/

## Mintspace - Write. Share. Inspire.
