Objective:
Build an Order Service that allows users to place orders, view orders, update status, and admin can view all orders.

🏗 Microservice Flow

1. User (Logged-in) can:
   Place an Order → (POST /orders)

View Own Orders → (GET /orders)

View Single Order by ID → (GET /orders/:id)

2. Admin can:
   View All Orders → (GET /admin/orders)

Update Order Status → (PUT /orders/:id)

Requirements:

| Feature                            | Details                                                                                                    |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Order Schema**                   | userId, items (array of productId & quantity), totalPrice, status (Pending, Shipped, Delivered), createdAt |
| **Verify Token Middleware**        | From Auth Service                                                                                          |
| **Role-based Access Middleware**   | For admin routes                                                                                           |
| **Product Service Communication**  | When placing an order, **call product-service to validate products & get price**                           |
| **Order Status Update**            | Only Admin can update status                                                                               |
| **User can only see their orders** | Orders fetched by `userId` from token                                                                      |
| **Admin can see all orders**       | No filter, fetch all orders                                                                                |
| **Use MongoDB**                    | Mongoose Models                                                                                            |
| **Error Handling**                 | 400/401/403/500 Responses                                                                                  |
| **Environment Variables**          | DB_URL, JWT_SECRET, PRODUCT_SERVICE_URL                                                                    |

Set up Project Structure

Create Order Model

Implement routes/controllers:

POST /orders

GET /orders

GET /orders/:id

GET /admin/orders

PUT /orders/:id (Update status)

In POST /orders, call Product Service to validate products & fetch price.

Add verifyToken middleware.

Add verifyAdmin middleware.

Test all endpoints in Postman.

Document the API endpoints
