# RESERVAS-API
## Endpoints
Nota: La anotación [AUTH] para los endpoint advierte que se requiere pada por cabecera el bearer token que se obtiene del endpoint "/api/auth/login"
### /api/auth/login [POST]
Permite entregar las credenciales del usuario del sistema y retorna el JWT.
```json
{
    "email": "donovan@gmail.com",
    "password": "1234"
}
```

### /api/user [GET|POST]
POST: Permite crear usuarios del sistema
```json
{
    "email":"juan@gmail.com",
    "name":"Juan Ticona", // fullname
    "password":"juan"
}
```
GET: Retorna una lista con los datos de los usuarios del sistema

### /api/client [GET|POST][AUTH]
POST: Permite crear clientes para el sistema
```json
{
    "name": "Shaquille O'Neal",
    "document": "83746582",
    "documentType": "dni"
}
```
GET: Retorna una lista con todos los cliente del sistema

### /api/room [GET|POST][AUTH]
POST: Permite crear habitaciones para el sistema
```json
{
    "number": "401", //numero de la habitación
    "bedsQuantity": 2 //cantidad de camas en la habitación
}
```
GET: Retorna una lista con todas las habitaciones del sistema

### /api/reservation [GET|POST][AUTH]
POST: Permite crear una reserva en el sistema
```json
{
    "reservation": {
        "state": "pendiente", // state: [eliminado|pagado|pendiente]
        "dateCheckIn": "2023-01-26", // fecha del checkIn
        "dateCheckOut": "2023-01-30", // fecha del checkOut
        "pay": {
            "quantity": 250.5 // monto a pagar
        },
        "rooms": [1,2] // id de las habitaciones reservadas
    },
    "client": {
        "id": 2
    }
}
```
GET: Retorna una lista con las reservas de todos los cliente en un plazo de 7 días a partir de la fecha actual

### /api/reservation/pendiente [GET][AUTH]
Retorna una lsita con las reservas de todos los cliente en un plazo de 7 días a partir de la fecha actual y con el estado "pendiente"

### /api/reservation/pay [POST][AUTH]
POST: Permite pagar una reserva en el sistema
```json
{
    "id": 3,
    "pay": {
        "method": "transferencia", // method: [efectivo|transferencia]
        "operationNumber": "0854963"
    }
}
```

### /api/reservation/freerooms [POST][AUTH]
POST: Permite listar las habitación que estan libres entre dos fechas establecidas
```json
{
    "since": "2023-01-25",
    "until": "2023-01-28"
}
```