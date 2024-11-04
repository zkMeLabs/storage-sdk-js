# zkMe Chain Storage SDK

The SDK is used to write applications that interact with the zkMe Chain Storage.

## Installation

``` shell
pnpm add @zkmelabs/storage-sdk-js

# or
yarn add @zkmelabs/storage-sdk-js

# or
npm install @zkmelabs/storage-sdk-js
```

## Getting Started

### uploadObject()

``` javascript
import { Storage } from '@zkmelabs/storage-sdk-js'

const storage = new Storage(
  'http://testnet-rpc.mechain.tech',
  5151
)

await storage.uploadObject({
  bucketName: 'Your bucket name',
  objectName: 'Your file name',
  body: fileBuffer
}, {
  type: 'ECDSA',
  privateKey: 'Your private key'
})
```


### downloadFile()

``` javascript
import { Storage } from '@zkmelabs/storage-sdk-js'

const storage = new Storage(
  'http://testnet-rpc.mechain.tech',
  5151
)

const file = await storage.downloadFile({
  bucketName: 'Your bucket name',
  objectName: 'Your file name'
}, {
  type: 'ECDSA',
  privateKey: 'Your private key'
})
```
