Table of Content
	-Library required
	-How to start
	-Endpoints


Library required
Express | Body Parser | MySQL

run 'npm install'


How to start
	-Open a intergrated terminal for server.js
	-Run Nodemon server.js or Node server.js
	-Check if console logs 'Server hosted at http://localhost:8081'



Endpoints

Endpoint 1 | /actors/{actor_id}
Return actor information of the given actor_id

Endpoint 2 | /actors?limit={limit}&offset={offset}
Return the list of actors ordered by first_name, limited to 20 records offset 0 by default.

Endpoint 3 | /actors
Add a new actor to the database (note: actors can have the same first_name and last_name)

Endpoint 4 | /actors/{actor_id}
Update actor’s first name or last name or both.

Endpoint 5 | /actors
Add a new actor to the database (note: actors can have the same first_name and last_name)

Endpoint 6 | /film_categories/{category_id}/films
Return the film_id, title, rating, release_year and length of all films belonging to a category.


Endpoint 7 | /customer /{customer_id}/payment
Return the payment detail of a customer between the provided period.

Endpoint 8 | /customers
Add a new customer to the database (note: customer’s email address is unique)