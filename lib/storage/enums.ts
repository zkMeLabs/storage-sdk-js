/** VisibilityType is the resources public status. */
export enum VisibilityType {
  VISIBILITY_TYPE_UNSPECIFIED = 0,
  VISIBILITY_TYPE_PUBLIC_READ = 1,
  VISIBILITY_TYPE_PRIVATE = 2,
  /** VISIBILITY_TYPE_INHERIT - If the bucket Visibility is inherit, it's finally set to private. If the object Visibility is inherit, it's the same as bucket. */
  VISIBILITY_TYPE_INHERIT = 3,
  UNRECOGNIZED = -1
}

export enum SpStatus {
  STATUS_IN_SERVICE = 0,
  STATUS_IN_JAILED = 1,
  STATUS_GRACEFUL_EXITING = 2,
  STATUS_IN_MAINTENANCE = 3,
  STATUS_FORCED_EXITING = 4,
  UNRECOGNIZED = -1
}

export enum ExceptionMessage {
  NoSuchBucket = 'No such bucket'
}
