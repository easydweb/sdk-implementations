
<p align="center">
  <img src="https://public.etherspot.io/assets/etherspot.gif" alt="Etherspot Logo" width= 150 height=150>
</p>

[Account Abstraction on Rootstock]()

# Etherspot Prime SDK!

### Step 1. Install Etherspot Prime SDK with this command

``` sh
yarn add @etherspot/prime-sdk
```


### Step 2. Import the Etherspot Prime SDK.

```
  const primeSdk = new PrimeSdk(
    { privateKey: process.env.WALLET_PRIVATE_KEY }, 
    { 
      chainId: Number(process.env.CHAIN_ID), 
    },
  );
```