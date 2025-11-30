CREATE TABLE IF NOT EXISTS "Order" (
    "orderId" VARCHAR(255) PRIMARY KEY,
    "value" DECIMAL(15, 2) NOT NULL,
    "creationDate" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Items" (
    id SERIAL PRIMARY KEY,
    "orderId" VARCHAR(255) NOT NULL,
    "productId" INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_items_orderid ON "Items"("orderId");
CREATE INDEX IF NOT EXISTS idx_order_creationdate ON "Order"("creationDate");

