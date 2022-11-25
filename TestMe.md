# TestMe

## Instructions to run Backend

After cloning the repository, make sure you have NodeJS installed.
Open the project in the terminal and run `npm i`, this will download all the required packages.
In the root folder of the project create a `.env` file and populate it with the required values

```
MONGO_USER=<MONGO_ATLAS_USER>
MONGO_PASSWORD=<MONGO_ATLAS_PASSWORD>
```

**Note: For right now you can use user and password as undefined**

Finally run `npm start` to start the application on port 3000.

## Instructions to run Frontend

After cloning the repository, make sure you have NodeJS installed.
Open the project in the terminal and run `npm i`, this will download all the required packages.
In the root folder of the project create a `.env` file and populate it with the required values

```
REACT_APP_BACKEND=<BACKEND_URI>
REACT_APP_CLIENTID=<GOOGLE_OAUTH_CLIENTID>
```

Finally run `npm start` to start the application on port 3000.

<hr />

**Note: Port number of the Frontend and the Backend are same. If they are running on same server make sure to change port of either of those.**
