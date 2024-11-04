export const storageAbiMin = [{
  "inputs": [
    {
      "internalType": "string",
      "name": "bucketName",
      "type": "string"
    }
  ],
  "name": "headBucket",
  "outputs": [
    {
      "components": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "bucketName",
          "type": "string"
        },
        {
          "internalType": "enum VisibilityType",
          "name": "visibility",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "enum SourceType",
          "name": "sourceType",
          "type": "uint8"
        },
        {
          "internalType": "int64",
          "name": "createAt",
          "type": "int64"
        },
        {
          "internalType": "address",
          "name": "paymentAddress",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "globalVirtualGroupFamilyId",
          "type": "uint32"
        },
        {
          "internalType": "uint64",
          "name": "chargedReadQuota",
          "type": "uint64"
        },
        {
          "internalType": "enum BucketStatus",
          "name": "bucketStatus",
          "type": "uint8"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "key",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "value",
              "type": "string"
            }
          ],
          "internalType": "struct Tag[]",
          "name": "tags",
          "type": "tuple[]"
        },
        {
          "internalType": "bool",
          "name": "spAsDelegatedAgentDisabled",
          "type": "bool"
        }
      ],
      "internalType": "struct BucketInfo",
      "name": "bucketInfo",
      "type": "tuple"
    },
    {
      "components": [
        {
          "internalType": "bool",
          "name": "IsRateLimited",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "FlowRateLimit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "CurrentFlowRate",
          "type": "uint256"
        }
      ],
      "internalType": "struct BucketExtraInfo",
      "name": "bucketExtraInfo",
      "type": "tuple"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}]

export const virtualGroupAbiMin = [{
  "inputs": [
    {
      "internalType": "uint32",
      "name": "familyId",
      "type": "uint32"
    }
  ],
  "name": "globalVirtualGroupFamily",
  "outputs": [
    {
      "components": [
        {
          "internalType": "uint32",
          "name": "id",
          "type": "uint32"
        },
        {
          "internalType": "uint32",
          "name": "primarySpId",
          "type": "uint32"
        },
        {
          "internalType": "uint32[]",
          "name": "globalVirtualGroupIds",
          "type": "uint32[]"
        },
        {
          "internalType": "address",
          "name": "virtualPaymentAddress",
          "type": "address"
        }
      ],
      "internalType": "struct GlobalVirtualGroupFamily",
      "name": "gvgfamily",
      "type": "tuple"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}]

export const spAbiMin = [{
  "inputs": [
    {
      "components": [
        {
          "internalType": "bytes",
          "name": "key",
          "type": "bytes"
        },
        {
          "internalType": "uint64",
          "name": "offset",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "limit",
          "type": "uint64"
        },
        {
          "internalType": "bool",
          "name": "countTotal",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "reverse",
          "type": "bool"
        }
      ],
      "internalType": "struct PageRequest",
      "name": "pagination",
      "type": "tuple"
    }
  ],
  "name": "storageProviders",
  "outputs": [
    {
      "components": [
        {
          "internalType": "uint32",
          "name": "id",
          "type": "uint32"
        },
        {
          "internalType": "string",
          "name": "operator_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "funding_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "seal_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "approval_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "gc_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "maintenance_address",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "total_deposit",
          "type": "uint256"
        },
        {
          "internalType": "enum Status",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "endpoint",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "moniker",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "identity",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "website",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "security_contact",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "details",
              "type": "string"
            }
          ],
          "internalType": "struct Description",
          "name": "description",
          "type": "tuple"
        },
        {
          "internalType": "string",
          "name": "bls_key",
          "type": "string"
        }
      ],
      "internalType": "struct StorageProvider[]",
      "name": "storageProviders",
      "type": "tuple[]"
    },
    {
      "components": [
        {
          "internalType": "bytes",
          "name": "nextKey",
          "type": "bytes"
        },
        {
          "internalType": "uint64",
          "name": "total",
          "type": "uint64"
        }
      ],
      "internalType": "struct PageResponse",
      "name": "pageResponse",
      "type": "tuple"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}]
