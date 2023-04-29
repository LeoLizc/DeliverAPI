# Flujo de aplicación 

## Cliente
1. ~~Un usuario abre la aplicación.~~

2. El usuario realiza su registro usando correo electrónico, nombre(s), contraseña, numero de celular, dirección, y eligiendo la opción “cliente”.
  - POST - /users/signup

3. El usuario inicia sesión con su correo electrónico y contraseña.
  - POST - /users/login

4. El usuario busca el restaurante al que desea pedir, sea usando los filtros de categoría, realizando una búsqueda del nombre del restaurante, ambas o ninguna de estas. Los restaurantes se encuentran ordenados según la popularidad del restaurante.
  - /restaurans?name?&category?

5. El usuario entra a la pagina del restaurante donde encuentra los productos separados por las categorías del restaurante.
  - /retaurants/:id/products?category?
  - /products?restaurant_id?

6. El usuario crea su pedido agregando los productos que desea y las cantidades que desea.
  - POST - /orders

7. El usuario termina de crear su pedido, y se dirige a enviar el pedido, donde encuentra un resumen de todo el pedido, incluyendo el total monetario a pagar por todos los productos.
  - resultado del POST
  - /orders/:id

8. El usuario envía el pedido.
  - PATCH - /orders/:id/status

9. ~~El usuario es informado cuando su pedido es aceptado por otro usuario, quien le llevara el
pedido.~~

10. ~~El usuario es informado cuando el segundo usuario recibe el pedido en el restaurante.~~

11. ~~El usuario es informado cuando el segundo usuario llegó a la dirección de envío.~~

12. ~~El usuario es informado cuando el segundo usuario entregó el pedido.
Flujo de aplicación~~
___

## Domiciliario
1. ~~Un usuario abre la aplicación.~~

2. El usuario realiza su registro usando correo electrónico, nombre(s), contraseña, numero de celular, dirección, y eligiendo la opción “domiciliario”.
  - POST - /users/signup

3. El usuario inicia sesión con su correo electrónico y contraseña.
  - POST - /users/login

4. El usuario encuentra los pedidos enviados por otros usuarios, con opción de ordenarlos según distancia del usuario al restaurante, distancia del restaurante al cliente, o vejez del pedido.
  - /orders/sent?order_by?["user_distance", "restaurant_distance", "age"]

5. El usuario selecciona un pedido y lo acepta.
  - PATCH - /orders/:id/status

6. ~~El usuario se dirige al restaurante.~~

7. ~~El usuario espera los productos del pedido.~~

8. ~~El usuario recibe todos los productos.~~
  - PATCH - /orders/:id/status

9. El usuario se dirige a la dirección del cliente y marca el pedido como en dirección.
  - PATCH - /orders/:id/status

10. El usuario realiza la entrega del pedido, y marca el pedido como realizado.
Flujo de aplicación
  - PATCH - /orders/:id/status
___

## Administrador
1. ~~Un usuario abre la aplicación.~~

2. El usuario realiza su registro usando correo electrónico, nombre(s), contraseña, numero de celular, dirección, y eligiendo la opción “administrador de restaurante”.
  - POST - /users/signup

3. El usuario inicia sesión con su correo electrónico y contraseña.
  - POST - /users/signin

4. El usuario realiza el registro de un restaurante usando nombre, dirección, y categoría.
  - POST - /restaurants

5. El usuario agrega productos al inventario del restaurante usando nombre, descripción, categoría, y precio.
  - POST - /restaurants/:id/products
  - POST - /products {restaurant!}

6. Adicionalmente, puede ver el inventario del restaurante, y agregar/modificar/eliminar los productos.
  - [PATCH/DELETE/GET/POST] /products/:id?
  - [GET/POST] /restaurants/:id/products

7. El usuario puede ver los pedidos en curso del restaurante, o los pedidos realizados este día/semana/mes.
  - /restaurants/:id/orders?status?period?
  - /orders?restaurant_id?status?period?

8. El usuario, al recibir un pedido, prepara los productos, los entrega al domiciliario y marca el pedido como recibido.
  - PATCH - /orders/:id/status

