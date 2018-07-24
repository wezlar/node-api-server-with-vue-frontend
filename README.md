# Gomo Dev Test
To run this nodejs, Vue and Sqlite application, you will need to...
## Server and API
Navigate to the main directory and run
```
npm install
```
If you need to run the migration script to make sure the database is up to date, run
```
node scripts/migrate.js up
```
You can then run the server with
```
node server
```
The API should be accessible via http://localhost:3128/
## Front end
Navigate to the frontend directory and run
```
npm install
```
To run the application,
```
npm run dev
```
Your application should be running on http://localhost:8080/

## Future development
Due to the time constraints on this project, I have left out various items. They are as follows:
* Unit testing
* SQL Santisation to prevent SQL injection
* Full SCSS Style and responsive code. The basics are there at the moment.
* SCSS/SASS is installed, but I could have made use of variables across components
* 404 pages are not active.
* Also, as mentioned in the Dev Test instructions, usernames and passwords could be added to make this more secure, allowing us to create an access token for the API.
* There are other packages which would allow better development, like the ability to restart the server when changes are detected.

Refactoring this code would be useful at this point to tidy up components and to remove any unwanted files left over from the initial build help.
