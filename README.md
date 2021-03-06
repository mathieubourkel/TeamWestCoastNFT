## Link to access the app

https://team-west-coast-nft.vercel.app/

## Scripts of this Dapp

### Install dependencies

```sh
npm run start
```

### Deploy smart contracts

```sh
npx hardhat run scripts/deploy.js --network ganache
```

You can choose others networks than Ganache

### Launch dapp
To launch a server that serves the dapp, just run : 

```sh
npm run start
```

### Unit tests
To run unit tests, follow these steps : 

1) run a local blockcchain with the following command 

```sh
ganache-cli
```

2) Take the 3 first private keys that ganache provide and write them in the _.env_ file (PRIVATE_KEY_GANACHE1, ...)

3) Run the following test command : 

```
npx hardhat test --network ganache
```

That's it !

### TEST RESULTS

<a href="https://ibb.co/jH2Xg0T">
    <img src="https://i.ibb.co/rvSr48m/unit-test-nft.png" alt="unit-test-nft" border="0">
</a>




# Authors

 * Mathieu Bourkel  ; Front
 * Gilles Bruno ; Smart contracts et tests
 * Grégory Seiller ; Infra, ERC1155, gestion des collections 
