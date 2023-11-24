# Mintspace
Mintspace is a blogging platform where you can read and share knowledge with your friends and followers.


### Description
This is the api that will be used inside the front-ends for different platforms web, mobile and ios.

#### Technology used
- NodeJS
- Typescript
- MySQL
- Markdown

### Instructions to run on your local machine
- Clone the repo on your local machine.
- You should have Nodejs, MySQL installed on your pc/laptop.
- After this everything is very simple, just follow my steps.

#### Step 1) Setup download typescript compiler
```
npm install -g typescript
```

#### Step 2) Check your typescript installtion
```
tsc --v
```
you should see something like: *Version 4.0.2*

#### Step 3) Install the project dependencies
```
npm install
```

#### Step 4) Setup MySQL for the first time

- First compile the typescript files 
```
npm run build
```
- Change the .env file contents (DB_*) according to your mysql configs
- Create a database in your mysql database named **goblogapi**
- Then run the database seeding database script
```
npm run seedDb
```

#### Step 5) Run the express server
```
npm run start
```

#### Now the application should be running on localhost:3000.

### That's It! Enjoy!!