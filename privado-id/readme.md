# Privado ID Verifier

## Quickstart

1. Clone the repository
2. Install dependencies: `npm install`
3. Run ngrok on port 3000: `ngrok http 3000`
4. Copy `.env.example` to `.env` and set the correct environment variables:

```
VERIFIER_BACKEND_HOST=<ngrok-url-or-public-ip>
VERIFIER_BACKEND_PORT=3000
VERIFIER_BACKEND_KEY_DIR=./keys
VERIFIER_IPFS_URL=https://gateway.pinata.cloud
VERIFIER_BACKEN_AMOY_SENDER_DID=did:polygonid:polygon:amoy:2qH7TstpRRJHXNN4o49Fu9H2Qismku8hQeUxDVrjqT
VERIFIER_BACKEND_MAIN_SENDER_DID=did:polygonid:polygon:main:2q4Q7F7tM1xpwUTgWivb6TgKX3vWirsE3mqymuYjVv
VERIFIER_BACKEND_RESOLVER_SETTINGS_PATH=./resolvers_settings.yaml
VERIFIER_BACKEND_AMOY_RPC=
VERIFIER_BACKEND_MAIN_RPC=
```

Fill in `VERIFIER_BACKEND_AMOY_RPC` and `VERIFIER_BACKEND_MAIN_RPC` with your RPCs, and set `VERIFIER_BACKEND_HOST` to your ngrok URL or public IP.

5. If using Polygon mainnet, update the resolver settings in `index.ts`:

```diff
...
-const ethURL = process.env.VERIFIER_BACKEND_AMOY_RPC;
-const contractAddress = "0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124";
+const ethURL = process.env.VERIFIER_BACKEND_MAIN_RPC;
+const contractAddress = "0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D";
const keyDIR = "../keys";

const resolvers = {
-    ["polygon:amoy"]: ethStateResolver,
+    ["polygon:main"]: ethStateResolver,
};
...
```

6. Create a custom query using the Privado ID [query builder](https://tools.privado.id/query-builder). Replace the following `proofRequest` object in your code:

```javascript
const proofRequest = {
    "circuitId": "credentialAtomicQuerySigV2",
    "id": Date.now(),
    "query": {
        "allowedIssuers": [
            "*"
        ],
        "context": "ipfs://QmdH1Vu79p2NcZLFbHxzJnLuUHJiMZnBeT7SNpLaqK7k9X",
        "type": "POAP01",
        "credentialSubject": {
            "city": {
                "$eq": "mum"
            }
        }
    }
};
```

7. Run the development server: `npm run dev`

8. Open Postman and import the following API using this curl command:

```curl
curl --location 'http://localhost:3000/api/sign-in' \
--header 'Content-Type: application/json' \
--data ''
```

9. You should receive a sample response containing three options for presenting the request:
   - `request`: A JSON object with the full request details
   - `encodedURI`: An encoded version of the request
   - `shortenURL`: A shortened URL for the request

For example:

```json
{
    "request": {
        "id": "1bd5a48d-13fb-4d33-9350-48bf4b233e9a",
        "thid": "9602a13e-89a0-4ee5-8d23-1de4c5c04cf6",
        "from": "did:polygonid:polygon:amoy:2qH7TstpRRJHXNN4o49Fu9H2Qismku8hQeUxDVrjqT",
        "typ": "application/iden3comm-plain-json",
        "type": "https://iden3-communication.io/authorization/1.0/request",
        "body": {
            // ... request body ...
        }
    },
    "encodedURI": "iden3comm://?i_m=eyJpZCI6IjFiZDVhNDhkLTEzZmItNGQzMy05MzUwLTQ4YmY0YjIzM2U5YSIsInRoaWQiOiI5NjAyYTEzZS04OWEwLTRlZTUtOGQyMy0xZGU0YzVjMDRjZjYiLCJmcm9tIjoiZGlkOnBvbHlnb25pZDpwb2x5Z29uOmFtb3k6MnFIN1RzdHBSUkpIWE5ONG80OUZ1OUgyUWlzbWt1OGhRZVV4RFZyanFUIiwidHlwIjoiYXBwbGljYXRpb24vaWRlbjNjb21tLXBsYWluLWpzb24iLCJ0eXBlIjoiaHR0cHM6Ly9pZGVuMy1jb21tdW5pY2F0aW9uLmlvL2F1dGhvcml6YXRpb24vMS4wL3JlcXVlc3QiLCJib2R5Ijp7InJlYXNvbiI6InRlc3QgZmxvdyIsIm1lc3NhZ2UiOiIiLCJjYWxsYmFja1VybCI6Imh0dHBzOi8vY2RjNi00OS0zNi03MC0yNDQubmdyb2stZnJlZS5hcHAvYXBpL2NhbGxiYWNrP3Nlc3Npb25JZD05Y2NlYzE4Ni02ODg0LTQ4YTMtOGFkNi0zOTk0MWVmNjMwMGQiLCJzY29wZSI6W3siY2lyY3VpdElkIjoiY3JlZGVudGlhbEF0b21pY1F1ZXJ5U2lnVjIiLCJpZCI6MTcyODQ5MDA2NTc0NCwicXVlcnkiOnsiYWxsb3dlZElzc3VlcnMiOlsiKiJdLCJjb250ZXh0IjoiaXBmczovL1FtZEgxVnU3OXAyTmNaTEZiSHh6Sm5MdVVISmlNWm5CZVQ3U05wTGFxSzdrOVgiLCJ0eXBlIjoiUE9BUDAxIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiY2l0eSI6eyIkZXEiOiJtdW0ifX19fV19fQ==",
    "shortenURL": "iden3comm://?request_uri=https://cdc6-49-36-70-244.ngrok-free.app/r/0e560b692fbf3263"
}
```

10. Choose one of the three options to present the request to the user:
    - If using the `request` JSON object, generate a QR code from the JSON.
    - If using the `encodedURI`, generate a QR code directly from this string.
    - If using the `shortenURL` (recommended), generate a QR code from this URL.

    It is advisable to use the `shortenURL` option as the data can be bulky in the encoded and full request formats.

11. Scan the QR code using the Polygon ID mobile wallet to fulfill the presentation request.

12. After the wallet has successfully fetched and sent the proof to the callback URL with a presentation response JSON object, the `callback` function in `index.ts` will verify the presentation response.
