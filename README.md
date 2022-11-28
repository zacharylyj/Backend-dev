<!-- omit in toc -->
# Table of Content

- [Library required](#library-required)
- [How to start](#how-to-start)
- [Endpoints](#endpoints)

# Library required

Express | Body Parser | MySQL

```
npm install
```

# How to start

- Open a intergrated terminal for server.js
- Run `Nodemon server.js` or `Node server.js`
- Check if console logs `'Server hosted at http://localhost:8081/actors'`

# Endpoints

<h4> Endpoint 1 | /actors/{actor_id} </h4>

- Return actor information of the given `actor_id`

<h4> Endpoint 3 | /actors?limit={limit}&offset={offset} </h4>

- Return the list of actors ordered by `first_name`, limited to 20 records offset 0 by default
