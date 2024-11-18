import { Contract, JsonRpcProvider } from 'ethers';
import { STORAGE_ADDRESS, VIRTUAL_GROUP_ADDRESS, SP_ADDRESS, EMPTY_STRING_SHA256, HTTP_HEADER_CONTENT_SHA256, HTTP_HEADER_GNFD_DATE, HTTP_HEADER_GNFD_EXPIRY_TIMESTAMP } from '../constants';
import { formatErrorMessage, getAuthorization } from '../utils'

import type { AuthType, ECDSA, EDDSA, StorageProvider, UploadParams } from './types';
import { ExceptionMessage } from './enums';
import { spAbiMin, storageAbiMin, virtualGroupAbiMin } from './abi';

export type { AuthType, ECDSA, EDDSA, StorageProvider, UploadParams }
export { ExceptionMessage, STORAGE_ADDRESS, VIRTUAL_GROUP_ADDRESS, SP_ADDRESS }

export class Storage {
  #storageContract: Contract
  #virtualGroupContract: Contract
  #spContract: Contract
  #provider: JsonRpcProvider

  get storageContract() {
    return this.#storageContract
  }

  get virtualGroupContract () {
    return this.#virtualGroupContract
  }

  get spContract() {
    return this.#spContract
  }

  get provider() {
    return this.#provider
  }

  constructor(
    rpcUrl: string,
    chainId: number | string | bigint,
    options?: {
      storageAddress?: string
      virtualGroupAddress?: string
      spAddress?: string
    }
  ) {
    this.#provider = new JsonRpcProvider(
      rpcUrl,
      Number(chainId),
      {
        staticNetwork: true
      }
    )
    this.#storageContract = new Contract(
      options?.storageAddress || STORAGE_ADDRESS,
      storageAbiMin,
      this.#provider
    )
    this.#virtualGroupContract = new Contract(
      options?.virtualGroupAddress || VIRTUAL_GROUP_ADDRESS,
      virtualGroupAbiMin,
      this.#provider
    )
    this.#spContract = new Contract(
      options?.spAddress || SP_ADDRESS,
      spAbiMin,
      this.#provider
    )
  }

  async uploadObject(params: UploadParams, authType: AuthType) {
    const { bucketName, objectName, body } = params
    let { endpoint } = params?.options || {}

    if (!endpoint) {
      endpoint = await this.getSpUrlByBucket(bucketName)
    }
    const url = new URL(`${bucketName}/${objectName}`, endpoint)

    if (authType.type === 'ECDSA') {
      const {
        currentDate,
        expiryTimestamp,
        authorization
      } = this.signWithECDSA(bucketName, objectName, url.host, authType)

      return fetch(url.toString(), {
        method: 'PUT',
        headers: {
          'Authorization': authorization,
          'Content-Type': 'application/octet-stream',
          [HTTP_HEADER_CONTENT_SHA256]: EMPTY_STRING_SHA256,
          [HTTP_HEADER_GNFD_DATE]: currentDate,
          [HTTP_HEADER_GNFD_EXPIRY_TIMESTAMP]: expiryTimestamp,
        },
        body
      })
        .then(async res => {
          if (res.ok) {
            try {
              return await res.json()
            } catch {
              return res.status
            }
          } else {
            throw new Error(`${res.status} ${res.statusText}`)
          }
        })
    }
  }

  async downloadFile(bucketName: string, objectName: string, authType: AuthType) {
    const endpoint = await this.getSpUrlByBucket(bucketName)
    const url = new URL(`${bucketName}/${objectName}`, endpoint)

    if (authType.type === 'ECDSA') {
      const {
        authorization
      } = this.signWithECDSA(bucketName, objectName, url.host, authType)

      return fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': authorization
        }
      })
        .then(res => {
          if (res.ok) {
            return res.arrayBuffer()
          } else {
            throw new Error(`${res.status} ${res.statusText}`)
          }
        })
    } else {
      throw new Error('EDDSA is not currently supported.')
    }
  }

  signWithECDSA(bucketName: string, objectName: string, spHost: string, authType: ECDSA) {
    const currentDate = new Date()
    const expiryTimestamp = new Date(currentDate.getTime() + 1000 * 1000).toISOString();
    const canonicalRequest = [
      'PUT',
      '/' + bucketName + '/' + objectName,
      '',
      'content-type:' + 'application/octet-stream',
      HTTP_HEADER_CONTENT_SHA256 + ':' + EMPTY_STRING_SHA256,
      HTTP_HEADER_GNFD_DATE + ':' + currentDate.toISOString(),
      HTTP_HEADER_GNFD_EXPIRY_TIMESTAMP + ':' + expiryTimestamp,
      spHost,
      '',
      'content-type;x-gnfd-content-sha256;x-gnfd-date;x-gnfd-expiry-timestamp',
    ].join('\n')

    const authorization = getAuthorization(canonicalRequest, authType)

    return {
      currentDate: currentDate.toISOString(),
      expiryTimestamp,
      authorization
    }
  }

  async getSpUrlByBucket(bucketName: string) {
    try {
      const [bucketInfo] = await this.#storageContract.headBucket(bucketName)
      if (!bucketInfo) {
        throw new Error('Get bucket info error')
      }
      const gvgfamily = await this.#virtualGroupContract.globalVirtualGroupFamily(
        bucketInfo.globalVirtualGroupFamilyId
      )
      const spList = await this.getStorageProviders()
      return spList.filter((sp) => sp.id === gvgfamily.primarySpId)[0].endpoint;
    } catch (error: any) {
      const errMsg = formatErrorMessage(error)
      if (errMsg.includes(ExceptionMessage.NoSuchBucket)) {
        throw new Error(ExceptionMessage.NoSuchBucket)
      }
      throw new Error(errMsg)
    }
  }

  async getStorageProviders(): Promise<StorageProvider[]> {
    const pageRequest = {
      key: '0x00',
      offset: 0,
      limit: 100,
      countTotal: true,
      reverse: false,
    };
    const [sps] = await this.#spContract.storageProviders(pageRequest)
    return sps.map((_sp: any) => {
      const sp = _sp.toObject(true)
      return {
        ...sp,
        status: Number(sp.status)
      }
    })
  }

  // async listbuckets() {
  //   const pageRequest = {
  //     key: '0x00',
  //     offset: 0,
  //     limit: 100,
  //     countTotal: false,
  //     reverse: false,
  //   };

  //   const [buckets, pageResponse] = await this.#storageContract.listBuckets(pageRequest);
  //   // console.log('buckets', buckets.toObject(true));
  //   for (const bucket of buckets) {
  //     console.log('bucket', bucket.toObject(true));
  //   }
  //   console.log('pageResponse:', pageResponse.toObject(true));
  // }
}
