# Guestlist Server

This is a simple example server that returns a list of guests.

## Usage

In order to run this service locally you can run:

    npm start

The server will have an error at runtime if you have not created a key pair. In order to create a key pair run the following commands:

    ssh-keygen -t rsa -b 2048 -m PEM -f id_rsa
    openssl rsa -in id_rsa -pubout -outform PEM -out id_rsa.pub

When prompted for a passphrase make sure to leave it blank.

If you are running in docker you can supply the private and public key using the `TOKEN_PRIVATE_KEY` and `TOKEN_PUBLIC_KEY` environment variables.
