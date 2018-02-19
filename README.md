# Sample auth app
* CRUD _(for user model)_
* Keeps _user id_ and _token_ in session
* Uses **bcrypt**
* Uses **express** + **mongodb**
* As simple as possible

> Check out the web site link above


# Run
```bash
git clone https://github.com/kofon95/nodejs-auth-example YOUR_DIR
cd !$
MONGODB_URI=mongodb://localhost/YOUR_DB_NAME npm run start
# or pass in the port as a number (default 3000)
MONGODB_URI=mongodb://localhost/YOUR_DB_NAME PORT=3000 npm run start
```
