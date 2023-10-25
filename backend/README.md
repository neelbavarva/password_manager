# Password API

This API manages passwords and provides encryption and decryption of sensitive information.

## Endpoints

### Encryption and Decryption

This API uses the AES-256-CBC encryption algorithm to secure sensitive information. The following endpoints allow for encryption and decryption using a provided key:

- `POST /decryptPassword`
  - Decrypt a password using a decryption key.
  - Requires the following parameters in the request body:
    - `password`: Encrypted password.
    - `key`: Decryption key.
  - Returns the decrypted password.

- `POST /newPassword`
  - Create a new password record in the database with encryption.
  - Requires the following parameters in the request body:
    - `name`: Password name.
    - `email`: Email associated with the password.
    - `category`: Category of the password.
    - `password`: Encrypted password.
    - `archive`: Boolean flag for archiving the password.
  - Returns the newly created password record.

### GET Routes

- `GET /getAllPasswords`
  - Retrieve all password records from the database.
  - Returns a list of password records.

- `GET /getPasswords`
  - Retrieve all non-archived password records from the database.
  - Returns a list of non-archived password records.

- `GET /getArchivePasswords`
  - Retrieve all archived password records from the database.
  - Returns a list of archived password records.

- `GET /getNonBankingPasswords`
  - Retrieve all non-archived password records with categories such as 'web-app,' 'email,' or 'other.'
  - Returns a list of non-archived non-banking password records.

- `GET /getNonBankingArchivePasswords`
  - Retrieve all archived password records with categories such as 'web-app,' 'email,' or 'other.'
  - Returns a list of archived non-banking password records.

- `GET /getBankingPasswords`
  - Retrieve all non-archived banking password records.
  - Returns a list of non-archived banking password records.

- `GET /getBankingArchivePasswords`
  - Retrieve all archived banking password records.
  - Returns a list of archived banking password records.

- `GET /:id`
  - Retrieve a specific password record by its ID.
  - Requires specifying the ID as a parameter.
  - Returns the password record associated with the provided ID.

### PUT Route

- `PUT /editPassword`
  - Update an existing password record by its ID.
  - Requires the following parameters in the request body:
    - `id`: ID of the password record to be updated.
    - `name`: Updated password name.
    - `email`: Updated email.
    - `password`: Updated password (without encryption).
    - `category`: Updated category.
    - `archive`: Updated archive status.
  - Returns the updated password record.

### DELETE Route

- `DELETE /deletePassword/:id`
  - Delete a specific password record by its ID.
  - Requires specifying the ID as a parameter.
  - Returns a message confirming the deletion of the password record.

## Important Notes

- Sensitive information (passwords) is encrypted using the AES-256-CBC encryption algorithm.
- Decryption can be performed using the `/decryptPassword` endpoint with the appropriate key.
- Make sure to securely manage the decryption key to access sensitive password information.




# Card API

This API manages card data, providing encryption and decryption of sensitive information.

## Endpoints

### GET `/getCards`

- Retrieve all card records from the database.
- Returns a list of card records.

### GET `/getCards/:id`

- Retrieve a specific card record by its ID.
- Requires specifying the ID as a parameter.
- Returns the card record associated with the provided ID.

### POST `/newCard`

- Create a new card record in the database.
- Requires the following parameters in the request body:
  - `bankName`: Name of the bank.
  - `cardName`: Name of the card.
  - `number`: Card number.
  - `validTill`: Expiry date
