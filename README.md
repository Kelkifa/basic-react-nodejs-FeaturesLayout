# Basic setup Nodejs + Reactjs (grid library, feature layouts, auto import componenets )

## Introduction

Basic layout for Nodejs server and Reactjs client

- Server (Nodejs + Express, MongoDB)
- Client (Reactjs)

Technologies

- Auto import (vscode)
- redux and react redux (reactjs)
- react router dom (reactjs)
- formic (form control) (reactjs)
- yup (form validation)

## Libraries

Reactjs (client)

`npm install create-react-app`

React Router Dom

`npm install react-router-dom`

React Icons
`npm install react-icon --save`

Nodejs Express (server)

`npm install express`

Mongoose (database)

`npm install mongoose`

Cors

`npm install cors`

Concurrently (run Reactjs and nodejs on a same terminal)

`npm install concurrently--save-dev`

## Folder Organization

```
client
|__ public
|__ src
|  |__ assets
|  |  |__ gridLibrary.scss
|  |__ components
|  |__ features
|  |  |__ Cart
|  |  |  |__ components
|  |  |  |__ pages
|  |  |__ Product
|  |     |__ components
|  |     |__ pages
|  |__ App.js
|  |__ indedx.js
|  |__ jsconfig.json
server
|__ app
|  |__ cores
|  |  |__ connectDb.js
|  |__ models
|__ index.js
```

## Usage

- When you clone this project to your folder, you have to run this command:

`cd client && npm install`

- You have to delete git when cloning fihish, using this command:

`rmdir /S .git`

- Change Mongodb Url in file connectDb.js to your db

## Src

- Setup to deloy to heroku: https://www.youtube.com/watch?v=xgvLP3f2Y7k
- Create react app: https://vi.reactjs.org/docs/create-a-new-react-app.html
