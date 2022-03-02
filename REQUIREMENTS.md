# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

Note that upon creating a new user you'll get a JWT token that you should use in an auth header for all requests that require a token
#### Products
- Index  `GET /products`
- Show `GET /products/:id`
- Create `POST /products` [token required]

#### Users
- Index  `GET /users`  [token required]
- Show  `GET /users/:id`  [token required]
- Create `POST /users` 

#### Orders
- Current Order by user `GET /orders/currentUserOrder` [token required]
- Create a new order `POST /orders`
## Data Shapes
#### Product
-  id: number
- name: string
- price: number

#### User
- id: number
- name: string
- email: string
- password: string (write only)
- token: string (read only)

#### Orders
- id: number
- products : number[]
- quantities : number
- user_id: number
- status of order (pending or complete): string

