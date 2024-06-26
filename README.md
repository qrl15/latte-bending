[![End-to-end tests](https://github.com/qrl15/latte-bending/actions/workflows/ci.yml/badge.svg?branch=latte-reference)](https://github.com/qrl15/latte-bending/actions/workflows/ci.yml)
Requires Node v16+

```
$ node -v
v16.17.0
$ npm install
```

## Run

To start the application if you are using Node v16 use `npm start` command. If you are using Node v17+ use `npm run start-18` command (because of this [SSL error](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)).

In both cases, it should print

```
Compiled successfully!

You can now view taste-the-sauce in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.0.0.188:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Open the browser and point at `localhost:3000`, you should see the login page.

The original web application was forked from [saucelabs/sample-app-web](https://github.com/saucelabs/sample-app-web) repo.
