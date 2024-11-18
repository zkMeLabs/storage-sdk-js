import type { SpStatus } from './enums'

/** StorageProvider defines the meta info of storage provider */
export interface StorageProvider {
  /** id is the identifier of the storage provider, used in virtual group */
  id: number;
  /** operator_address defines the account address of the storage provider's operator; It also is the unique index key of sp. */
  operator_address: string;
  /** endpoint define the storage provider's network service address */
  endpoint: string;
  /** funding_address defines one of the storage provider's accounts which is used to deposit and reward. */
  funding_address: string;
  /** seal_address defines one of the storage provider's accounts which is used to SealObject */
  seal_address: string;
  /** approval_address defines one of the storage provider's accounts which is used to approve use's createBucket/createObject request */
  approval_address: string;
  /** gc_address defines one of the storage provider's accounts which is used for gc purpose. */
  gc_address: string;
  /** maintenance_address defines one of the storage provider's accounts which is used for testing while in maintenance mode */
  maintenance_address: string;
  /** total_deposit defines the number of tokens deposited by this storage provider for staking. */
  total_deposit: bigint;
  /** status defines the current service status of this storage provider */
  status: SpStatus;
  /** description defines the description terms for the storage provider. */
  description: SpDescription;
  /** bls_key defines the bls pub key of the Storage provider for sealing object and completing migration */
  bls_key: string;
}

/** Description defines a storage provider description. */
export interface SpDescription {
  /** moniker defines a human-readable name for the storage provider */
  moniker: string;
  /** identity defines an optional identity signature (ex. UPort or Keybase). */
  identity: string;
  /** website defines an optional website link. */
  website: string;
  /** security_contact defines an optional email for security contact. */
  securityContact: string;
  /** details define other optional details. */
  details: string;
}

// export interface OnProgressEvent {
//   direction: string;
//   percent: number;
//   total: number;
//   loaded: number;
// }

// export type OnProgress = (event: OnProgressEvent) => void;

// export interface ResumableOpts {
//   disableResumable: boolean
//   partSize?: number
// }

export interface UploadParams {
  bucketName: string
  objectName: string
  body: File | Buffer
  // visibility: VisibilityType
  options?: {
    // isUpdate?: boolean
    endpoint?: string
    // timeout?: number
    // contentType?: string
    // resumableOpts?: ResumableOpts
    // onProgress?: OnProgress
  }
}

export interface DownloadParams {
  bucketName: string
  objectName: string
}

export type ECDSA = {
  type: 'ECDSA';
  privateKey: string;
}

export type EDDSA = {
  type: 'EDDSA';
  seed: string;
  domain: string;
  address: string;
}

export type AuthType = ECDSA | EDDSA;
