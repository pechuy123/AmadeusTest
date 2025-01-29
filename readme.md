# API Documentation

## Overview
This API provides functionalities for handling user authentication and fetching flight information. It includes endpoints for logging in, retrieving access tokens, and fetching flight offers.

## Endpoints

### 1. Login Request
**Description:** Handles the login request by receiving an object from the client, fetching an access token, and returning the received object along with the token in the response.

**Method:** `POST`

This method handles credentials from `.env` file
```env
CLIENT_ID=***
CLIENT_SECRET=***
```

**Response:**
```json
{
  "user": { "username": "string" },
  "accessToken": "string"
}
```

**Returns:** A JSON response containing the received object and the access token.

---

### 2. Fetch Flight Offers
**Description:** Fetches flight information based on the provided parameters and authorization token.

**Method:** `GET`

**Request Parameters:**
- `origin` (string) - The departure location.
- `destination` (string) - The arrival location.
- `date` (string) - The travel date.

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**
```json
{
  "flights": [
    {
      "flightNumber": "string",
      "departureTime": "string",
      "arrivalTime": "string",
      "price": "number"
    }
  ]
}
```

**Returns:** A JSON response containing flight offer details.

**Errors:**
- Throws an error if the request to fetch flight offers fails.

---

### 3. Retrieve Access Token
**Description:** Retrieves an access token using the client credentials grant type.

**Method:** `POST`

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "expiresIn": "number"
}
```

**Returns:** A JSON object containing the access token.

**Errors:**
- Throws an error if the request to fetch the access token fails.

