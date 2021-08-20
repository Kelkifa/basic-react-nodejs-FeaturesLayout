# Basic setup Nodejs + Reactjs (grid library, feature layouts, auto import componenets )

## Introduction

Basic layout for Nodejs server and Reactjs client

- Server (Nodejs + Express, MongoDB)
- Client (Reactjs)

Technologies

- Auto import with jsconfig (vscode client\jsconfig.json)
- Auto Sort Import (client\package.json)
- Redux and react redux (reactjs)
- React router dom (reactjs)
- Formic + yup (form control) (reactjs) + (form validation)
- Axios (HTTP Client)

## Libraries

Reactjs (client)

`npm install create-react-app`

React Router Dom

`npm install react-router-dom`

React Icons
`npm install react-icon --save`

Formic
`npm install --save formic`

Yup
`npm install --save yup`

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
|  |__ app
|  |  |__ store.js
|  |  |__ userSlice.js
|  |
|  |__ api
|  |  |__ axiosClient.js
|  |  |__ productApi.js
|  |  |__ userApi.js
|  |
|  |__ assets
|  |  |__ cores
|  |  |  |__ cores.js    // numberToCost
|  |  |__ scss
|  |  |  |__ componenets
|  |  |     |__ btn.scss
|  |  |     |__ gridLibrary.scss
|  |  |__ styles
|  |     |__ styles.js   //linkStyle
|  |
|  |__ components
|  |
|  |__ features
|  |  |__ Cart
|  |  |  |__ components
|  |  |  |__ pages
|  |  |  |__ cartSlice.js
|  |  |  |__ index.jsx
|  |  |
|  |  |__ Product
|  |     |__ components
|  |     |__ pages
|  |     |__ productSlice.js
|  |     |__ index.jsx
|  |
|  |__ App.js
|  |__ indedx.js
|  |__ jsconfig.json
|  |
server
|__ src
|  |__ controllers
|  |  |__ AuthController.js
|  |  |__ CartController.js
|  |  |__ ProductController.js
|  |
|  |__ midlewares
|  |  |__ authMidleware.js
|  |
|  |__ models
|  |  |__ products.js
|  |  |__ users.js
|  |
|  |__ cores
|  |  |__ authVerify.js    // verify acount firebase
|  |  |__ connectDb.js
|  |
|  |__ routes
|  |  |__ auth.js
|  |  |__ cart.js
|  |  |__ product.js
|  |  |__ index.js
|  |
|__ index.js
```

## Usage

- When you clone this project to your folder, you have to run this command:

`cd client && npm install`

- You have to delete git when cloning fihish, using this command:

`rmdir /S .git`

- Change Mongodb Url in file connectDb.js to your db

- Resetup env file in server folder

- env values (hidden)

```
MONGODB_URL=
REACT_APP_BASE_URL=
API_URL=

REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
```

- Verify user json file (hidden)
  serviceAccounKey.json

```
{
    "type":
    "project_id":
    "private_key_id":
    "private_key":
    "client_email":
    "client_id":
    "auth_uri":
    "token_uri":
    "auth_provider_x509_cert_url":
    "client_x509_cert_url":
  }

```

## Src

- Setup to deloy to heroku: https://www.youtube.com/watch?v=xgvLP3f2Y7k
- Create react app: https://vi.reactjs.org/docs/create-a-new-react-app.html
- Firebase : https://www.youtube.com/watch?v=302PCo3poh4&list=LL&index=3&
  t=786s
  https://github.com/firebase/firebaseui-webs
