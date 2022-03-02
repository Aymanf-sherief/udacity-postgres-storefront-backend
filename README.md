# Simple storefront API

## Description

This is a simple storefront API 

## How to run 

1. make sure you have installed the latest LTS version of Node, And installed typescript globally.
2. install yarn globally by running `npm install -g yarn`
3. in the root directory (same dir as `package.json`), run `yarn install`
4. install yarn globally by running `npm install -g db-migrate`
5. create two databases in you postgresql server (for dev and test), and replace the values in .env.example with your own, name the new file `.env`
6. run `db-migrate up` to create the tables in the dev database
7. upon success, you should be able to run tests by first navigating to the tests directory, removing the x in `xdescribe` in the desired test suite, and then running `yarn test`. remember that running two test suites at the same time will result in issues in the test database.
8. if the tests passed, you can begin running the server by running `yarn wath`
9. you should see a message logged to the terminal stating that the server has started and is running on a specified port.
10. once the server is running, you can start accessing endoints (descriped below)
   

## Endpoints

1. ### Products
   1. List all products: `GET /products`
   2. get a specific product: `GET /products/:id`
   3. create a product: `POST /products` (requires auth token)

1. ### Users
   1. List all users: `GET /users` (requires auth token)
   2. get a specific user: `GET /users/:id` (requires auth token)
   3. create a user: `POST /users` (requires auth token)

1. ### Orders
   1. Get current user order: `GET /orders/currentUserOrder` (requires auth token)
   2. create an order user: `POST /orders` (requires auth token) 
## Scripts
1. `test`: set up test database and run tests
2. `watch`: start server and watch files on changes
3. `start`: start server
4. `tsc`: run typescript compiler to check and build project
5. `prettify`: apply `prettier` to all typescript files, if you're running this in a linux environment you will need to change the double backslashes in the command with single forward slashes. so it becomes `prettier **/*.ts --write`
6. `lint`: lints all typescript files using `eslint`, if you're running this in a linux environment you will need to change the double backslashes in the command with single forward slashes. so it becomes `./node_modules/.bin/eslint **/*.ts`
   
## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- name
- email
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (prending or complete)

