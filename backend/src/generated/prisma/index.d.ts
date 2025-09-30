
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model RoomParticipation
 * 
 */
export type RoomParticipation = $Result.DefaultSelection<Prisma.$RoomParticipationPayload>
/**
 * Model Schedule
 * 
 */
export type Schedule = $Result.DefaultSelection<Prisma.$SchedulePayload>
/**
 * Model TimeLog
 * 
 */
export type TimeLog = $Result.DefaultSelection<Prisma.$TimeLogPayload>
/**
 * Model Friend
 * 
 */
export type Friend = $Result.DefaultSelection<Prisma.$FriendPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model RoomInvite
 * 
 */
export type RoomInvite = $Result.DefaultSelection<Prisma.$RoomInvitePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RoomInviteStatus: {
  pending: 'pending',
  accepted: 'accepted',
  declined: 'declined'
};

export type RoomInviteStatus = (typeof RoomInviteStatus)[keyof typeof RoomInviteStatus]


export const FriendStatus: {
  pending: 'pending',
  accepted: 'accepted'
};

export type FriendStatus = (typeof FriendStatus)[keyof typeof FriendStatus]


export const ScheduleStatus: {
  대기중: '대기중',
  진행중: '진행중',
  완료: '완료',
  취소: '취소'
};

export type ScheduleStatus = (typeof ScheduleStatus)[keyof typeof ScheduleStatus]

}

export type RoomInviteStatus = $Enums.RoomInviteStatus

export const RoomInviteStatus: typeof $Enums.RoomInviteStatus

export type FriendStatus = $Enums.FriendStatus

export const FriendStatus: typeof $Enums.FriendStatus

export type ScheduleStatus = $Enums.ScheduleStatus

export const ScheduleStatus: typeof $Enums.ScheduleStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomParticipation`: Exposes CRUD operations for the **RoomParticipation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomParticipations
    * const roomParticipations = await prisma.roomParticipation.findMany()
    * ```
    */
  get roomParticipation(): Prisma.RoomParticipationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule`: Exposes CRUD operations for the **Schedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedules
    * const schedules = await prisma.schedule.findMany()
    * ```
    */
  get schedule(): Prisma.ScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timeLog`: Exposes CRUD operations for the **TimeLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeLogs
    * const timeLogs = await prisma.timeLog.findMany()
    * ```
    */
  get timeLog(): Prisma.TimeLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friend`: Exposes CRUD operations for the **Friend** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Friends
    * const friends = await prisma.friend.findMany()
    * ```
    */
  get friend(): Prisma.FriendDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomInvite`: Exposes CRUD operations for the **RoomInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomInvites
    * const roomInvites = await prisma.roomInvite.findMany()
    * ```
    */
  get roomInvite(): Prisma.RoomInviteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Room: 'Room',
    RoomParticipation: 'RoomParticipation',
    Schedule: 'Schedule',
    TimeLog: 'TimeLog',
    Friend: 'Friend',
    RefreshToken: 'RefreshToken',
    RoomInvite: 'RoomInvite'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "room" | "roomParticipation" | "schedule" | "timeLog" | "friend" | "refreshToken" | "roomInvite"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      RoomParticipation: {
        payload: Prisma.$RoomParticipationPayload<ExtArgs>
        fields: Prisma.RoomParticipationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomParticipationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomParticipationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomParticipationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomParticipationPayload>
          }
          findFirst: {
            args: Prisma.RoomParticipationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomParticipationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomParticipationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomParticipationPayload>
          }
          findMany: {
            args: Prisma.RoomParticipationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomParticipationPayload>[]
          }
          create: {
            args: Prisma.RoomParticipationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomParticipationPayload>
          }
          createMany: {
            args: Prisma.RoomParticipationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoomParticipationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomParticipationPayload>
          }
          update: {
            args: Prisma.RoomParticipationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomParticipationPayload>
          }
          deleteMany: {
            args: Prisma.RoomParticipationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomParticipationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomParticipationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomParticipationPayload>
          }
          aggregate: {
            args: Prisma.RoomParticipationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomParticipation>
          }
          groupBy: {
            args: Prisma.RoomParticipationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomParticipationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomParticipationCountArgs<ExtArgs>
            result: $Utils.Optional<RoomParticipationCountAggregateOutputType> | number
          }
        }
      }
      Schedule: {
        payload: Prisma.$SchedulePayload<ExtArgs>
        fields: Prisma.ScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findMany: {
            args: Prisma.ScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          create: {
            args: Prisma.ScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          createMany: {
            args: Prisma.ScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          update: {
            args: Prisma.ScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule>
          }
          groupBy: {
            args: Prisma.ScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleCountAggregateOutputType> | number
          }
        }
      }
      TimeLog: {
        payload: Prisma.$TimeLogPayload<ExtArgs>
        fields: Prisma.TimeLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeLogPayload>
          }
          findFirst: {
            args: Prisma.TimeLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeLogPayload>
          }
          findMany: {
            args: Prisma.TimeLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeLogPayload>[]
          }
          create: {
            args: Prisma.TimeLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeLogPayload>
          }
          createMany: {
            args: Prisma.TimeLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TimeLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeLogPayload>
          }
          update: {
            args: Prisma.TimeLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeLogPayload>
          }
          deleteMany: {
            args: Prisma.TimeLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TimeLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeLogPayload>
          }
          aggregate: {
            args: Prisma.TimeLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeLog>
          }
          groupBy: {
            args: Prisma.TimeLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeLogCountArgs<ExtArgs>
            result: $Utils.Optional<TimeLogCountAggregateOutputType> | number
          }
        }
      }
      Friend: {
        payload: Prisma.$FriendPayload<ExtArgs>
        fields: Prisma.FriendFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          findFirst: {
            args: Prisma.FriendFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          findMany: {
            args: Prisma.FriendFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          create: {
            args: Prisma.FriendCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          createMany: {
            args: Prisma.FriendCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FriendDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          update: {
            args: Prisma.FriendUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          deleteMany: {
            args: Prisma.FriendDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FriendUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          aggregate: {
            args: Prisma.FriendAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriend>
          }
          groupBy: {
            args: Prisma.FriendGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendCountArgs<ExtArgs>
            result: $Utils.Optional<FriendCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      RoomInvite: {
        payload: Prisma.$RoomInvitePayload<ExtArgs>
        fields: Prisma.RoomInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          findFirst: {
            args: Prisma.RoomInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          findMany: {
            args: Prisma.RoomInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>[]
          }
          create: {
            args: Prisma.RoomInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          createMany: {
            args: Prisma.RoomInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoomInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          update: {
            args: Prisma.RoomInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          deleteMany: {
            args: Prisma.RoomInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          aggregate: {
            args: Prisma.RoomInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomInvite>
          }
          groupBy: {
            args: Prisma.RoomInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomInviteCountArgs<ExtArgs>
            result: $Utils.Optional<RoomInviteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    room?: RoomOmit
    roomParticipation?: RoomParticipationOmit
    schedule?: ScheduleOmit
    timeLog?: TimeLogOmit
    friend?: FriendOmit
    refreshToken?: RefreshTokenOmit
    roomInvite?: RoomInviteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    friendsFrom: number
    friendsTo: number
    refreshTokens: number
    schedules: number
    timeLogs: number
    roomParticipations: number
    ownedRooms: number
    sentRoomInvites: number
    receivedRoomInvites: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friendsFrom?: boolean | UserCountOutputTypeCountFriendsFromArgs
    friendsTo?: boolean | UserCountOutputTypeCountFriendsToArgs
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    schedules?: boolean | UserCountOutputTypeCountSchedulesArgs
    timeLogs?: boolean | UserCountOutputTypeCountTimeLogsArgs
    roomParticipations?: boolean | UserCountOutputTypeCountRoomParticipationsArgs
    ownedRooms?: boolean | UserCountOutputTypeCountOwnedRoomsArgs
    sentRoomInvites?: boolean | UserCountOutputTypeCountSentRoomInvitesArgs
    receivedRoomInvites?: boolean | UserCountOutputTypeCountReceivedRoomInvitesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTimeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoomParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomParticipationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentRoomInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomInviteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedRoomInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomInviteWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    participants: number
    timeLogs: number
    invites: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | RoomCountOutputTypeCountParticipantsArgs
    timeLogs?: boolean | RoomCountOutputTypeCountTimeLogsArgs
    invites?: boolean | RoomCountOutputTypeCountInvitesArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomParticipationWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountTimeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeLogWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomInviteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    totalStudyTime: number | null
  }

  export type UserSumAggregateOutputType = {
    totalStudyTime: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    password: string | null
    nickname: string | null
    profileImg: string | null
    createdAt: Date | null
    totalStudyTime: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    password: string | null
    nickname: string | null
    profileImg: string | null
    createdAt: Date | null
    totalStudyTime: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    userId: number
    password: number
    nickname: number
    profileImg: number
    createdAt: number
    totalStudyTime: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    totalStudyTime?: true
  }

  export type UserSumAggregateInputType = {
    totalStudyTime?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    userId?: true
    password?: true
    nickname?: true
    profileImg?: true
    createdAt?: true
    totalStudyTime?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    userId?: true
    password?: true
    nickname?: true
    profileImg?: true
    createdAt?: true
    totalStudyTime?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    userId?: true
    password?: true
    nickname?: true
    profileImg?: true
    createdAt?: true
    totalStudyTime?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    userId: string
    password: string
    nickname: string
    profileImg: string | null
    createdAt: Date | null
    totalStudyTime: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    password?: boolean
    nickname?: boolean
    profileImg?: boolean
    createdAt?: boolean
    totalStudyTime?: boolean
    friendsFrom?: boolean | User$friendsFromArgs<ExtArgs>
    friendsTo?: boolean | User$friendsToArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    schedules?: boolean | User$schedulesArgs<ExtArgs>
    timeLogs?: boolean | User$timeLogsArgs<ExtArgs>
    roomParticipations?: boolean | User$roomParticipationsArgs<ExtArgs>
    ownedRooms?: boolean | User$ownedRoomsArgs<ExtArgs>
    sentRoomInvites?: boolean | User$sentRoomInvitesArgs<ExtArgs>
    receivedRoomInvites?: boolean | User$receivedRoomInvitesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    userId?: boolean
    password?: boolean
    nickname?: boolean
    profileImg?: boolean
    createdAt?: boolean
    totalStudyTime?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "password" | "nickname" | "profileImg" | "createdAt" | "totalStudyTime", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friendsFrom?: boolean | User$friendsFromArgs<ExtArgs>
    friendsTo?: boolean | User$friendsToArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    schedules?: boolean | User$schedulesArgs<ExtArgs>
    timeLogs?: boolean | User$timeLogsArgs<ExtArgs>
    roomParticipations?: boolean | User$roomParticipationsArgs<ExtArgs>
    ownedRooms?: boolean | User$ownedRoomsArgs<ExtArgs>
    sentRoomInvites?: boolean | User$sentRoomInvitesArgs<ExtArgs>
    receivedRoomInvites?: boolean | User$receivedRoomInvitesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      friendsFrom: Prisma.$FriendPayload<ExtArgs>[]
      friendsTo: Prisma.$FriendPayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      timeLogs: Prisma.$TimeLogPayload<ExtArgs>[]
      roomParticipations: Prisma.$RoomParticipationPayload<ExtArgs>[]
      ownedRooms: Prisma.$RoomPayload<ExtArgs>[]
      sentRoomInvites: Prisma.$RoomInvitePayload<ExtArgs>[]
      receivedRoomInvites: Prisma.$RoomInvitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      password: string
      nickname: string
      profileImg: string | null
      createdAt: Date | null
      totalStudyTime: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    friendsFrom<T extends User$friendsFromArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendsTo<T extends User$friendsToArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    schedules<T extends User$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, User$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timeLogs<T extends User$timeLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$timeLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roomParticipations<T extends User$roomParticipationsArgs<ExtArgs> = {}>(args?: Subset<T, User$roomParticipationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedRooms<T extends User$ownedRoomsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedRoomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentRoomInvites<T extends User$sentRoomInvitesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentRoomInvitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedRoomInvites<T extends User$receivedRoomInvitesArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedRoomInvitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly userId: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly nickname: FieldRef<"User", 'String'>
    readonly profileImg: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly totalStudyTime: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.friendsFrom
   */
  export type User$friendsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    cursor?: FriendWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * User.friendsTo
   */
  export type User$friendsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    cursor?: FriendWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.schedules
   */
  export type User$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * User.timeLogs
   */
  export type User$timeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    where?: TimeLogWhereInput
    orderBy?: TimeLogOrderByWithRelationInput | TimeLogOrderByWithRelationInput[]
    cursor?: TimeLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeLogScalarFieldEnum | TimeLogScalarFieldEnum[]
  }

  /**
   * User.roomParticipations
   */
  export type User$roomParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    where?: RoomParticipationWhereInput
    orderBy?: RoomParticipationOrderByWithRelationInput | RoomParticipationOrderByWithRelationInput[]
    cursor?: RoomParticipationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomParticipationScalarFieldEnum | RoomParticipationScalarFieldEnum[]
  }

  /**
   * User.ownedRooms
   */
  export type User$ownedRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * User.sentRoomInvites
   */
  export type User$sentRoomInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    where?: RoomInviteWhereInput
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    cursor?: RoomInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * User.receivedRoomInvites
   */
  export type User$receivedRoomInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    where?: RoomInviteWhereInput
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    cursor?: RoomInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    ownerCuid: string | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    ownerCuid: string | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    ownerCuid: number
    _all: number
  }


  export type RoomMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    ownerCuid?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    ownerCuid?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    ownerCuid?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    name: string
    createdAt: Date | null
    ownerCuid: string
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    ownerCuid?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    participants?: boolean | Room$participantsArgs<ExtArgs>
    timeLogs?: boolean | Room$timeLogsArgs<ExtArgs>
    invites?: boolean | Room$invitesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>



  export type RoomSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    ownerCuid?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "ownerCuid", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    participants?: boolean | Room$participantsArgs<ExtArgs>
    timeLogs?: boolean | Room$timeLogsArgs<ExtArgs>
    invites?: boolean | Room$invitesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      participants: Prisma.$RoomParticipationPayload<ExtArgs>[]
      timeLogs: Prisma.$TimeLogPayload<ExtArgs>[]
      invites: Prisma.$RoomInvitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date | null
      ownerCuid: string
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participants<T extends Room$participantsArgs<ExtArgs> = {}>(args?: Subset<T, Room$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timeLogs<T extends Room$timeLogsArgs<ExtArgs> = {}>(args?: Subset<T, Room$timeLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invites<T extends Room$invitesArgs<ExtArgs> = {}>(args?: Subset<T, Room$invitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly name: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly ownerCuid: FieldRef<"Room", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.participants
   */
  export type Room$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    where?: RoomParticipationWhereInput
    orderBy?: RoomParticipationOrderByWithRelationInput | RoomParticipationOrderByWithRelationInput[]
    cursor?: RoomParticipationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomParticipationScalarFieldEnum | RoomParticipationScalarFieldEnum[]
  }

  /**
   * Room.timeLogs
   */
  export type Room$timeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    where?: TimeLogWhereInput
    orderBy?: TimeLogOrderByWithRelationInput | TimeLogOrderByWithRelationInput[]
    cursor?: TimeLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeLogScalarFieldEnum | TimeLogScalarFieldEnum[]
  }

  /**
   * Room.invites
   */
  export type Room$invitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    where?: RoomInviteWhereInput
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    cursor?: RoomInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model RoomParticipation
   */

  export type AggregateRoomParticipation = {
    _count: RoomParticipationCountAggregateOutputType | null
    _min: RoomParticipationMinAggregateOutputType | null
    _max: RoomParticipationMaxAggregateOutputType | null
  }

  export type RoomParticipationMinAggregateOutputType = {
    userCuid: string | null
    roomCuid: string | null
    joinedAt: Date | null
  }

  export type RoomParticipationMaxAggregateOutputType = {
    userCuid: string | null
    roomCuid: string | null
    joinedAt: Date | null
  }

  export type RoomParticipationCountAggregateOutputType = {
    userCuid: number
    roomCuid: number
    joinedAt: number
    _all: number
  }


  export type RoomParticipationMinAggregateInputType = {
    userCuid?: true
    roomCuid?: true
    joinedAt?: true
  }

  export type RoomParticipationMaxAggregateInputType = {
    userCuid?: true
    roomCuid?: true
    joinedAt?: true
  }

  export type RoomParticipationCountAggregateInputType = {
    userCuid?: true
    roomCuid?: true
    joinedAt?: true
    _all?: true
  }

  export type RoomParticipationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomParticipation to aggregate.
     */
    where?: RoomParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomParticipations to fetch.
     */
    orderBy?: RoomParticipationOrderByWithRelationInput | RoomParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomParticipations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomParticipations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomParticipations
    **/
    _count?: true | RoomParticipationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomParticipationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomParticipationMaxAggregateInputType
  }

  export type GetRoomParticipationAggregateType<T extends RoomParticipationAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomParticipation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomParticipation[P]>
      : GetScalarType<T[P], AggregateRoomParticipation[P]>
  }




  export type RoomParticipationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomParticipationWhereInput
    orderBy?: RoomParticipationOrderByWithAggregationInput | RoomParticipationOrderByWithAggregationInput[]
    by: RoomParticipationScalarFieldEnum[] | RoomParticipationScalarFieldEnum
    having?: RoomParticipationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomParticipationCountAggregateInputType | true
    _min?: RoomParticipationMinAggregateInputType
    _max?: RoomParticipationMaxAggregateInputType
  }

  export type RoomParticipationGroupByOutputType = {
    userCuid: string
    roomCuid: string
    joinedAt: Date
    _count: RoomParticipationCountAggregateOutputType | null
    _min: RoomParticipationMinAggregateOutputType | null
    _max: RoomParticipationMaxAggregateOutputType | null
  }

  type GetRoomParticipationGroupByPayload<T extends RoomParticipationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomParticipationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomParticipationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomParticipationGroupByOutputType[P]>
            : GetScalarType<T[P], RoomParticipationGroupByOutputType[P]>
        }
      >
    >


  export type RoomParticipationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userCuid?: boolean
    roomCuid?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomParticipation"]>



  export type RoomParticipationSelectScalar = {
    userCuid?: boolean
    roomCuid?: boolean
    joinedAt?: boolean
  }

  export type RoomParticipationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userCuid" | "roomCuid" | "joinedAt", ExtArgs["result"]["roomParticipation"]>
  export type RoomParticipationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }

  export type $RoomParticipationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomParticipation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      room: Prisma.$RoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userCuid: string
      roomCuid: string
      joinedAt: Date
    }, ExtArgs["result"]["roomParticipation"]>
    composites: {}
  }

  type RoomParticipationGetPayload<S extends boolean | null | undefined | RoomParticipationDefaultArgs> = $Result.GetResult<Prisma.$RoomParticipationPayload, S>

  type RoomParticipationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomParticipationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomParticipationCountAggregateInputType | true
    }

  export interface RoomParticipationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomParticipation'], meta: { name: 'RoomParticipation' } }
    /**
     * Find zero or one RoomParticipation that matches the filter.
     * @param {RoomParticipationFindUniqueArgs} args - Arguments to find a RoomParticipation
     * @example
     * // Get one RoomParticipation
     * const roomParticipation = await prisma.roomParticipation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomParticipationFindUniqueArgs>(args: SelectSubset<T, RoomParticipationFindUniqueArgs<ExtArgs>>): Prisma__RoomParticipationClient<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomParticipation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomParticipationFindUniqueOrThrowArgs} args - Arguments to find a RoomParticipation
     * @example
     * // Get one RoomParticipation
     * const roomParticipation = await prisma.roomParticipation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomParticipationFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomParticipationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomParticipationClient<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomParticipation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomParticipationFindFirstArgs} args - Arguments to find a RoomParticipation
     * @example
     * // Get one RoomParticipation
     * const roomParticipation = await prisma.roomParticipation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomParticipationFindFirstArgs>(args?: SelectSubset<T, RoomParticipationFindFirstArgs<ExtArgs>>): Prisma__RoomParticipationClient<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomParticipation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomParticipationFindFirstOrThrowArgs} args - Arguments to find a RoomParticipation
     * @example
     * // Get one RoomParticipation
     * const roomParticipation = await prisma.roomParticipation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomParticipationFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomParticipationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomParticipationClient<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomParticipations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomParticipationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomParticipations
     * const roomParticipations = await prisma.roomParticipation.findMany()
     * 
     * // Get first 10 RoomParticipations
     * const roomParticipations = await prisma.roomParticipation.findMany({ take: 10 })
     * 
     * // Only select the `userCuid`
     * const roomParticipationWithUserCuidOnly = await prisma.roomParticipation.findMany({ select: { userCuid: true } })
     * 
     */
    findMany<T extends RoomParticipationFindManyArgs>(args?: SelectSubset<T, RoomParticipationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomParticipation.
     * @param {RoomParticipationCreateArgs} args - Arguments to create a RoomParticipation.
     * @example
     * // Create one RoomParticipation
     * const RoomParticipation = await prisma.roomParticipation.create({
     *   data: {
     *     // ... data to create a RoomParticipation
     *   }
     * })
     * 
     */
    create<T extends RoomParticipationCreateArgs>(args: SelectSubset<T, RoomParticipationCreateArgs<ExtArgs>>): Prisma__RoomParticipationClient<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomParticipations.
     * @param {RoomParticipationCreateManyArgs} args - Arguments to create many RoomParticipations.
     * @example
     * // Create many RoomParticipations
     * const roomParticipation = await prisma.roomParticipation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomParticipationCreateManyArgs>(args?: SelectSubset<T, RoomParticipationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RoomParticipation.
     * @param {RoomParticipationDeleteArgs} args - Arguments to delete one RoomParticipation.
     * @example
     * // Delete one RoomParticipation
     * const RoomParticipation = await prisma.roomParticipation.delete({
     *   where: {
     *     // ... filter to delete one RoomParticipation
     *   }
     * })
     * 
     */
    delete<T extends RoomParticipationDeleteArgs>(args: SelectSubset<T, RoomParticipationDeleteArgs<ExtArgs>>): Prisma__RoomParticipationClient<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomParticipation.
     * @param {RoomParticipationUpdateArgs} args - Arguments to update one RoomParticipation.
     * @example
     * // Update one RoomParticipation
     * const roomParticipation = await prisma.roomParticipation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomParticipationUpdateArgs>(args: SelectSubset<T, RoomParticipationUpdateArgs<ExtArgs>>): Prisma__RoomParticipationClient<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomParticipations.
     * @param {RoomParticipationDeleteManyArgs} args - Arguments to filter RoomParticipations to delete.
     * @example
     * // Delete a few RoomParticipations
     * const { count } = await prisma.roomParticipation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomParticipationDeleteManyArgs>(args?: SelectSubset<T, RoomParticipationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomParticipations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomParticipationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomParticipations
     * const roomParticipation = await prisma.roomParticipation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomParticipationUpdateManyArgs>(args: SelectSubset<T, RoomParticipationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoomParticipation.
     * @param {RoomParticipationUpsertArgs} args - Arguments to update or create a RoomParticipation.
     * @example
     * // Update or create a RoomParticipation
     * const roomParticipation = await prisma.roomParticipation.upsert({
     *   create: {
     *     // ... data to create a RoomParticipation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomParticipation we want to update
     *   }
     * })
     */
    upsert<T extends RoomParticipationUpsertArgs>(args: SelectSubset<T, RoomParticipationUpsertArgs<ExtArgs>>): Prisma__RoomParticipationClient<$Result.GetResult<Prisma.$RoomParticipationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomParticipations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomParticipationCountArgs} args - Arguments to filter RoomParticipations to count.
     * @example
     * // Count the number of RoomParticipations
     * const count = await prisma.roomParticipation.count({
     *   where: {
     *     // ... the filter for the RoomParticipations we want to count
     *   }
     * })
    **/
    count<T extends RoomParticipationCountArgs>(
      args?: Subset<T, RoomParticipationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomParticipationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomParticipation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomParticipationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomParticipationAggregateArgs>(args: Subset<T, RoomParticipationAggregateArgs>): Prisma.PrismaPromise<GetRoomParticipationAggregateType<T>>

    /**
     * Group by RoomParticipation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomParticipationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomParticipationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomParticipationGroupByArgs['orderBy'] }
        : { orderBy?: RoomParticipationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomParticipationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomParticipationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomParticipation model
   */
  readonly fields: RoomParticipationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomParticipation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomParticipationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomParticipation model
   */
  interface RoomParticipationFieldRefs {
    readonly userCuid: FieldRef<"RoomParticipation", 'String'>
    readonly roomCuid: FieldRef<"RoomParticipation", 'String'>
    readonly joinedAt: FieldRef<"RoomParticipation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomParticipation findUnique
   */
  export type RoomParticipationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    /**
     * Filter, which RoomParticipation to fetch.
     */
    where: RoomParticipationWhereUniqueInput
  }

  /**
   * RoomParticipation findUniqueOrThrow
   */
  export type RoomParticipationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    /**
     * Filter, which RoomParticipation to fetch.
     */
    where: RoomParticipationWhereUniqueInput
  }

  /**
   * RoomParticipation findFirst
   */
  export type RoomParticipationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    /**
     * Filter, which RoomParticipation to fetch.
     */
    where?: RoomParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomParticipations to fetch.
     */
    orderBy?: RoomParticipationOrderByWithRelationInput | RoomParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomParticipations.
     */
    cursor?: RoomParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomParticipations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomParticipations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomParticipations.
     */
    distinct?: RoomParticipationScalarFieldEnum | RoomParticipationScalarFieldEnum[]
  }

  /**
   * RoomParticipation findFirstOrThrow
   */
  export type RoomParticipationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    /**
     * Filter, which RoomParticipation to fetch.
     */
    where?: RoomParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomParticipations to fetch.
     */
    orderBy?: RoomParticipationOrderByWithRelationInput | RoomParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomParticipations.
     */
    cursor?: RoomParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomParticipations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomParticipations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomParticipations.
     */
    distinct?: RoomParticipationScalarFieldEnum | RoomParticipationScalarFieldEnum[]
  }

  /**
   * RoomParticipation findMany
   */
  export type RoomParticipationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    /**
     * Filter, which RoomParticipations to fetch.
     */
    where?: RoomParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomParticipations to fetch.
     */
    orderBy?: RoomParticipationOrderByWithRelationInput | RoomParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomParticipations.
     */
    cursor?: RoomParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomParticipations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomParticipations.
     */
    skip?: number
    distinct?: RoomParticipationScalarFieldEnum | RoomParticipationScalarFieldEnum[]
  }

  /**
   * RoomParticipation create
   */
  export type RoomParticipationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomParticipation.
     */
    data: XOR<RoomParticipationCreateInput, RoomParticipationUncheckedCreateInput>
  }

  /**
   * RoomParticipation createMany
   */
  export type RoomParticipationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomParticipations.
     */
    data: RoomParticipationCreateManyInput | RoomParticipationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomParticipation update
   */
  export type RoomParticipationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomParticipation.
     */
    data: XOR<RoomParticipationUpdateInput, RoomParticipationUncheckedUpdateInput>
    /**
     * Choose, which RoomParticipation to update.
     */
    where: RoomParticipationWhereUniqueInput
  }

  /**
   * RoomParticipation updateMany
   */
  export type RoomParticipationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomParticipations.
     */
    data: XOR<RoomParticipationUpdateManyMutationInput, RoomParticipationUncheckedUpdateManyInput>
    /**
     * Filter which RoomParticipations to update
     */
    where?: RoomParticipationWhereInput
    /**
     * Limit how many RoomParticipations to update.
     */
    limit?: number
  }

  /**
   * RoomParticipation upsert
   */
  export type RoomParticipationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomParticipation to update in case it exists.
     */
    where: RoomParticipationWhereUniqueInput
    /**
     * In case the RoomParticipation found by the `where` argument doesn't exist, create a new RoomParticipation with this data.
     */
    create: XOR<RoomParticipationCreateInput, RoomParticipationUncheckedCreateInput>
    /**
     * In case the RoomParticipation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomParticipationUpdateInput, RoomParticipationUncheckedUpdateInput>
  }

  /**
   * RoomParticipation delete
   */
  export type RoomParticipationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
    /**
     * Filter which RoomParticipation to delete.
     */
    where: RoomParticipationWhereUniqueInput
  }

  /**
   * RoomParticipation deleteMany
   */
  export type RoomParticipationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomParticipations to delete
     */
    where?: RoomParticipationWhereInput
    /**
     * Limit how many RoomParticipations to delete.
     */
    limit?: number
  }

  /**
   * RoomParticipation without action
   */
  export type RoomParticipationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomParticipation
     */
    select?: RoomParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomParticipation
     */
    omit?: RoomParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomParticipationInclude<ExtArgs> | null
  }


  /**
   * Model Schedule
   */

  export type AggregateSchedule = {
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  export type ScheduleAvgAggregateOutputType = {
    order: number | null
  }

  export type ScheduleSumAggregateOutputType = {
    order: number | null
  }

  export type ScheduleMinAggregateOutputType = {
    id: string | null
    title: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.ScheduleStatus | null
    createdAt: Date | null
    order: number | null
    userCuid: string | null
    date: string | null
  }

  export type ScheduleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.ScheduleStatus | null
    createdAt: Date | null
    order: number | null
    userCuid: string | null
    date: string | null
  }

  export type ScheduleCountAggregateOutputType = {
    id: number
    title: number
    startTime: number
    endTime: number
    status: number
    createdAt: number
    order: number
    userCuid: number
    date: number
    _all: number
  }


  export type ScheduleAvgAggregateInputType = {
    order?: true
  }

  export type ScheduleSumAggregateInputType = {
    order?: true
  }

  export type ScheduleMinAggregateInputType = {
    id?: true
    title?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    order?: true
    userCuid?: true
    date?: true
  }

  export type ScheduleMaxAggregateInputType = {
    id?: true
    title?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    order?: true
    userCuid?: true
    date?: true
  }

  export type ScheduleCountAggregateInputType = {
    id?: true
    title?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    order?: true
    userCuid?: true
    date?: true
    _all?: true
  }

  export type ScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedule to aggregate.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schedules
    **/
    _count?: true | ScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleMaxAggregateInputType
  }

  export type GetScheduleAggregateType<T extends ScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule[P]>
      : GetScalarType<T[P], AggregateSchedule[P]>
  }




  export type ScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithAggregationInput | ScheduleOrderByWithAggregationInput[]
    by: ScheduleScalarFieldEnum[] | ScheduleScalarFieldEnum
    having?: ScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleCountAggregateInputType | true
    _avg?: ScheduleAvgAggregateInputType
    _sum?: ScheduleSumAggregateInputType
    _min?: ScheduleMinAggregateInputType
    _max?: ScheduleMaxAggregateInputType
  }

  export type ScheduleGroupByOutputType = {
    id: string
    title: string
    startTime: Date | null
    endTime: Date | null
    status: $Enums.ScheduleStatus
    createdAt: Date | null
    order: number
    userCuid: string
    date: string
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  type GetScheduleGroupByPayload<T extends ScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    order?: boolean
    userCuid?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>



  export type ScheduleSelectScalar = {
    id?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    order?: boolean
    userCuid?: boolean
    date?: boolean
  }

  export type ScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "startTime" | "endTime" | "status" | "createdAt" | "order" | "userCuid" | "date", ExtArgs["result"]["schedule"]>
  export type ScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Schedule"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      startTime: Date | null
      endTime: Date | null
      status: $Enums.ScheduleStatus
      createdAt: Date | null
      order: number
      userCuid: string
      date: string
    }, ExtArgs["result"]["schedule"]>
    composites: {}
  }

  type ScheduleGetPayload<S extends boolean | null | undefined | ScheduleDefaultArgs> = $Result.GetResult<Prisma.$SchedulePayload, S>

  type ScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleCountAggregateInputType | true
    }

  export interface ScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Schedule'], meta: { name: 'Schedule' } }
    /**
     * Find zero or one Schedule that matches the filter.
     * @param {ScheduleFindUniqueArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleFindUniqueArgs>(args: SelectSubset<T, ScheduleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleFindUniqueOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleFindFirstArgs>(args?: SelectSubset<T, ScheduleFindFirstArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedules
     * const schedules = await prisma.schedule.findMany()
     * 
     * // Get first 10 Schedules
     * const schedules = await prisma.schedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleWithIdOnly = await prisma.schedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleFindManyArgs>(args?: SelectSubset<T, ScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule.
     * @param {ScheduleCreateArgs} args - Arguments to create a Schedule.
     * @example
     * // Create one Schedule
     * const Schedule = await prisma.schedule.create({
     *   data: {
     *     // ... data to create a Schedule
     *   }
     * })
     * 
     */
    create<T extends ScheduleCreateArgs>(args: SelectSubset<T, ScheduleCreateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedules.
     * @param {ScheduleCreateManyArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleCreateManyArgs>(args?: SelectSubset<T, ScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Schedule.
     * @param {ScheduleDeleteArgs} args - Arguments to delete one Schedule.
     * @example
     * // Delete one Schedule
     * const Schedule = await prisma.schedule.delete({
     *   where: {
     *     // ... filter to delete one Schedule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleDeleteArgs>(args: SelectSubset<T, ScheduleDeleteArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule.
     * @param {ScheduleUpdateArgs} args - Arguments to update one Schedule.
     * @example
     * // Update one Schedule
     * const schedule = await prisma.schedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleUpdateArgs>(args: SelectSubset<T, ScheduleUpdateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedules.
     * @param {ScheduleDeleteManyArgs} args - Arguments to filter Schedules to delete.
     * @example
     * // Delete a few Schedules
     * const { count } = await prisma.schedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleDeleteManyArgs>(args?: SelectSubset<T, ScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleUpdateManyArgs>(args: SelectSubset<T, ScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Schedule.
     * @param {ScheduleUpsertArgs} args - Arguments to update or create a Schedule.
     * @example
     * // Update or create a Schedule
     * const schedule = await prisma.schedule.upsert({
     *   create: {
     *     // ... data to create a Schedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleUpsertArgs>(args: SelectSubset<T, ScheduleUpsertArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleCountArgs} args - Arguments to filter Schedules to count.
     * @example
     * // Count the number of Schedules
     * const count = await prisma.schedule.count({
     *   where: {
     *     // ... the filter for the Schedules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleCountArgs>(
      args?: Subset<T, ScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleAggregateArgs>(args: Subset<T, ScheduleAggregateArgs>): Prisma.PrismaPromise<GetScheduleAggregateType<T>>

    /**
     * Group by Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Schedule model
   */
  readonly fields: ScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Schedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Schedule model
   */
  interface ScheduleFieldRefs {
    readonly id: FieldRef<"Schedule", 'String'>
    readonly title: FieldRef<"Schedule", 'String'>
    readonly startTime: FieldRef<"Schedule", 'DateTime'>
    readonly endTime: FieldRef<"Schedule", 'DateTime'>
    readonly status: FieldRef<"Schedule", 'ScheduleStatus'>
    readonly createdAt: FieldRef<"Schedule", 'DateTime'>
    readonly order: FieldRef<"Schedule", 'Int'>
    readonly userCuid: FieldRef<"Schedule", 'String'>
    readonly date: FieldRef<"Schedule", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Schedule findUnique
   */
  export type ScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findUniqueOrThrow
   */
  export type ScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findFirst
   */
  export type ScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findFirstOrThrow
   */
  export type ScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findMany
   */
  export type ScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedules to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule create
   */
  export type ScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a Schedule.
     */
    data: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
  }

  /**
   * Schedule createMany
   */
  export type ScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Schedule update
   */
  export type ScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a Schedule.
     */
    data: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
    /**
     * Choose, which Schedule to update.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule updateMany
   */
  export type ScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
  }

  /**
   * Schedule upsert
   */
  export type ScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the Schedule to update in case it exists.
     */
    where: ScheduleWhereUniqueInput
    /**
     * In case the Schedule found by the `where` argument doesn't exist, create a new Schedule with this data.
     */
    create: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
    /**
     * In case the Schedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
  }

  /**
   * Schedule delete
   */
  export type ScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter which Schedule to delete.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule deleteMany
   */
  export type ScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedules to delete
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to delete.
     */
    limit?: number
  }

  /**
   * Schedule without action
   */
  export type ScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
  }


  /**
   * Model TimeLog
   */

  export type AggregateTimeLog = {
    _count: TimeLogCountAggregateOutputType | null
    _avg: TimeLogAvgAggregateOutputType | null
    _sum: TimeLogSumAggregateOutputType | null
    _min: TimeLogMinAggregateOutputType | null
    _max: TimeLogMaxAggregateOutputType | null
  }

  export type TimeLogAvgAggregateOutputType = {
    totalTime: number | null
  }

  export type TimeLogSumAggregateOutputType = {
    totalTime: number | null
  }

  export type TimeLogMinAggregateOutputType = {
    id: string | null
    totalTime: number | null
    date: Date | null
    createdAt: Date | null
    roomCuid: string | null
    userCuid: string | null
  }

  export type TimeLogMaxAggregateOutputType = {
    id: string | null
    totalTime: number | null
    date: Date | null
    createdAt: Date | null
    roomCuid: string | null
    userCuid: string | null
  }

  export type TimeLogCountAggregateOutputType = {
    id: number
    totalTime: number
    date: number
    createdAt: number
    roomCuid: number
    userCuid: number
    _all: number
  }


  export type TimeLogAvgAggregateInputType = {
    totalTime?: true
  }

  export type TimeLogSumAggregateInputType = {
    totalTime?: true
  }

  export type TimeLogMinAggregateInputType = {
    id?: true
    totalTime?: true
    date?: true
    createdAt?: true
    roomCuid?: true
    userCuid?: true
  }

  export type TimeLogMaxAggregateInputType = {
    id?: true
    totalTime?: true
    date?: true
    createdAt?: true
    roomCuid?: true
    userCuid?: true
  }

  export type TimeLogCountAggregateInputType = {
    id?: true
    totalTime?: true
    date?: true
    createdAt?: true
    roomCuid?: true
    userCuid?: true
    _all?: true
  }

  export type TimeLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeLog to aggregate.
     */
    where?: TimeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeLogs to fetch.
     */
    orderBy?: TimeLogOrderByWithRelationInput | TimeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeLogs
    **/
    _count?: true | TimeLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimeLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimeLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeLogMaxAggregateInputType
  }

  export type GetTimeLogAggregateType<T extends TimeLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeLog[P]>
      : GetScalarType<T[P], AggregateTimeLog[P]>
  }




  export type TimeLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeLogWhereInput
    orderBy?: TimeLogOrderByWithAggregationInput | TimeLogOrderByWithAggregationInput[]
    by: TimeLogScalarFieldEnum[] | TimeLogScalarFieldEnum
    having?: TimeLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeLogCountAggregateInputType | true
    _avg?: TimeLogAvgAggregateInputType
    _sum?: TimeLogSumAggregateInputType
    _min?: TimeLogMinAggregateInputType
    _max?: TimeLogMaxAggregateInputType
  }

  export type TimeLogGroupByOutputType = {
    id: string
    totalTime: number
    date: Date
    createdAt: Date | null
    roomCuid: string
    userCuid: string
    _count: TimeLogCountAggregateOutputType | null
    _avg: TimeLogAvgAggregateOutputType | null
    _sum: TimeLogSumAggregateOutputType | null
    _min: TimeLogMinAggregateOutputType | null
    _max: TimeLogMaxAggregateOutputType | null
  }

  type GetTimeLogGroupByPayload<T extends TimeLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeLogGroupByOutputType[P]>
            : GetScalarType<T[P], TimeLogGroupByOutputType[P]>
        }
      >
    >


  export type TimeLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    totalTime?: boolean
    date?: boolean
    createdAt?: boolean
    roomCuid?: boolean
    userCuid?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeLog"]>



  export type TimeLogSelectScalar = {
    id?: boolean
    totalTime?: boolean
    date?: boolean
    createdAt?: boolean
    roomCuid?: boolean
    userCuid?: boolean
  }

  export type TimeLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "totalTime" | "date" | "createdAt" | "roomCuid" | "userCuid", ExtArgs["result"]["timeLog"]>
  export type TimeLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TimeLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeLog"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      totalTime: number
      date: Date
      createdAt: Date | null
      roomCuid: string
      userCuid: string
    }, ExtArgs["result"]["timeLog"]>
    composites: {}
  }

  type TimeLogGetPayload<S extends boolean | null | undefined | TimeLogDefaultArgs> = $Result.GetResult<Prisma.$TimeLogPayload, S>

  type TimeLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimeLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimeLogCountAggregateInputType | true
    }

  export interface TimeLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeLog'], meta: { name: 'TimeLog' } }
    /**
     * Find zero or one TimeLog that matches the filter.
     * @param {TimeLogFindUniqueArgs} args - Arguments to find a TimeLog
     * @example
     * // Get one TimeLog
     * const timeLog = await prisma.timeLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeLogFindUniqueArgs>(args: SelectSubset<T, TimeLogFindUniqueArgs<ExtArgs>>): Prisma__TimeLogClient<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimeLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimeLogFindUniqueOrThrowArgs} args - Arguments to find a TimeLog
     * @example
     * // Get one TimeLog
     * const timeLog = await prisma.timeLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeLogFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeLogClient<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeLogFindFirstArgs} args - Arguments to find a TimeLog
     * @example
     * // Get one TimeLog
     * const timeLog = await prisma.timeLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeLogFindFirstArgs>(args?: SelectSubset<T, TimeLogFindFirstArgs<ExtArgs>>): Prisma__TimeLogClient<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeLogFindFirstOrThrowArgs} args - Arguments to find a TimeLog
     * @example
     * // Get one TimeLog
     * const timeLog = await prisma.timeLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeLogFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeLogClient<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimeLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeLogs
     * const timeLogs = await prisma.timeLog.findMany()
     * 
     * // Get first 10 TimeLogs
     * const timeLogs = await prisma.timeLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeLogWithIdOnly = await prisma.timeLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeLogFindManyArgs>(args?: SelectSubset<T, TimeLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimeLog.
     * @param {TimeLogCreateArgs} args - Arguments to create a TimeLog.
     * @example
     * // Create one TimeLog
     * const TimeLog = await prisma.timeLog.create({
     *   data: {
     *     // ... data to create a TimeLog
     *   }
     * })
     * 
     */
    create<T extends TimeLogCreateArgs>(args: SelectSubset<T, TimeLogCreateArgs<ExtArgs>>): Prisma__TimeLogClient<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimeLogs.
     * @param {TimeLogCreateManyArgs} args - Arguments to create many TimeLogs.
     * @example
     * // Create many TimeLogs
     * const timeLog = await prisma.timeLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeLogCreateManyArgs>(args?: SelectSubset<T, TimeLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TimeLog.
     * @param {TimeLogDeleteArgs} args - Arguments to delete one TimeLog.
     * @example
     * // Delete one TimeLog
     * const TimeLog = await prisma.timeLog.delete({
     *   where: {
     *     // ... filter to delete one TimeLog
     *   }
     * })
     * 
     */
    delete<T extends TimeLogDeleteArgs>(args: SelectSubset<T, TimeLogDeleteArgs<ExtArgs>>): Prisma__TimeLogClient<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimeLog.
     * @param {TimeLogUpdateArgs} args - Arguments to update one TimeLog.
     * @example
     * // Update one TimeLog
     * const timeLog = await prisma.timeLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeLogUpdateArgs>(args: SelectSubset<T, TimeLogUpdateArgs<ExtArgs>>): Prisma__TimeLogClient<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimeLogs.
     * @param {TimeLogDeleteManyArgs} args - Arguments to filter TimeLogs to delete.
     * @example
     * // Delete a few TimeLogs
     * const { count } = await prisma.timeLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeLogDeleteManyArgs>(args?: SelectSubset<T, TimeLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeLogs
     * const timeLog = await prisma.timeLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeLogUpdateManyArgs>(args: SelectSubset<T, TimeLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TimeLog.
     * @param {TimeLogUpsertArgs} args - Arguments to update or create a TimeLog.
     * @example
     * // Update or create a TimeLog
     * const timeLog = await prisma.timeLog.upsert({
     *   create: {
     *     // ... data to create a TimeLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeLog we want to update
     *   }
     * })
     */
    upsert<T extends TimeLogUpsertArgs>(args: SelectSubset<T, TimeLogUpsertArgs<ExtArgs>>): Prisma__TimeLogClient<$Result.GetResult<Prisma.$TimeLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeLogCountArgs} args - Arguments to filter TimeLogs to count.
     * @example
     * // Count the number of TimeLogs
     * const count = await prisma.timeLog.count({
     *   where: {
     *     // ... the filter for the TimeLogs we want to count
     *   }
     * })
    **/
    count<T extends TimeLogCountArgs>(
      args?: Subset<T, TimeLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeLogAggregateArgs>(args: Subset<T, TimeLogAggregateArgs>): Prisma.PrismaPromise<GetTimeLogAggregateType<T>>

    /**
     * Group by TimeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeLogGroupByArgs['orderBy'] }
        : { orderBy?: TimeLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeLog model
   */
  readonly fields: TimeLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimeLog model
   */
  interface TimeLogFieldRefs {
    readonly id: FieldRef<"TimeLog", 'String'>
    readonly totalTime: FieldRef<"TimeLog", 'Int'>
    readonly date: FieldRef<"TimeLog", 'DateTime'>
    readonly createdAt: FieldRef<"TimeLog", 'DateTime'>
    readonly roomCuid: FieldRef<"TimeLog", 'String'>
    readonly userCuid: FieldRef<"TimeLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TimeLog findUnique
   */
  export type TimeLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    /**
     * Filter, which TimeLog to fetch.
     */
    where: TimeLogWhereUniqueInput
  }

  /**
   * TimeLog findUniqueOrThrow
   */
  export type TimeLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    /**
     * Filter, which TimeLog to fetch.
     */
    where: TimeLogWhereUniqueInput
  }

  /**
   * TimeLog findFirst
   */
  export type TimeLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    /**
     * Filter, which TimeLog to fetch.
     */
    where?: TimeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeLogs to fetch.
     */
    orderBy?: TimeLogOrderByWithRelationInput | TimeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeLogs.
     */
    cursor?: TimeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeLogs.
     */
    distinct?: TimeLogScalarFieldEnum | TimeLogScalarFieldEnum[]
  }

  /**
   * TimeLog findFirstOrThrow
   */
  export type TimeLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    /**
     * Filter, which TimeLog to fetch.
     */
    where?: TimeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeLogs to fetch.
     */
    orderBy?: TimeLogOrderByWithRelationInput | TimeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeLogs.
     */
    cursor?: TimeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeLogs.
     */
    distinct?: TimeLogScalarFieldEnum | TimeLogScalarFieldEnum[]
  }

  /**
   * TimeLog findMany
   */
  export type TimeLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    /**
     * Filter, which TimeLogs to fetch.
     */
    where?: TimeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeLogs to fetch.
     */
    orderBy?: TimeLogOrderByWithRelationInput | TimeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeLogs.
     */
    cursor?: TimeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeLogs.
     */
    skip?: number
    distinct?: TimeLogScalarFieldEnum | TimeLogScalarFieldEnum[]
  }

  /**
   * TimeLog create
   */
  export type TimeLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeLog.
     */
    data: XOR<TimeLogCreateInput, TimeLogUncheckedCreateInput>
  }

  /**
   * TimeLog createMany
   */
  export type TimeLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeLogs.
     */
    data: TimeLogCreateManyInput | TimeLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimeLog update
   */
  export type TimeLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeLog.
     */
    data: XOR<TimeLogUpdateInput, TimeLogUncheckedUpdateInput>
    /**
     * Choose, which TimeLog to update.
     */
    where: TimeLogWhereUniqueInput
  }

  /**
   * TimeLog updateMany
   */
  export type TimeLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeLogs.
     */
    data: XOR<TimeLogUpdateManyMutationInput, TimeLogUncheckedUpdateManyInput>
    /**
     * Filter which TimeLogs to update
     */
    where?: TimeLogWhereInput
    /**
     * Limit how many TimeLogs to update.
     */
    limit?: number
  }

  /**
   * TimeLog upsert
   */
  export type TimeLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeLog to update in case it exists.
     */
    where: TimeLogWhereUniqueInput
    /**
     * In case the TimeLog found by the `where` argument doesn't exist, create a new TimeLog with this data.
     */
    create: XOR<TimeLogCreateInput, TimeLogUncheckedCreateInput>
    /**
     * In case the TimeLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeLogUpdateInput, TimeLogUncheckedUpdateInput>
  }

  /**
   * TimeLog delete
   */
  export type TimeLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
    /**
     * Filter which TimeLog to delete.
     */
    where: TimeLogWhereUniqueInput
  }

  /**
   * TimeLog deleteMany
   */
  export type TimeLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeLogs to delete
     */
    where?: TimeLogWhereInput
    /**
     * Limit how many TimeLogs to delete.
     */
    limit?: number
  }

  /**
   * TimeLog without action
   */
  export type TimeLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeLog
     */
    select?: TimeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeLog
     */
    omit?: TimeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeLogInclude<ExtArgs> | null
  }


  /**
   * Model Friend
   */

  export type AggregateFriend = {
    _count: FriendCountAggregateOutputType | null
    _min: FriendMinAggregateOutputType | null
    _max: FriendMaxAggregateOutputType | null
  }

  export type FriendMinAggregateOutputType = {
    friendCuid: string | null
    userCuid: string | null
    status: $Enums.FriendStatus | null
  }

  export type FriendMaxAggregateOutputType = {
    friendCuid: string | null
    userCuid: string | null
    status: $Enums.FriendStatus | null
  }

  export type FriendCountAggregateOutputType = {
    friendCuid: number
    userCuid: number
    status: number
    _all: number
  }


  export type FriendMinAggregateInputType = {
    friendCuid?: true
    userCuid?: true
    status?: true
  }

  export type FriendMaxAggregateInputType = {
    friendCuid?: true
    userCuid?: true
    status?: true
  }

  export type FriendCountAggregateInputType = {
    friendCuid?: true
    userCuid?: true
    status?: true
    _all?: true
  }

  export type FriendAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friend to aggregate.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Friends
    **/
    _count?: true | FriendCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendMaxAggregateInputType
  }

  export type GetFriendAggregateType<T extends FriendAggregateArgs> = {
        [P in keyof T & keyof AggregateFriend]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriend[P]>
      : GetScalarType<T[P], AggregateFriend[P]>
  }




  export type FriendGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithAggregationInput | FriendOrderByWithAggregationInput[]
    by: FriendScalarFieldEnum[] | FriendScalarFieldEnum
    having?: FriendScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendCountAggregateInputType | true
    _min?: FriendMinAggregateInputType
    _max?: FriendMaxAggregateInputType
  }

  export type FriendGroupByOutputType = {
    friendCuid: string
    userCuid: string
    status: $Enums.FriendStatus
    _count: FriendCountAggregateOutputType | null
    _min: FriendMinAggregateOutputType | null
    _max: FriendMaxAggregateOutputType | null
  }

  type GetFriendGroupByPayload<T extends FriendGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendGroupByOutputType[P]>
            : GetScalarType<T[P], FriendGroupByOutputType[P]>
        }
      >
    >


  export type FriendSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    friendCuid?: boolean
    userCuid?: boolean
    status?: boolean
    friend?: boolean | UserDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>



  export type FriendSelectScalar = {
    friendCuid?: boolean
    userCuid?: boolean
    status?: boolean
  }

  export type FriendOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"friendCuid" | "userCuid" | "status", ExtArgs["result"]["friend"]>
  export type FriendInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friend?: boolean | UserDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Friend"
    objects: {
      friend: Prisma.$UserPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      friendCuid: string
      userCuid: string
      status: $Enums.FriendStatus
    }, ExtArgs["result"]["friend"]>
    composites: {}
  }

  type FriendGetPayload<S extends boolean | null | undefined | FriendDefaultArgs> = $Result.GetResult<Prisma.$FriendPayload, S>

  type FriendCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendCountAggregateInputType | true
    }

  export interface FriendDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Friend'], meta: { name: 'Friend' } }
    /**
     * Find zero or one Friend that matches the filter.
     * @param {FriendFindUniqueArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendFindUniqueArgs>(args: SelectSubset<T, FriendFindUniqueArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Friend that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendFindUniqueOrThrowArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friend that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindFirstArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendFindFirstArgs>(args?: SelectSubset<T, FriendFindFirstArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friend that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindFirstOrThrowArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Friends that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friends
     * const friends = await prisma.friend.findMany()
     * 
     * // Get first 10 Friends
     * const friends = await prisma.friend.findMany({ take: 10 })
     * 
     * // Only select the `friendCuid`
     * const friendWithFriendCuidOnly = await prisma.friend.findMany({ select: { friendCuid: true } })
     * 
     */
    findMany<T extends FriendFindManyArgs>(args?: SelectSubset<T, FriendFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Friend.
     * @param {FriendCreateArgs} args - Arguments to create a Friend.
     * @example
     * // Create one Friend
     * const Friend = await prisma.friend.create({
     *   data: {
     *     // ... data to create a Friend
     *   }
     * })
     * 
     */
    create<T extends FriendCreateArgs>(args: SelectSubset<T, FriendCreateArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Friends.
     * @param {FriendCreateManyArgs} args - Arguments to create many Friends.
     * @example
     * // Create many Friends
     * const friend = await prisma.friend.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendCreateManyArgs>(args?: SelectSubset<T, FriendCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Friend.
     * @param {FriendDeleteArgs} args - Arguments to delete one Friend.
     * @example
     * // Delete one Friend
     * const Friend = await prisma.friend.delete({
     *   where: {
     *     // ... filter to delete one Friend
     *   }
     * })
     * 
     */
    delete<T extends FriendDeleteArgs>(args: SelectSubset<T, FriendDeleteArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Friend.
     * @param {FriendUpdateArgs} args - Arguments to update one Friend.
     * @example
     * // Update one Friend
     * const friend = await prisma.friend.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendUpdateArgs>(args: SelectSubset<T, FriendUpdateArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Friends.
     * @param {FriendDeleteManyArgs} args - Arguments to filter Friends to delete.
     * @example
     * // Delete a few Friends
     * const { count } = await prisma.friend.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendDeleteManyArgs>(args?: SelectSubset<T, FriendDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friends
     * const friend = await prisma.friend.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendUpdateManyArgs>(args: SelectSubset<T, FriendUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Friend.
     * @param {FriendUpsertArgs} args - Arguments to update or create a Friend.
     * @example
     * // Update or create a Friend
     * const friend = await prisma.friend.upsert({
     *   create: {
     *     // ... data to create a Friend
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friend we want to update
     *   }
     * })
     */
    upsert<T extends FriendUpsertArgs>(args: SelectSubset<T, FriendUpsertArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendCountArgs} args - Arguments to filter Friends to count.
     * @example
     * // Count the number of Friends
     * const count = await prisma.friend.count({
     *   where: {
     *     // ... the filter for the Friends we want to count
     *   }
     * })
    **/
    count<T extends FriendCountArgs>(
      args?: Subset<T, FriendCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Friend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendAggregateArgs>(args: Subset<T, FriendAggregateArgs>): Prisma.PrismaPromise<GetFriendAggregateType<T>>

    /**
     * Group by Friend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendGroupByArgs['orderBy'] }
        : { orderBy?: FriendGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Friend model
   */
  readonly fields: FriendFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Friend.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    friend<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Friend model
   */
  interface FriendFieldRefs {
    readonly friendCuid: FieldRef<"Friend", 'String'>
    readonly userCuid: FieldRef<"Friend", 'String'>
    readonly status: FieldRef<"Friend", 'FriendStatus'>
  }
    

  // Custom InputTypes
  /**
   * Friend findUnique
   */
  export type FriendFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend findUniqueOrThrow
   */
  export type FriendFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend findFirst
   */
  export type FriendFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friends.
     */
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend findFirstOrThrow
   */
  export type FriendFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friends.
     */
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend findMany
   */
  export type FriendFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friends to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend create
   */
  export type FriendCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The data needed to create a Friend.
     */
    data: XOR<FriendCreateInput, FriendUncheckedCreateInput>
  }

  /**
   * Friend createMany
   */
  export type FriendCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Friends.
     */
    data: FriendCreateManyInput | FriendCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Friend update
   */
  export type FriendUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The data needed to update a Friend.
     */
    data: XOR<FriendUpdateInput, FriendUncheckedUpdateInput>
    /**
     * Choose, which Friend to update.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend updateMany
   */
  export type FriendUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Friends.
     */
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyInput>
    /**
     * Filter which Friends to update
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to update.
     */
    limit?: number
  }

  /**
   * Friend upsert
   */
  export type FriendUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The filter to search for the Friend to update in case it exists.
     */
    where: FriendWhereUniqueInput
    /**
     * In case the Friend found by the `where` argument doesn't exist, create a new Friend with this data.
     */
    create: XOR<FriendCreateInput, FriendUncheckedCreateInput>
    /**
     * In case the Friend was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendUpdateInput, FriendUncheckedUpdateInput>
  }

  /**
   * Friend delete
   */
  export type FriendDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter which Friend to delete.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend deleteMany
   */
  export type FriendDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friends to delete
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to delete.
     */
    limit?: number
  }

  /**
   * Friend without action
   */
  export type FriendDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
    userCuid: string | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
    userCuid: string | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    expiresAt: number
    createdAt: number
    userCuid: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    userCuid?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    userCuid?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    userCuid?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    expiresAt: Date
    createdAt: Date
    userCuid: string
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    userCuid?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>



  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    userCuid?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "expiresAt" | "createdAt" | "userCuid", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      expiresAt: Date
      createdAt: Date
      userCuid: string
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly userCuid: FieldRef<"RefreshToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model RoomInvite
   */

  export type AggregateRoomInvite = {
    _count: RoomInviteCountAggregateOutputType | null
    _min: RoomInviteMinAggregateOutputType | null
    _max: RoomInviteMaxAggregateOutputType | null
  }

  export type RoomInviteMinAggregateOutputType = {
    id: string | null
    roomCuid: string | null
    inviterCuid: string | null
    inviteeCuid: string | null
    status: $Enums.RoomInviteStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomInviteMaxAggregateOutputType = {
    id: string | null
    roomCuid: string | null
    inviterCuid: string | null
    inviteeCuid: string | null
    status: $Enums.RoomInviteStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomInviteCountAggregateOutputType = {
    id: number
    roomCuid: number
    inviterCuid: number
    inviteeCuid: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomInviteMinAggregateInputType = {
    id?: true
    roomCuid?: true
    inviterCuid?: true
    inviteeCuid?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomInviteMaxAggregateInputType = {
    id?: true
    roomCuid?: true
    inviterCuid?: true
    inviteeCuid?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomInviteCountAggregateInputType = {
    id?: true
    roomCuid?: true
    inviterCuid?: true
    inviteeCuid?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomInvite to aggregate.
     */
    where?: RoomInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomInvites to fetch.
     */
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomInvites
    **/
    _count?: true | RoomInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomInviteMaxAggregateInputType
  }

  export type GetRoomInviteAggregateType<T extends RoomInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomInvite[P]>
      : GetScalarType<T[P], AggregateRoomInvite[P]>
  }




  export type RoomInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomInviteWhereInput
    orderBy?: RoomInviteOrderByWithAggregationInput | RoomInviteOrderByWithAggregationInput[]
    by: RoomInviteScalarFieldEnum[] | RoomInviteScalarFieldEnum
    having?: RoomInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomInviteCountAggregateInputType | true
    _min?: RoomInviteMinAggregateInputType
    _max?: RoomInviteMaxAggregateInputType
  }

  export type RoomInviteGroupByOutputType = {
    id: string
    roomCuid: string
    inviterCuid: string
    inviteeCuid: string
    status: $Enums.RoomInviteStatus
    createdAt: Date
    updatedAt: Date
    _count: RoomInviteCountAggregateOutputType | null
    _min: RoomInviteMinAggregateOutputType | null
    _max: RoomInviteMaxAggregateOutputType | null
  }

  type GetRoomInviteGroupByPayload<T extends RoomInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomInviteGroupByOutputType[P]>
            : GetScalarType<T[P], RoomInviteGroupByOutputType[P]>
        }
      >
    >


  export type RoomInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomCuid?: boolean
    inviterCuid?: boolean
    inviteeCuid?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    invitee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomInvite"]>



  export type RoomInviteSelectScalar = {
    id?: boolean
    roomCuid?: boolean
    inviterCuid?: boolean
    inviteeCuid?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomCuid" | "inviterCuid" | "inviteeCuid" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["roomInvite"]>
  export type RoomInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    invitee?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoomInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomInvite"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      inviter: Prisma.$UserPayload<ExtArgs>
      invitee: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomCuid: string
      inviterCuid: string
      inviteeCuid: string
      status: $Enums.RoomInviteStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roomInvite"]>
    composites: {}
  }

  type RoomInviteGetPayload<S extends boolean | null | undefined | RoomInviteDefaultArgs> = $Result.GetResult<Prisma.$RoomInvitePayload, S>

  type RoomInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomInviteCountAggregateInputType | true
    }

  export interface RoomInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomInvite'], meta: { name: 'RoomInvite' } }
    /**
     * Find zero or one RoomInvite that matches the filter.
     * @param {RoomInviteFindUniqueArgs} args - Arguments to find a RoomInvite
     * @example
     * // Get one RoomInvite
     * const roomInvite = await prisma.roomInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomInviteFindUniqueArgs>(args: SelectSubset<T, RoomInviteFindUniqueArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomInviteFindUniqueOrThrowArgs} args - Arguments to find a RoomInvite
     * @example
     * // Get one RoomInvite
     * const roomInvite = await prisma.roomInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteFindFirstArgs} args - Arguments to find a RoomInvite
     * @example
     * // Get one RoomInvite
     * const roomInvite = await prisma.roomInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomInviteFindFirstArgs>(args?: SelectSubset<T, RoomInviteFindFirstArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteFindFirstOrThrowArgs} args - Arguments to find a RoomInvite
     * @example
     * // Get one RoomInvite
     * const roomInvite = await prisma.roomInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomInvites
     * const roomInvites = await prisma.roomInvite.findMany()
     * 
     * // Get first 10 RoomInvites
     * const roomInvites = await prisma.roomInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomInviteWithIdOnly = await prisma.roomInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomInviteFindManyArgs>(args?: SelectSubset<T, RoomInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomInvite.
     * @param {RoomInviteCreateArgs} args - Arguments to create a RoomInvite.
     * @example
     * // Create one RoomInvite
     * const RoomInvite = await prisma.roomInvite.create({
     *   data: {
     *     // ... data to create a RoomInvite
     *   }
     * })
     * 
     */
    create<T extends RoomInviteCreateArgs>(args: SelectSubset<T, RoomInviteCreateArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomInvites.
     * @param {RoomInviteCreateManyArgs} args - Arguments to create many RoomInvites.
     * @example
     * // Create many RoomInvites
     * const roomInvite = await prisma.roomInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomInviteCreateManyArgs>(args?: SelectSubset<T, RoomInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RoomInvite.
     * @param {RoomInviteDeleteArgs} args - Arguments to delete one RoomInvite.
     * @example
     * // Delete one RoomInvite
     * const RoomInvite = await prisma.roomInvite.delete({
     *   where: {
     *     // ... filter to delete one RoomInvite
     *   }
     * })
     * 
     */
    delete<T extends RoomInviteDeleteArgs>(args: SelectSubset<T, RoomInviteDeleteArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomInvite.
     * @param {RoomInviteUpdateArgs} args - Arguments to update one RoomInvite.
     * @example
     * // Update one RoomInvite
     * const roomInvite = await prisma.roomInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomInviteUpdateArgs>(args: SelectSubset<T, RoomInviteUpdateArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomInvites.
     * @param {RoomInviteDeleteManyArgs} args - Arguments to filter RoomInvites to delete.
     * @example
     * // Delete a few RoomInvites
     * const { count } = await prisma.roomInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomInviteDeleteManyArgs>(args?: SelectSubset<T, RoomInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomInvites
     * const roomInvite = await prisma.roomInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomInviteUpdateManyArgs>(args: SelectSubset<T, RoomInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoomInvite.
     * @param {RoomInviteUpsertArgs} args - Arguments to update or create a RoomInvite.
     * @example
     * // Update or create a RoomInvite
     * const roomInvite = await prisma.roomInvite.upsert({
     *   create: {
     *     // ... data to create a RoomInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomInvite we want to update
     *   }
     * })
     */
    upsert<T extends RoomInviteUpsertArgs>(args: SelectSubset<T, RoomInviteUpsertArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteCountArgs} args - Arguments to filter RoomInvites to count.
     * @example
     * // Count the number of RoomInvites
     * const count = await prisma.roomInvite.count({
     *   where: {
     *     // ... the filter for the RoomInvites we want to count
     *   }
     * })
    **/
    count<T extends RoomInviteCountArgs>(
      args?: Subset<T, RoomInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomInviteAggregateArgs>(args: Subset<T, RoomInviteAggregateArgs>): Prisma.PrismaPromise<GetRoomInviteAggregateType<T>>

    /**
     * Group by RoomInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomInviteGroupByArgs['orderBy'] }
        : { orderBy?: RoomInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomInvite model
   */
  readonly fields: RoomInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    inviter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invitee<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomInvite model
   */
  interface RoomInviteFieldRefs {
    readonly id: FieldRef<"RoomInvite", 'String'>
    readonly roomCuid: FieldRef<"RoomInvite", 'String'>
    readonly inviterCuid: FieldRef<"RoomInvite", 'String'>
    readonly inviteeCuid: FieldRef<"RoomInvite", 'String'>
    readonly status: FieldRef<"RoomInvite", 'RoomInviteStatus'>
    readonly createdAt: FieldRef<"RoomInvite", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomInvite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomInvite findUnique
   */
  export type RoomInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvite to fetch.
     */
    where: RoomInviteWhereUniqueInput
  }

  /**
   * RoomInvite findUniqueOrThrow
   */
  export type RoomInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvite to fetch.
     */
    where: RoomInviteWhereUniqueInput
  }

  /**
   * RoomInvite findFirst
   */
  export type RoomInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvite to fetch.
     */
    where?: RoomInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomInvites to fetch.
     */
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomInvites.
     */
    cursor?: RoomInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomInvites.
     */
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * RoomInvite findFirstOrThrow
   */
  export type RoomInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvite to fetch.
     */
    where?: RoomInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomInvites to fetch.
     */
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomInvites.
     */
    cursor?: RoomInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomInvites.
     */
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * RoomInvite findMany
   */
  export type RoomInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvites to fetch.
     */
    where?: RoomInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomInvites to fetch.
     */
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomInvites.
     */
    cursor?: RoomInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomInvites.
     */
    skip?: number
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * RoomInvite create
   */
  export type RoomInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomInvite.
     */
    data: XOR<RoomInviteCreateInput, RoomInviteUncheckedCreateInput>
  }

  /**
   * RoomInvite createMany
   */
  export type RoomInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomInvites.
     */
    data: RoomInviteCreateManyInput | RoomInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomInvite update
   */
  export type RoomInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomInvite.
     */
    data: XOR<RoomInviteUpdateInput, RoomInviteUncheckedUpdateInput>
    /**
     * Choose, which RoomInvite to update.
     */
    where: RoomInviteWhereUniqueInput
  }

  /**
   * RoomInvite updateMany
   */
  export type RoomInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomInvites.
     */
    data: XOR<RoomInviteUpdateManyMutationInput, RoomInviteUncheckedUpdateManyInput>
    /**
     * Filter which RoomInvites to update
     */
    where?: RoomInviteWhereInput
    /**
     * Limit how many RoomInvites to update.
     */
    limit?: number
  }

  /**
   * RoomInvite upsert
   */
  export type RoomInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomInvite to update in case it exists.
     */
    where: RoomInviteWhereUniqueInput
    /**
     * In case the RoomInvite found by the `where` argument doesn't exist, create a new RoomInvite with this data.
     */
    create: XOR<RoomInviteCreateInput, RoomInviteUncheckedCreateInput>
    /**
     * In case the RoomInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomInviteUpdateInput, RoomInviteUncheckedUpdateInput>
  }

  /**
   * RoomInvite delete
   */
  export type RoomInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter which RoomInvite to delete.
     */
    where: RoomInviteWhereUniqueInput
  }

  /**
   * RoomInvite deleteMany
   */
  export type RoomInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomInvites to delete
     */
    where?: RoomInviteWhereInput
    /**
     * Limit how many RoomInvites to delete.
     */
    limit?: number
  }

  /**
   * RoomInvite without action
   */
  export type RoomInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomInvite
     */
    omit?: RoomInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    password: 'password',
    nickname: 'nickname',
    profileImg: 'profileImg',
    createdAt: 'createdAt',
    totalStudyTime: 'totalStudyTime'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    ownerCuid: 'ownerCuid'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const RoomParticipationScalarFieldEnum: {
    userCuid: 'userCuid',
    roomCuid: 'roomCuid',
    joinedAt: 'joinedAt'
  };

  export type RoomParticipationScalarFieldEnum = (typeof RoomParticipationScalarFieldEnum)[keyof typeof RoomParticipationScalarFieldEnum]


  export const ScheduleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    createdAt: 'createdAt',
    order: 'order',
    userCuid: 'userCuid',
    date: 'date'
  };

  export type ScheduleScalarFieldEnum = (typeof ScheduleScalarFieldEnum)[keyof typeof ScheduleScalarFieldEnum]


  export const TimeLogScalarFieldEnum: {
    id: 'id',
    totalTime: 'totalTime',
    date: 'date',
    createdAt: 'createdAt',
    roomCuid: 'roomCuid',
    userCuid: 'userCuid'
  };

  export type TimeLogScalarFieldEnum = (typeof TimeLogScalarFieldEnum)[keyof typeof TimeLogScalarFieldEnum]


  export const FriendScalarFieldEnum: {
    friendCuid: 'friendCuid',
    userCuid: 'userCuid',
    status: 'status'
  };

  export type FriendScalarFieldEnum = (typeof FriendScalarFieldEnum)[keyof typeof FriendScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    userCuid: 'userCuid'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const RoomInviteScalarFieldEnum: {
    id: 'id',
    roomCuid: 'roomCuid',
    inviterCuid: 'inviterCuid',
    inviteeCuid: 'inviteeCuid',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomInviteScalarFieldEnum = (typeof RoomInviteScalarFieldEnum)[keyof typeof RoomInviteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    password: 'password',
    nickname: 'nickname',
    profileImg: 'profileImg'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const RoomOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    ownerCuid: 'ownerCuid'
  };

  export type RoomOrderByRelevanceFieldEnum = (typeof RoomOrderByRelevanceFieldEnum)[keyof typeof RoomOrderByRelevanceFieldEnum]


  export const RoomParticipationOrderByRelevanceFieldEnum: {
    userCuid: 'userCuid',
    roomCuid: 'roomCuid'
  };

  export type RoomParticipationOrderByRelevanceFieldEnum = (typeof RoomParticipationOrderByRelevanceFieldEnum)[keyof typeof RoomParticipationOrderByRelevanceFieldEnum]


  export const ScheduleOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    userCuid: 'userCuid',
    date: 'date'
  };

  export type ScheduleOrderByRelevanceFieldEnum = (typeof ScheduleOrderByRelevanceFieldEnum)[keyof typeof ScheduleOrderByRelevanceFieldEnum]


  export const TimeLogOrderByRelevanceFieldEnum: {
    id: 'id',
    roomCuid: 'roomCuid',
    userCuid: 'userCuid'
  };

  export type TimeLogOrderByRelevanceFieldEnum = (typeof TimeLogOrderByRelevanceFieldEnum)[keyof typeof TimeLogOrderByRelevanceFieldEnum]


  export const FriendOrderByRelevanceFieldEnum: {
    friendCuid: 'friendCuid',
    userCuid: 'userCuid'
  };

  export type FriendOrderByRelevanceFieldEnum = (typeof FriendOrderByRelevanceFieldEnum)[keyof typeof FriendOrderByRelevanceFieldEnum]


  export const RefreshTokenOrderByRelevanceFieldEnum: {
    id: 'id',
    token: 'token',
    userCuid: 'userCuid'
  };

  export type RefreshTokenOrderByRelevanceFieldEnum = (typeof RefreshTokenOrderByRelevanceFieldEnum)[keyof typeof RefreshTokenOrderByRelevanceFieldEnum]


  export const RoomInviteOrderByRelevanceFieldEnum: {
    id: 'id',
    roomCuid: 'roomCuid',
    inviterCuid: 'inviterCuid',
    inviteeCuid: 'inviteeCuid'
  };

  export type RoomInviteOrderByRelevanceFieldEnum = (typeof RoomInviteOrderByRelevanceFieldEnum)[keyof typeof RoomInviteOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'ScheduleStatus'
   */
  export type EnumScheduleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScheduleStatus'>
    


  /**
   * Reference to a field of type 'FriendStatus'
   */
  export type EnumFriendStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FriendStatus'>
    


  /**
   * Reference to a field of type 'RoomInviteStatus'
   */
  export type EnumRoomInviteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomInviteStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    userId?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    nickname?: StringFilter<"User"> | string
    profileImg?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    totalStudyTime?: IntFilter<"User"> | number
    friendsFrom?: FriendListRelationFilter
    friendsTo?: FriendListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    schedules?: ScheduleListRelationFilter
    timeLogs?: TimeLogListRelationFilter
    roomParticipations?: RoomParticipationListRelationFilter
    ownedRooms?: RoomListRelationFilter
    sentRoomInvites?: RoomInviteListRelationFilter
    receivedRoomInvites?: RoomInviteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImg?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    totalStudyTime?: SortOrder
    friendsFrom?: FriendOrderByRelationAggregateInput
    friendsTo?: FriendOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    schedules?: ScheduleOrderByRelationAggregateInput
    timeLogs?: TimeLogOrderByRelationAggregateInput
    roomParticipations?: RoomParticipationOrderByRelationAggregateInput
    ownedRooms?: RoomOrderByRelationAggregateInput
    sentRoomInvites?: RoomInviteOrderByRelationAggregateInput
    receivedRoomInvites?: RoomInviteOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    nickname?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    profileImg?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    totalStudyTime?: IntFilter<"User"> | number
    friendsFrom?: FriendListRelationFilter
    friendsTo?: FriendListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    schedules?: ScheduleListRelationFilter
    timeLogs?: TimeLogListRelationFilter
    roomParticipations?: RoomParticipationListRelationFilter
    ownedRooms?: RoomListRelationFilter
    sentRoomInvites?: RoomInviteListRelationFilter
    receivedRoomInvites?: RoomInviteListRelationFilter
  }, "id" | "userId" | "nickname">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImg?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    totalStudyTime?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    userId?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    nickname?: StringWithAggregatesFilter<"User"> | string
    profileImg?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    totalStudyTime?: IntWithAggregatesFilter<"User"> | number
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    createdAt?: DateTimeNullableFilter<"Room"> | Date | string | null
    ownerCuid?: StringFilter<"Room"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    participants?: RoomParticipationListRelationFilter
    timeLogs?: TimeLogListRelationFilter
    invites?: RoomInviteListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    ownerCuid?: SortOrder
    owner?: UserOrderByWithRelationInput
    participants?: RoomParticipationOrderByRelationAggregateInput
    timeLogs?: TimeLogOrderByRelationAggregateInput
    invites?: RoomInviteOrderByRelationAggregateInput
    _relevance?: RoomOrderByRelevanceInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    name?: StringFilter<"Room"> | string
    createdAt?: DateTimeNullableFilter<"Room"> | Date | string | null
    ownerCuid?: StringFilter<"Room"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    participants?: RoomParticipationListRelationFilter
    timeLogs?: TimeLogListRelationFilter
    invites?: RoomInviteListRelationFilter
  }, "id">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    ownerCuid?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    name?: StringWithAggregatesFilter<"Room"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"Room"> | Date | string | null
    ownerCuid?: StringWithAggregatesFilter<"Room"> | string
  }

  export type RoomParticipationWhereInput = {
    AND?: RoomParticipationWhereInput | RoomParticipationWhereInput[]
    OR?: RoomParticipationWhereInput[]
    NOT?: RoomParticipationWhereInput | RoomParticipationWhereInput[]
    userCuid?: StringFilter<"RoomParticipation"> | string
    roomCuid?: StringFilter<"RoomParticipation"> | string
    joinedAt?: DateTimeFilter<"RoomParticipation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }

  export type RoomParticipationOrderByWithRelationInput = {
    userCuid?: SortOrder
    roomCuid?: SortOrder
    joinedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
    _relevance?: RoomParticipationOrderByRelevanceInput
  }

  export type RoomParticipationWhereUniqueInput = Prisma.AtLeast<{
    userCuid_roomCuid?: RoomParticipationUserCuidRoomCuidCompoundUniqueInput
    AND?: RoomParticipationWhereInput | RoomParticipationWhereInput[]
    OR?: RoomParticipationWhereInput[]
    NOT?: RoomParticipationWhereInput | RoomParticipationWhereInput[]
    userCuid?: StringFilter<"RoomParticipation"> | string
    roomCuid?: StringFilter<"RoomParticipation"> | string
    joinedAt?: DateTimeFilter<"RoomParticipation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }, "userCuid_roomCuid">

  export type RoomParticipationOrderByWithAggregationInput = {
    userCuid?: SortOrder
    roomCuid?: SortOrder
    joinedAt?: SortOrder
    _count?: RoomParticipationCountOrderByAggregateInput
    _max?: RoomParticipationMaxOrderByAggregateInput
    _min?: RoomParticipationMinOrderByAggregateInput
  }

  export type RoomParticipationScalarWhereWithAggregatesInput = {
    AND?: RoomParticipationScalarWhereWithAggregatesInput | RoomParticipationScalarWhereWithAggregatesInput[]
    OR?: RoomParticipationScalarWhereWithAggregatesInput[]
    NOT?: RoomParticipationScalarWhereWithAggregatesInput | RoomParticipationScalarWhereWithAggregatesInput[]
    userCuid?: StringWithAggregatesFilter<"RoomParticipation"> | string
    roomCuid?: StringWithAggregatesFilter<"RoomParticipation"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"RoomParticipation"> | Date | string
  }

  export type ScheduleWhereInput = {
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    id?: StringFilter<"Schedule"> | string
    title?: StringFilter<"Schedule"> | string
    startTime?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    status?: EnumScheduleStatusFilter<"Schedule"> | $Enums.ScheduleStatus
    createdAt?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    order?: IntFilter<"Schedule"> | number
    userCuid?: StringFilter<"Schedule"> | string
    date?: StringFilter<"Schedule"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ScheduleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    order?: SortOrder
    userCuid?: SortOrder
    date?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: ScheduleOrderByRelevanceInput
  }

  export type ScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    title?: StringFilter<"Schedule"> | string
    startTime?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    status?: EnumScheduleStatusFilter<"Schedule"> | $Enums.ScheduleStatus
    createdAt?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    order?: IntFilter<"Schedule"> | number
    userCuid?: StringFilter<"Schedule"> | string
    date?: StringFilter<"Schedule"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    order?: SortOrder
    userCuid?: SortOrder
    date?: SortOrder
    _count?: ScheduleCountOrderByAggregateInput
    _avg?: ScheduleAvgOrderByAggregateInput
    _max?: ScheduleMaxOrderByAggregateInput
    _min?: ScheduleMinOrderByAggregateInput
    _sum?: ScheduleSumOrderByAggregateInput
  }

  export type ScheduleScalarWhereWithAggregatesInput = {
    AND?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    OR?: ScheduleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Schedule"> | string
    title?: StringWithAggregatesFilter<"Schedule"> | string
    startTime?: DateTimeNullableWithAggregatesFilter<"Schedule"> | Date | string | null
    endTime?: DateTimeNullableWithAggregatesFilter<"Schedule"> | Date | string | null
    status?: EnumScheduleStatusWithAggregatesFilter<"Schedule"> | $Enums.ScheduleStatus
    createdAt?: DateTimeNullableWithAggregatesFilter<"Schedule"> | Date | string | null
    order?: IntWithAggregatesFilter<"Schedule"> | number
    userCuid?: StringWithAggregatesFilter<"Schedule"> | string
    date?: StringWithAggregatesFilter<"Schedule"> | string
  }

  export type TimeLogWhereInput = {
    AND?: TimeLogWhereInput | TimeLogWhereInput[]
    OR?: TimeLogWhereInput[]
    NOT?: TimeLogWhereInput | TimeLogWhereInput[]
    id?: StringFilter<"TimeLog"> | string
    totalTime?: IntFilter<"TimeLog"> | number
    date?: DateTimeFilter<"TimeLog"> | Date | string
    createdAt?: DateTimeNullableFilter<"TimeLog"> | Date | string | null
    roomCuid?: StringFilter<"TimeLog"> | string
    userCuid?: StringFilter<"TimeLog"> | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TimeLogOrderByWithRelationInput = {
    id?: SortOrder
    totalTime?: SortOrder
    date?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    roomCuid?: SortOrder
    userCuid?: SortOrder
    room?: RoomOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: TimeLogOrderByRelevanceInput
  }

  export type TimeLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimeLogWhereInput | TimeLogWhereInput[]
    OR?: TimeLogWhereInput[]
    NOT?: TimeLogWhereInput | TimeLogWhereInput[]
    totalTime?: IntFilter<"TimeLog"> | number
    date?: DateTimeFilter<"TimeLog"> | Date | string
    createdAt?: DateTimeNullableFilter<"TimeLog"> | Date | string | null
    roomCuid?: StringFilter<"TimeLog"> | string
    userCuid?: StringFilter<"TimeLog"> | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TimeLogOrderByWithAggregationInput = {
    id?: SortOrder
    totalTime?: SortOrder
    date?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    roomCuid?: SortOrder
    userCuid?: SortOrder
    _count?: TimeLogCountOrderByAggregateInput
    _avg?: TimeLogAvgOrderByAggregateInput
    _max?: TimeLogMaxOrderByAggregateInput
    _min?: TimeLogMinOrderByAggregateInput
    _sum?: TimeLogSumOrderByAggregateInput
  }

  export type TimeLogScalarWhereWithAggregatesInput = {
    AND?: TimeLogScalarWhereWithAggregatesInput | TimeLogScalarWhereWithAggregatesInput[]
    OR?: TimeLogScalarWhereWithAggregatesInput[]
    NOT?: TimeLogScalarWhereWithAggregatesInput | TimeLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimeLog"> | string
    totalTime?: IntWithAggregatesFilter<"TimeLog"> | number
    date?: DateTimeWithAggregatesFilter<"TimeLog"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"TimeLog"> | Date | string | null
    roomCuid?: StringWithAggregatesFilter<"TimeLog"> | string
    userCuid?: StringWithAggregatesFilter<"TimeLog"> | string
  }

  export type FriendWhereInput = {
    AND?: FriendWhereInput | FriendWhereInput[]
    OR?: FriendWhereInput[]
    NOT?: FriendWhereInput | FriendWhereInput[]
    friendCuid?: StringFilter<"Friend"> | string
    userCuid?: StringFilter<"Friend"> | string
    status?: EnumFriendStatusFilter<"Friend"> | $Enums.FriendStatus
    friend?: XOR<UserScalarRelationFilter, UserWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FriendOrderByWithRelationInput = {
    friendCuid?: SortOrder
    userCuid?: SortOrder
    status?: SortOrder
    friend?: UserOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: FriendOrderByRelevanceInput
  }

  export type FriendWhereUniqueInput = Prisma.AtLeast<{
    userCuid_friendCuid?: FriendUserCuidFriendCuidCompoundUniqueInput
    AND?: FriendWhereInput | FriendWhereInput[]
    OR?: FriendWhereInput[]
    NOT?: FriendWhereInput | FriendWhereInput[]
    friendCuid?: StringFilter<"Friend"> | string
    userCuid?: StringFilter<"Friend"> | string
    status?: EnumFriendStatusFilter<"Friend"> | $Enums.FriendStatus
    friend?: XOR<UserScalarRelationFilter, UserWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userCuid_friendCuid">

  export type FriendOrderByWithAggregationInput = {
    friendCuid?: SortOrder
    userCuid?: SortOrder
    status?: SortOrder
    _count?: FriendCountOrderByAggregateInput
    _max?: FriendMaxOrderByAggregateInput
    _min?: FriendMinOrderByAggregateInput
  }

  export type FriendScalarWhereWithAggregatesInput = {
    AND?: FriendScalarWhereWithAggregatesInput | FriendScalarWhereWithAggregatesInput[]
    OR?: FriendScalarWhereWithAggregatesInput[]
    NOT?: FriendScalarWhereWithAggregatesInput | FriendScalarWhereWithAggregatesInput[]
    friendCuid?: StringWithAggregatesFilter<"Friend"> | string
    userCuid?: StringWithAggregatesFilter<"Friend"> | string
    status?: EnumFriendStatusWithAggregatesFilter<"Friend"> | $Enums.FriendStatus
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    userCuid?: StringFilter<"RefreshToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userCuid?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: RefreshTokenOrderByRelevanceInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    userCuid?: StringFilter<"RefreshToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userCuid?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    userCuid?: StringWithAggregatesFilter<"RefreshToken"> | string
  }

  export type RoomInviteWhereInput = {
    AND?: RoomInviteWhereInput | RoomInviteWhereInput[]
    OR?: RoomInviteWhereInput[]
    NOT?: RoomInviteWhereInput | RoomInviteWhereInput[]
    id?: StringFilter<"RoomInvite"> | string
    roomCuid?: StringFilter<"RoomInvite"> | string
    inviterCuid?: StringFilter<"RoomInvite"> | string
    inviteeCuid?: StringFilter<"RoomInvite"> | string
    status?: EnumRoomInviteStatusFilter<"RoomInvite"> | $Enums.RoomInviteStatus
    createdAt?: DateTimeFilter<"RoomInvite"> | Date | string
    updatedAt?: DateTimeFilter<"RoomInvite"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    inviter?: XOR<UserScalarRelationFilter, UserWhereInput>
    invitee?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RoomInviteOrderByWithRelationInput = {
    id?: SortOrder
    roomCuid?: SortOrder
    inviterCuid?: SortOrder
    inviteeCuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    room?: RoomOrderByWithRelationInput
    inviter?: UserOrderByWithRelationInput
    invitee?: UserOrderByWithRelationInput
    _relevance?: RoomInviteOrderByRelevanceInput
  }

  export type RoomInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomCuid_inviteeCuid?: RoomInviteRoomCuidInviteeCuidCompoundUniqueInput
    AND?: RoomInviteWhereInput | RoomInviteWhereInput[]
    OR?: RoomInviteWhereInput[]
    NOT?: RoomInviteWhereInput | RoomInviteWhereInput[]
    roomCuid?: StringFilter<"RoomInvite"> | string
    inviterCuid?: StringFilter<"RoomInvite"> | string
    inviteeCuid?: StringFilter<"RoomInvite"> | string
    status?: EnumRoomInviteStatusFilter<"RoomInvite"> | $Enums.RoomInviteStatus
    createdAt?: DateTimeFilter<"RoomInvite"> | Date | string
    updatedAt?: DateTimeFilter<"RoomInvite"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    inviter?: XOR<UserScalarRelationFilter, UserWhereInput>
    invitee?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "roomCuid_inviteeCuid">

  export type RoomInviteOrderByWithAggregationInput = {
    id?: SortOrder
    roomCuid?: SortOrder
    inviterCuid?: SortOrder
    inviteeCuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomInviteCountOrderByAggregateInput
    _max?: RoomInviteMaxOrderByAggregateInput
    _min?: RoomInviteMinOrderByAggregateInput
  }

  export type RoomInviteScalarWhereWithAggregatesInput = {
    AND?: RoomInviteScalarWhereWithAggregatesInput | RoomInviteScalarWhereWithAggregatesInput[]
    OR?: RoomInviteScalarWhereWithAggregatesInput[]
    NOT?: RoomInviteScalarWhereWithAggregatesInput | RoomInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomInvite"> | string
    roomCuid?: StringWithAggregatesFilter<"RoomInvite"> | string
    inviterCuid?: StringWithAggregatesFilter<"RoomInvite"> | string
    inviteeCuid?: StringWithAggregatesFilter<"RoomInvite"> | string
    status?: EnumRoomInviteStatusWithAggregatesFilter<"RoomInvite"> | $Enums.RoomInviteStatus
    createdAt?: DateTimeWithAggregatesFilter<"RoomInvite"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomInvite"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendCreateNestedManyWithoutFriendInput
    friendsTo?: FriendCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    schedules?: ScheduleCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationCreateNestedManyWithoutUserInput
    ownedRooms?: RoomCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteCreateNestedManyWithoutInviteeInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendsTo?: FriendUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationUncheckedCreateNestedManyWithoutUserInput
    ownedRooms?: RoomUncheckedCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUpdateManyWithoutInviteeNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUncheckedUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUncheckedUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
  }

  export type RoomCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedRoomsInput
    participants?: RoomParticipationCreateNestedManyWithoutRoomInput
    timeLogs?: TimeLogCreateNestedManyWithoutRoomInput
    invites?: RoomInviteCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    ownerCuid: string
    participants?: RoomParticipationUncheckedCreateNestedManyWithoutRoomInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutRoomInput
    invites?: RoomInviteUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedRoomsNestedInput
    participants?: RoomParticipationUpdateManyWithoutRoomNestedInput
    timeLogs?: TimeLogUpdateManyWithoutRoomNestedInput
    invites?: RoomInviteUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerCuid?: StringFieldUpdateOperationsInput | string
    participants?: RoomParticipationUncheckedUpdateManyWithoutRoomNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutRoomNestedInput
    invites?: RoomInviteUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    ownerCuid: string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerCuid?: StringFieldUpdateOperationsInput | string
  }

  export type RoomParticipationCreateInput = {
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutRoomParticipationsInput
    room: RoomCreateNestedOneWithoutParticipantsInput
  }

  export type RoomParticipationUncheckedCreateInput = {
    userCuid: string
    roomCuid: string
    joinedAt?: Date | string
  }

  export type RoomParticipationUpdateInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoomParticipationsNestedInput
    room?: RoomUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type RoomParticipationUncheckedUpdateInput = {
    userCuid?: StringFieldUpdateOperationsInput | string
    roomCuid?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomParticipationCreateManyInput = {
    userCuid: string
    roomCuid: string
    joinedAt?: Date | string
  }

  export type RoomParticipationUpdateManyMutationInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomParticipationUncheckedUpdateManyInput = {
    userCuid?: StringFieldUpdateOperationsInput | string
    roomCuid?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateInput = {
    id?: string
    title: string
    startTime?: Date | string | null
    endTime?: Date | string | null
    status?: $Enums.ScheduleStatus
    createdAt?: Date | string | null
    order?: number
    date: string
    user: UserCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateInput = {
    id?: string
    title: string
    startTime?: Date | string | null
    endTime?: Date | string | null
    status?: $Enums.ScheduleStatus
    createdAt?: Date | string | null
    order?: number
    userCuid: string
    date: string
  }

  export type ScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    userCuid?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
  }

  export type ScheduleCreateManyInput = {
    id?: string
    title: string
    startTime?: Date | string | null
    endTime?: Date | string | null
    status?: $Enums.ScheduleStatus
    createdAt?: Date | string | null
    order?: number
    userCuid: string
    date: string
  }

  export type ScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
  }

  export type ScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    userCuid?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
  }

  export type TimeLogCreateInput = {
    id?: string
    totalTime: number
    date: Date | string
    createdAt?: Date | string | null
    room: RoomCreateNestedOneWithoutTimeLogsInput
    user: UserCreateNestedOneWithoutTimeLogsInput
  }

  export type TimeLogUncheckedCreateInput = {
    id?: string
    totalTime: number
    date: Date | string
    createdAt?: Date | string | null
    roomCuid: string
    userCuid: string
  }

  export type TimeLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    room?: RoomUpdateOneRequiredWithoutTimeLogsNestedInput
    user?: UserUpdateOneRequiredWithoutTimeLogsNestedInput
  }

  export type TimeLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roomCuid?: StringFieldUpdateOperationsInput | string
    userCuid?: StringFieldUpdateOperationsInput | string
  }

  export type TimeLogCreateManyInput = {
    id?: string
    totalTime: number
    date: Date | string
    createdAt?: Date | string | null
    roomCuid: string
    userCuid: string
  }

  export type TimeLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TimeLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roomCuid?: StringFieldUpdateOperationsInput | string
    userCuid?: StringFieldUpdateOperationsInput | string
  }

  export type FriendCreateInput = {
    status?: $Enums.FriendStatus
    friend: UserCreateNestedOneWithoutFriendsFromInput
    user: UserCreateNestedOneWithoutFriendsToInput
  }

  export type FriendUncheckedCreateInput = {
    friendCuid: string
    userCuid: string
    status?: $Enums.FriendStatus
  }

  export type FriendUpdateInput = {
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    friend?: UserUpdateOneRequiredWithoutFriendsFromNestedInput
    user?: UserUpdateOneRequiredWithoutFriendsToNestedInput
  }

  export type FriendUncheckedUpdateInput = {
    friendCuid?: StringFieldUpdateOperationsInput | string
    userCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
  }

  export type FriendCreateManyInput = {
    friendCuid: string
    userCuid: string
    status?: $Enums.FriendStatus
  }

  export type FriendUpdateManyMutationInput = {
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
  }

  export type FriendUncheckedUpdateManyInput = {
    friendCuid?: StringFieldUpdateOperationsInput | string
    userCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    userCuid: string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userCuid?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    userCuid: string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userCuid?: StringFieldUpdateOperationsInput | string
  }

  export type RoomInviteCreateInput = {
    id?: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutInvitesInput
    inviter: UserCreateNestedOneWithoutSentRoomInvitesInput
    invitee: UserCreateNestedOneWithoutReceivedRoomInvitesInput
  }

  export type RoomInviteUncheckedCreateInput = {
    id?: string
    roomCuid: string
    inviterCuid: string
    inviteeCuid: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutInvitesNestedInput
    inviter?: UserUpdateOneRequiredWithoutSentRoomInvitesNestedInput
    invitee?: UserUpdateOneRequiredWithoutReceivedRoomInvitesNestedInput
  }

  export type RoomInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCuid?: StringFieldUpdateOperationsInput | string
    inviterCuid?: StringFieldUpdateOperationsInput | string
    inviteeCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomInviteCreateManyInput = {
    id?: string
    roomCuid: string
    inviterCuid: string
    inviteeCuid: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCuid?: StringFieldUpdateOperationsInput | string
    inviterCuid?: StringFieldUpdateOperationsInput | string
    inviteeCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FriendListRelationFilter = {
    every?: FriendWhereInput
    some?: FriendWhereInput
    none?: FriendWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type ScheduleListRelationFilter = {
    every?: ScheduleWhereInput
    some?: ScheduleWhereInput
    none?: ScheduleWhereInput
  }

  export type TimeLogListRelationFilter = {
    every?: TimeLogWhereInput
    some?: TimeLogWhereInput
    none?: TimeLogWhereInput
  }

  export type RoomParticipationListRelationFilter = {
    every?: RoomParticipationWhereInput
    some?: RoomParticipationWhereInput
    none?: RoomParticipationWhereInput
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type RoomInviteListRelationFilter = {
    every?: RoomInviteWhereInput
    some?: RoomInviteWhereInput
    none?: RoomInviteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FriendOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TimeLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomParticipationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImg?: SortOrder
    createdAt?: SortOrder
    totalStudyTime?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    totalStudyTime?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImg?: SortOrder
    createdAt?: SortOrder
    totalStudyTime?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImg?: SortOrder
    createdAt?: SortOrder
    totalStudyTime?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    totalStudyTime?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RoomOrderByRelevanceInput = {
    fields: RoomOrderByRelevanceFieldEnum | RoomOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    ownerCuid?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    ownerCuid?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    ownerCuid?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type RoomParticipationOrderByRelevanceInput = {
    fields: RoomParticipationOrderByRelevanceFieldEnum | RoomParticipationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RoomParticipationUserCuidRoomCuidCompoundUniqueInput = {
    userCuid: string
    roomCuid: string
  }

  export type RoomParticipationCountOrderByAggregateInput = {
    userCuid?: SortOrder
    roomCuid?: SortOrder
    joinedAt?: SortOrder
  }

  export type RoomParticipationMaxOrderByAggregateInput = {
    userCuid?: SortOrder
    roomCuid?: SortOrder
    joinedAt?: SortOrder
  }

  export type RoomParticipationMinOrderByAggregateInput = {
    userCuid?: SortOrder
    roomCuid?: SortOrder
    joinedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumScheduleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[]
    notIn?: $Enums.ScheduleStatus[]
    not?: NestedEnumScheduleStatusFilter<$PrismaModel> | $Enums.ScheduleStatus
  }

  export type ScheduleOrderByRelevanceInput = {
    fields: ScheduleOrderByRelevanceFieldEnum | ScheduleOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    order?: SortOrder
    userCuid?: SortOrder
    date?: SortOrder
  }

  export type ScheduleAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    order?: SortOrder
    userCuid?: SortOrder
    date?: SortOrder
  }

  export type ScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    order?: SortOrder
    userCuid?: SortOrder
    date?: SortOrder
  }

  export type ScheduleSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type EnumScheduleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[]
    notIn?: $Enums.ScheduleStatus[]
    not?: NestedEnumScheduleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScheduleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScheduleStatusFilter<$PrismaModel>
    _max?: NestedEnumScheduleStatusFilter<$PrismaModel>
  }

  export type TimeLogOrderByRelevanceInput = {
    fields: TimeLogOrderByRelevanceFieldEnum | TimeLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TimeLogCountOrderByAggregateInput = {
    id?: SortOrder
    totalTime?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    roomCuid?: SortOrder
    userCuid?: SortOrder
  }

  export type TimeLogAvgOrderByAggregateInput = {
    totalTime?: SortOrder
  }

  export type TimeLogMaxOrderByAggregateInput = {
    id?: SortOrder
    totalTime?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    roomCuid?: SortOrder
    userCuid?: SortOrder
  }

  export type TimeLogMinOrderByAggregateInput = {
    id?: SortOrder
    totalTime?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    roomCuid?: SortOrder
    userCuid?: SortOrder
  }

  export type TimeLogSumOrderByAggregateInput = {
    totalTime?: SortOrder
  }

  export type EnumFriendStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[]
    notIn?: $Enums.FriendStatus[]
    not?: NestedEnumFriendStatusFilter<$PrismaModel> | $Enums.FriendStatus
  }

  export type FriendOrderByRelevanceInput = {
    fields: FriendOrderByRelevanceFieldEnum | FriendOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FriendUserCuidFriendCuidCompoundUniqueInput = {
    userCuid: string
    friendCuid: string
  }

  export type FriendCountOrderByAggregateInput = {
    friendCuid?: SortOrder
    userCuid?: SortOrder
    status?: SortOrder
  }

  export type FriendMaxOrderByAggregateInput = {
    friendCuid?: SortOrder
    userCuid?: SortOrder
    status?: SortOrder
  }

  export type FriendMinOrderByAggregateInput = {
    friendCuid?: SortOrder
    userCuid?: SortOrder
    status?: SortOrder
  }

  export type EnumFriendStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[]
    notIn?: $Enums.FriendStatus[]
    not?: NestedEnumFriendStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendStatusFilter<$PrismaModel>
  }

  export type RefreshTokenOrderByRelevanceInput = {
    fields: RefreshTokenOrderByRelevanceFieldEnum | RefreshTokenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userCuid?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userCuid?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userCuid?: SortOrder
  }

  export type EnumRoomInviteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomInviteStatus | EnumRoomInviteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomInviteStatus[]
    notIn?: $Enums.RoomInviteStatus[]
    not?: NestedEnumRoomInviteStatusFilter<$PrismaModel> | $Enums.RoomInviteStatus
  }

  export type RoomInviteOrderByRelevanceInput = {
    fields: RoomInviteOrderByRelevanceFieldEnum | RoomInviteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RoomInviteRoomCuidInviteeCuidCompoundUniqueInput = {
    roomCuid: string
    inviteeCuid: string
  }

  export type RoomInviteCountOrderByAggregateInput = {
    id?: SortOrder
    roomCuid?: SortOrder
    inviterCuid?: SortOrder
    inviteeCuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    roomCuid?: SortOrder
    inviterCuid?: SortOrder
    inviteeCuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomInviteMinOrderByAggregateInput = {
    id?: SortOrder
    roomCuid?: SortOrder
    inviterCuid?: SortOrder
    inviteeCuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoomInviteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomInviteStatus | EnumRoomInviteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomInviteStatus[]
    notIn?: $Enums.RoomInviteStatus[]
    not?: NestedEnumRoomInviteStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoomInviteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomInviteStatusFilter<$PrismaModel>
    _max?: NestedEnumRoomInviteStatusFilter<$PrismaModel>
  }

  export type FriendCreateNestedManyWithoutFriendInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type ScheduleCreateNestedManyWithoutUserInput = {
    create?: XOR<ScheduleCreateWithoutUserInput, ScheduleUncheckedCreateWithoutUserInput> | ScheduleCreateWithoutUserInput[] | ScheduleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutUserInput | ScheduleCreateOrConnectWithoutUserInput[]
    createMany?: ScheduleCreateManyUserInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type TimeLogCreateNestedManyWithoutUserInput = {
    create?: XOR<TimeLogCreateWithoutUserInput, TimeLogUncheckedCreateWithoutUserInput> | TimeLogCreateWithoutUserInput[] | TimeLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeLogCreateOrConnectWithoutUserInput | TimeLogCreateOrConnectWithoutUserInput[]
    createMany?: TimeLogCreateManyUserInputEnvelope
    connect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
  }

  export type RoomParticipationCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomParticipationCreateWithoutUserInput, RoomParticipationUncheckedCreateWithoutUserInput> | RoomParticipationCreateWithoutUserInput[] | RoomParticipationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomParticipationCreateOrConnectWithoutUserInput | RoomParticipationCreateOrConnectWithoutUserInput[]
    createMany?: RoomParticipationCreateManyUserInputEnvelope
    connect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
  }

  export type RoomCreateNestedManyWithoutOwnerInput = {
    create?: XOR<RoomCreateWithoutOwnerInput, RoomUncheckedCreateWithoutOwnerInput> | RoomCreateWithoutOwnerInput[] | RoomUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutOwnerInput | RoomCreateOrConnectWithoutOwnerInput[]
    createMany?: RoomCreateManyOwnerInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomInviteCreateNestedManyWithoutInviterInput = {
    create?: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput> | RoomInviteCreateWithoutInviterInput[] | RoomInviteUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviterInput | RoomInviteCreateOrConnectWithoutInviterInput[]
    createMany?: RoomInviteCreateManyInviterInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type RoomInviteCreateNestedManyWithoutInviteeInput = {
    create?: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput> | RoomInviteCreateWithoutInviteeInput[] | RoomInviteUncheckedCreateWithoutInviteeInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviteeInput | RoomInviteCreateOrConnectWithoutInviteeInput[]
    createMany?: RoomInviteCreateManyInviteeInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type FriendUncheckedCreateNestedManyWithoutFriendInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ScheduleCreateWithoutUserInput, ScheduleUncheckedCreateWithoutUserInput> | ScheduleCreateWithoutUserInput[] | ScheduleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutUserInput | ScheduleCreateOrConnectWithoutUserInput[]
    createMany?: ScheduleCreateManyUserInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type TimeLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TimeLogCreateWithoutUserInput, TimeLogUncheckedCreateWithoutUserInput> | TimeLogCreateWithoutUserInput[] | TimeLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeLogCreateOrConnectWithoutUserInput | TimeLogCreateOrConnectWithoutUserInput[]
    createMany?: TimeLogCreateManyUserInputEnvelope
    connect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
  }

  export type RoomParticipationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomParticipationCreateWithoutUserInput, RoomParticipationUncheckedCreateWithoutUserInput> | RoomParticipationCreateWithoutUserInput[] | RoomParticipationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomParticipationCreateOrConnectWithoutUserInput | RoomParticipationCreateOrConnectWithoutUserInput[]
    createMany?: RoomParticipationCreateManyUserInputEnvelope
    connect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<RoomCreateWithoutOwnerInput, RoomUncheckedCreateWithoutOwnerInput> | RoomCreateWithoutOwnerInput[] | RoomUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutOwnerInput | RoomCreateOrConnectWithoutOwnerInput[]
    createMany?: RoomCreateManyOwnerInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomInviteUncheckedCreateNestedManyWithoutInviterInput = {
    create?: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput> | RoomInviteCreateWithoutInviterInput[] | RoomInviteUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviterInput | RoomInviteCreateOrConnectWithoutInviterInput[]
    createMany?: RoomInviteCreateManyInviterInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type RoomInviteUncheckedCreateNestedManyWithoutInviteeInput = {
    create?: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput> | RoomInviteCreateWithoutInviteeInput[] | RoomInviteUncheckedCreateWithoutInviteeInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviteeInput | RoomInviteCreateOrConnectWithoutInviteeInput[]
    createMany?: RoomInviteCreateManyInviteeInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FriendUpdateManyWithoutFriendNestedInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutFriendInput | FriendUpsertWithWhereUniqueWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutFriendInput | FriendUpdateWithWhereUniqueWithoutFriendInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutFriendInput | FriendUpdateManyWithWhereWithoutFriendInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutUserInput | FriendUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutUserInput | FriendUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutUserInput | FriendUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type ScheduleUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScheduleCreateWithoutUserInput, ScheduleUncheckedCreateWithoutUserInput> | ScheduleCreateWithoutUserInput[] | ScheduleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutUserInput | ScheduleCreateOrConnectWithoutUserInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutUserInput | ScheduleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScheduleCreateManyUserInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutUserInput | ScheduleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutUserInput | ScheduleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type TimeLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<TimeLogCreateWithoutUserInput, TimeLogUncheckedCreateWithoutUserInput> | TimeLogCreateWithoutUserInput[] | TimeLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeLogCreateOrConnectWithoutUserInput | TimeLogCreateOrConnectWithoutUserInput[]
    upsert?: TimeLogUpsertWithWhereUniqueWithoutUserInput | TimeLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TimeLogCreateManyUserInputEnvelope
    set?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    disconnect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    delete?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    connect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    update?: TimeLogUpdateWithWhereUniqueWithoutUserInput | TimeLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TimeLogUpdateManyWithWhereWithoutUserInput | TimeLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TimeLogScalarWhereInput | TimeLogScalarWhereInput[]
  }

  export type RoomParticipationUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomParticipationCreateWithoutUserInput, RoomParticipationUncheckedCreateWithoutUserInput> | RoomParticipationCreateWithoutUserInput[] | RoomParticipationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomParticipationCreateOrConnectWithoutUserInput | RoomParticipationCreateOrConnectWithoutUserInput[]
    upsert?: RoomParticipationUpsertWithWhereUniqueWithoutUserInput | RoomParticipationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomParticipationCreateManyUserInputEnvelope
    set?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    disconnect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    delete?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    connect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    update?: RoomParticipationUpdateWithWhereUniqueWithoutUserInput | RoomParticipationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomParticipationUpdateManyWithWhereWithoutUserInput | RoomParticipationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomParticipationScalarWhereInput | RoomParticipationScalarWhereInput[]
  }

  export type RoomUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<RoomCreateWithoutOwnerInput, RoomUncheckedCreateWithoutOwnerInput> | RoomCreateWithoutOwnerInput[] | RoomUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutOwnerInput | RoomCreateOrConnectWithoutOwnerInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutOwnerInput | RoomUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: RoomCreateManyOwnerInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutOwnerInput | RoomUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutOwnerInput | RoomUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomInviteUpdateManyWithoutInviterNestedInput = {
    create?: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput> | RoomInviteCreateWithoutInviterInput[] | RoomInviteUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviterInput | RoomInviteCreateOrConnectWithoutInviterInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutInviterInput | RoomInviteUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: RoomInviteCreateManyInviterInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutInviterInput | RoomInviteUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutInviterInput | RoomInviteUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type RoomInviteUpdateManyWithoutInviteeNestedInput = {
    create?: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput> | RoomInviteCreateWithoutInviteeInput[] | RoomInviteUncheckedCreateWithoutInviteeInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviteeInput | RoomInviteCreateOrConnectWithoutInviteeInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutInviteeInput | RoomInviteUpsertWithWhereUniqueWithoutInviteeInput[]
    createMany?: RoomInviteCreateManyInviteeInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutInviteeInput | RoomInviteUpdateWithWhereUniqueWithoutInviteeInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutInviteeInput | RoomInviteUpdateManyWithWhereWithoutInviteeInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type FriendUncheckedUpdateManyWithoutFriendNestedInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutFriendInput | FriendUpsertWithWhereUniqueWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutFriendInput | FriendUpdateWithWhereUniqueWithoutFriendInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutFriendInput | FriendUpdateManyWithWhereWithoutFriendInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutUserInput | FriendUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutUserInput | FriendUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutUserInput | FriendUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScheduleCreateWithoutUserInput, ScheduleUncheckedCreateWithoutUserInput> | ScheduleCreateWithoutUserInput[] | ScheduleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutUserInput | ScheduleCreateOrConnectWithoutUserInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutUserInput | ScheduleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScheduleCreateManyUserInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutUserInput | ScheduleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutUserInput | ScheduleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type TimeLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TimeLogCreateWithoutUserInput, TimeLogUncheckedCreateWithoutUserInput> | TimeLogCreateWithoutUserInput[] | TimeLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TimeLogCreateOrConnectWithoutUserInput | TimeLogCreateOrConnectWithoutUserInput[]
    upsert?: TimeLogUpsertWithWhereUniqueWithoutUserInput | TimeLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TimeLogCreateManyUserInputEnvelope
    set?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    disconnect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    delete?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    connect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    update?: TimeLogUpdateWithWhereUniqueWithoutUserInput | TimeLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TimeLogUpdateManyWithWhereWithoutUserInput | TimeLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TimeLogScalarWhereInput | TimeLogScalarWhereInput[]
  }

  export type RoomParticipationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomParticipationCreateWithoutUserInput, RoomParticipationUncheckedCreateWithoutUserInput> | RoomParticipationCreateWithoutUserInput[] | RoomParticipationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomParticipationCreateOrConnectWithoutUserInput | RoomParticipationCreateOrConnectWithoutUserInput[]
    upsert?: RoomParticipationUpsertWithWhereUniqueWithoutUserInput | RoomParticipationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomParticipationCreateManyUserInputEnvelope
    set?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    disconnect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    delete?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    connect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    update?: RoomParticipationUpdateWithWhereUniqueWithoutUserInput | RoomParticipationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomParticipationUpdateManyWithWhereWithoutUserInput | RoomParticipationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomParticipationScalarWhereInput | RoomParticipationScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<RoomCreateWithoutOwnerInput, RoomUncheckedCreateWithoutOwnerInput> | RoomCreateWithoutOwnerInput[] | RoomUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutOwnerInput | RoomCreateOrConnectWithoutOwnerInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutOwnerInput | RoomUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: RoomCreateManyOwnerInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutOwnerInput | RoomUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutOwnerInput | RoomUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomInviteUncheckedUpdateManyWithoutInviterNestedInput = {
    create?: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput> | RoomInviteCreateWithoutInviterInput[] | RoomInviteUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviterInput | RoomInviteCreateOrConnectWithoutInviterInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutInviterInput | RoomInviteUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: RoomInviteCreateManyInviterInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutInviterInput | RoomInviteUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutInviterInput | RoomInviteUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput = {
    create?: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput> | RoomInviteCreateWithoutInviteeInput[] | RoomInviteUncheckedCreateWithoutInviteeInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviteeInput | RoomInviteCreateOrConnectWithoutInviteeInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutInviteeInput | RoomInviteUpsertWithWhereUniqueWithoutInviteeInput[]
    createMany?: RoomInviteCreateManyInviteeInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutInviteeInput | RoomInviteUpdateWithWhereUniqueWithoutInviteeInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutInviteeInput | RoomInviteUpdateManyWithWhereWithoutInviteeInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOwnedRoomsInput = {
    create?: XOR<UserCreateWithoutOwnedRoomsInput, UserUncheckedCreateWithoutOwnedRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedRoomsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomParticipationCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomParticipationCreateWithoutRoomInput, RoomParticipationUncheckedCreateWithoutRoomInput> | RoomParticipationCreateWithoutRoomInput[] | RoomParticipationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomParticipationCreateOrConnectWithoutRoomInput | RoomParticipationCreateOrConnectWithoutRoomInput[]
    createMany?: RoomParticipationCreateManyRoomInputEnvelope
    connect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
  }

  export type TimeLogCreateNestedManyWithoutRoomInput = {
    create?: XOR<TimeLogCreateWithoutRoomInput, TimeLogUncheckedCreateWithoutRoomInput> | TimeLogCreateWithoutRoomInput[] | TimeLogUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: TimeLogCreateOrConnectWithoutRoomInput | TimeLogCreateOrConnectWithoutRoomInput[]
    createMany?: TimeLogCreateManyRoomInputEnvelope
    connect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
  }

  export type RoomInviteCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomInviteCreateWithoutRoomInput, RoomInviteUncheckedCreateWithoutRoomInput> | RoomInviteCreateWithoutRoomInput[] | RoomInviteUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutRoomInput | RoomInviteCreateOrConnectWithoutRoomInput[]
    createMany?: RoomInviteCreateManyRoomInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type RoomParticipationUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomParticipationCreateWithoutRoomInput, RoomParticipationUncheckedCreateWithoutRoomInput> | RoomParticipationCreateWithoutRoomInput[] | RoomParticipationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomParticipationCreateOrConnectWithoutRoomInput | RoomParticipationCreateOrConnectWithoutRoomInput[]
    createMany?: RoomParticipationCreateManyRoomInputEnvelope
    connect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
  }

  export type TimeLogUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<TimeLogCreateWithoutRoomInput, TimeLogUncheckedCreateWithoutRoomInput> | TimeLogCreateWithoutRoomInput[] | TimeLogUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: TimeLogCreateOrConnectWithoutRoomInput | TimeLogCreateOrConnectWithoutRoomInput[]
    createMany?: TimeLogCreateManyRoomInputEnvelope
    connect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
  }

  export type RoomInviteUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomInviteCreateWithoutRoomInput, RoomInviteUncheckedCreateWithoutRoomInput> | RoomInviteCreateWithoutRoomInput[] | RoomInviteUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutRoomInput | RoomInviteCreateOrConnectWithoutRoomInput[]
    createMany?: RoomInviteCreateManyRoomInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOwnedRoomsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedRoomsInput, UserUncheckedCreateWithoutOwnedRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedRoomsInput
    upsert?: UserUpsertWithoutOwnedRoomsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedRoomsInput, UserUpdateWithoutOwnedRoomsInput>, UserUncheckedUpdateWithoutOwnedRoomsInput>
  }

  export type RoomParticipationUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomParticipationCreateWithoutRoomInput, RoomParticipationUncheckedCreateWithoutRoomInput> | RoomParticipationCreateWithoutRoomInput[] | RoomParticipationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomParticipationCreateOrConnectWithoutRoomInput | RoomParticipationCreateOrConnectWithoutRoomInput[]
    upsert?: RoomParticipationUpsertWithWhereUniqueWithoutRoomInput | RoomParticipationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomParticipationCreateManyRoomInputEnvelope
    set?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    disconnect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    delete?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    connect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    update?: RoomParticipationUpdateWithWhereUniqueWithoutRoomInput | RoomParticipationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomParticipationUpdateManyWithWhereWithoutRoomInput | RoomParticipationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomParticipationScalarWhereInput | RoomParticipationScalarWhereInput[]
  }

  export type TimeLogUpdateManyWithoutRoomNestedInput = {
    create?: XOR<TimeLogCreateWithoutRoomInput, TimeLogUncheckedCreateWithoutRoomInput> | TimeLogCreateWithoutRoomInput[] | TimeLogUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: TimeLogCreateOrConnectWithoutRoomInput | TimeLogCreateOrConnectWithoutRoomInput[]
    upsert?: TimeLogUpsertWithWhereUniqueWithoutRoomInput | TimeLogUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: TimeLogCreateManyRoomInputEnvelope
    set?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    disconnect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    delete?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    connect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    update?: TimeLogUpdateWithWhereUniqueWithoutRoomInput | TimeLogUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: TimeLogUpdateManyWithWhereWithoutRoomInput | TimeLogUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: TimeLogScalarWhereInput | TimeLogScalarWhereInput[]
  }

  export type RoomInviteUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomInviteCreateWithoutRoomInput, RoomInviteUncheckedCreateWithoutRoomInput> | RoomInviteCreateWithoutRoomInput[] | RoomInviteUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutRoomInput | RoomInviteCreateOrConnectWithoutRoomInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutRoomInput | RoomInviteUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomInviteCreateManyRoomInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutRoomInput | RoomInviteUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutRoomInput | RoomInviteUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type RoomParticipationUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomParticipationCreateWithoutRoomInput, RoomParticipationUncheckedCreateWithoutRoomInput> | RoomParticipationCreateWithoutRoomInput[] | RoomParticipationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomParticipationCreateOrConnectWithoutRoomInput | RoomParticipationCreateOrConnectWithoutRoomInput[]
    upsert?: RoomParticipationUpsertWithWhereUniqueWithoutRoomInput | RoomParticipationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomParticipationCreateManyRoomInputEnvelope
    set?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    disconnect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    delete?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    connect?: RoomParticipationWhereUniqueInput | RoomParticipationWhereUniqueInput[]
    update?: RoomParticipationUpdateWithWhereUniqueWithoutRoomInput | RoomParticipationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomParticipationUpdateManyWithWhereWithoutRoomInput | RoomParticipationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomParticipationScalarWhereInput | RoomParticipationScalarWhereInput[]
  }

  export type TimeLogUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<TimeLogCreateWithoutRoomInput, TimeLogUncheckedCreateWithoutRoomInput> | TimeLogCreateWithoutRoomInput[] | TimeLogUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: TimeLogCreateOrConnectWithoutRoomInput | TimeLogCreateOrConnectWithoutRoomInput[]
    upsert?: TimeLogUpsertWithWhereUniqueWithoutRoomInput | TimeLogUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: TimeLogCreateManyRoomInputEnvelope
    set?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    disconnect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    delete?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    connect?: TimeLogWhereUniqueInput | TimeLogWhereUniqueInput[]
    update?: TimeLogUpdateWithWhereUniqueWithoutRoomInput | TimeLogUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: TimeLogUpdateManyWithWhereWithoutRoomInput | TimeLogUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: TimeLogScalarWhereInput | TimeLogScalarWhereInput[]
  }

  export type RoomInviteUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomInviteCreateWithoutRoomInput, RoomInviteUncheckedCreateWithoutRoomInput> | RoomInviteCreateWithoutRoomInput[] | RoomInviteUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutRoomInput | RoomInviteCreateOrConnectWithoutRoomInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutRoomInput | RoomInviteUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomInviteCreateManyRoomInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutRoomInput | RoomInviteUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutRoomInput | RoomInviteUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRoomParticipationsInput = {
    create?: XOR<UserCreateWithoutRoomParticipationsInput, UserUncheckedCreateWithoutRoomParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomParticipationsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<RoomCreateWithoutParticipantsInput, RoomUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutParticipantsInput
    connect?: RoomWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutRoomParticipationsNestedInput = {
    create?: XOR<UserCreateWithoutRoomParticipationsInput, UserUncheckedCreateWithoutRoomParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomParticipationsInput
    upsert?: UserUpsertWithoutRoomParticipationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoomParticipationsInput, UserUpdateWithoutRoomParticipationsInput>, UserUncheckedUpdateWithoutRoomParticipationsInput>
  }

  export type RoomUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<RoomCreateWithoutParticipantsInput, RoomUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutParticipantsInput
    upsert?: RoomUpsertWithoutParticipantsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutParticipantsInput, RoomUpdateWithoutParticipantsInput>, RoomUncheckedUpdateWithoutParticipantsInput>
  }

  export type UserCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<UserCreateWithoutSchedulesInput, UserUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSchedulesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumScheduleStatusFieldUpdateOperationsInput = {
    set?: $Enums.ScheduleStatus
  }

  export type UserUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<UserCreateWithoutSchedulesInput, UserUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSchedulesInput
    upsert?: UserUpsertWithoutSchedulesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSchedulesInput, UserUpdateWithoutSchedulesInput>, UserUncheckedUpdateWithoutSchedulesInput>
  }

  export type RoomCreateNestedOneWithoutTimeLogsInput = {
    create?: XOR<RoomCreateWithoutTimeLogsInput, RoomUncheckedCreateWithoutTimeLogsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutTimeLogsInput
    connect?: RoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTimeLogsInput = {
    create?: XOR<UserCreateWithoutTimeLogsInput, UserUncheckedCreateWithoutTimeLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTimeLogsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomUpdateOneRequiredWithoutTimeLogsNestedInput = {
    create?: XOR<RoomCreateWithoutTimeLogsInput, RoomUncheckedCreateWithoutTimeLogsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutTimeLogsInput
    upsert?: RoomUpsertWithoutTimeLogsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutTimeLogsInput, RoomUpdateWithoutTimeLogsInput>, RoomUncheckedUpdateWithoutTimeLogsInput>
  }

  export type UserUpdateOneRequiredWithoutTimeLogsNestedInput = {
    create?: XOR<UserCreateWithoutTimeLogsInput, UserUncheckedCreateWithoutTimeLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTimeLogsInput
    upsert?: UserUpsertWithoutTimeLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTimeLogsInput, UserUpdateWithoutTimeLogsInput>, UserUncheckedUpdateWithoutTimeLogsInput>
  }

  export type UserCreateNestedOneWithoutFriendsFromInput = {
    create?: XOR<UserCreateWithoutFriendsFromInput, UserUncheckedCreateWithoutFriendsFromInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsFromInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFriendsToInput = {
    create?: XOR<UserCreateWithoutFriendsToInput, UserUncheckedCreateWithoutFriendsToInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsToInput
    connect?: UserWhereUniqueInput
  }

  export type EnumFriendStatusFieldUpdateOperationsInput = {
    set?: $Enums.FriendStatus
  }

  export type UserUpdateOneRequiredWithoutFriendsFromNestedInput = {
    create?: XOR<UserCreateWithoutFriendsFromInput, UserUncheckedCreateWithoutFriendsFromInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsFromInput
    upsert?: UserUpsertWithoutFriendsFromInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendsFromInput, UserUpdateWithoutFriendsFromInput>, UserUncheckedUpdateWithoutFriendsFromInput>
  }

  export type UserUpdateOneRequiredWithoutFriendsToNestedInput = {
    create?: XOR<UserCreateWithoutFriendsToInput, UserUncheckedCreateWithoutFriendsToInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsToInput
    upsert?: UserUpsertWithoutFriendsToInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendsToInput, UserUpdateWithoutFriendsToInput>, UserUncheckedUpdateWithoutFriendsToInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type RoomCreateNestedOneWithoutInvitesInput = {
    create?: XOR<RoomCreateWithoutInvitesInput, RoomUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutInvitesInput
    connect?: RoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentRoomInvitesInput = {
    create?: XOR<UserCreateWithoutSentRoomInvitesInput, UserUncheckedCreateWithoutSentRoomInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentRoomInvitesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedRoomInvitesInput = {
    create?: XOR<UserCreateWithoutReceivedRoomInvitesInput, UserUncheckedCreateWithoutReceivedRoomInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedRoomInvitesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRoomInviteStatusFieldUpdateOperationsInput = {
    set?: $Enums.RoomInviteStatus
  }

  export type RoomUpdateOneRequiredWithoutInvitesNestedInput = {
    create?: XOR<RoomCreateWithoutInvitesInput, RoomUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutInvitesInput
    upsert?: RoomUpsertWithoutInvitesInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutInvitesInput, RoomUpdateWithoutInvitesInput>, RoomUncheckedUpdateWithoutInvitesInput>
  }

  export type UserUpdateOneRequiredWithoutSentRoomInvitesNestedInput = {
    create?: XOR<UserCreateWithoutSentRoomInvitesInput, UserUncheckedCreateWithoutSentRoomInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentRoomInvitesInput
    upsert?: UserUpsertWithoutSentRoomInvitesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentRoomInvitesInput, UserUpdateWithoutSentRoomInvitesInput>, UserUncheckedUpdateWithoutSentRoomInvitesInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedRoomInvitesNestedInput = {
    create?: XOR<UserCreateWithoutReceivedRoomInvitesInput, UserUncheckedCreateWithoutReceivedRoomInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedRoomInvitesInput
    upsert?: UserUpsertWithoutReceivedRoomInvitesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedRoomInvitesInput, UserUpdateWithoutReceivedRoomInvitesInput>, UserUncheckedUpdateWithoutReceivedRoomInvitesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumScheduleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[]
    notIn?: $Enums.ScheduleStatus[]
    not?: NestedEnumScheduleStatusFilter<$PrismaModel> | $Enums.ScheduleStatus
  }

  export type NestedEnumScheduleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[]
    notIn?: $Enums.ScheduleStatus[]
    not?: NestedEnumScheduleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScheduleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScheduleStatusFilter<$PrismaModel>
    _max?: NestedEnumScheduleStatusFilter<$PrismaModel>
  }

  export type NestedEnumFriendStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[]
    notIn?: $Enums.FriendStatus[]
    not?: NestedEnumFriendStatusFilter<$PrismaModel> | $Enums.FriendStatus
  }

  export type NestedEnumFriendStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[]
    notIn?: $Enums.FriendStatus[]
    not?: NestedEnumFriendStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendStatusFilter<$PrismaModel>
  }

  export type NestedEnumRoomInviteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomInviteStatus | EnumRoomInviteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomInviteStatus[]
    notIn?: $Enums.RoomInviteStatus[]
    not?: NestedEnumRoomInviteStatusFilter<$PrismaModel> | $Enums.RoomInviteStatus
  }

  export type NestedEnumRoomInviteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomInviteStatus | EnumRoomInviteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomInviteStatus[]
    notIn?: $Enums.RoomInviteStatus[]
    not?: NestedEnumRoomInviteStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoomInviteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomInviteStatusFilter<$PrismaModel>
    _max?: NestedEnumRoomInviteStatusFilter<$PrismaModel>
  }

  export type FriendCreateWithoutFriendInput = {
    status?: $Enums.FriendStatus
    user: UserCreateNestedOneWithoutFriendsToInput
  }

  export type FriendUncheckedCreateWithoutFriendInput = {
    userCuid: string
    status?: $Enums.FriendStatus
  }

  export type FriendCreateOrConnectWithoutFriendInput = {
    where: FriendWhereUniqueInput
    create: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput>
  }

  export type FriendCreateManyFriendInputEnvelope = {
    data: FriendCreateManyFriendInput | FriendCreateManyFriendInput[]
    skipDuplicates?: boolean
  }

  export type FriendCreateWithoutUserInput = {
    status?: $Enums.FriendStatus
    friend: UserCreateNestedOneWithoutFriendsFromInput
  }

  export type FriendUncheckedCreateWithoutUserInput = {
    friendCuid: string
    status?: $Enums.FriendStatus
  }

  export type FriendCreateOrConnectWithoutUserInput = {
    where: FriendWhereUniqueInput
    create: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput>
  }

  export type FriendCreateManyUserInputEnvelope = {
    data: FriendCreateManyUserInput | FriendCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleCreateWithoutUserInput = {
    id?: string
    title: string
    startTime?: Date | string | null
    endTime?: Date | string | null
    status?: $Enums.ScheduleStatus
    createdAt?: Date | string | null
    order?: number
    date: string
  }

  export type ScheduleUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    startTime?: Date | string | null
    endTime?: Date | string | null
    status?: $Enums.ScheduleStatus
    createdAt?: Date | string | null
    order?: number
    date: string
  }

  export type ScheduleCreateOrConnectWithoutUserInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutUserInput, ScheduleUncheckedCreateWithoutUserInput>
  }

  export type ScheduleCreateManyUserInputEnvelope = {
    data: ScheduleCreateManyUserInput | ScheduleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TimeLogCreateWithoutUserInput = {
    id?: string
    totalTime: number
    date: Date | string
    createdAt?: Date | string | null
    room: RoomCreateNestedOneWithoutTimeLogsInput
  }

  export type TimeLogUncheckedCreateWithoutUserInput = {
    id?: string
    totalTime: number
    date: Date | string
    createdAt?: Date | string | null
    roomCuid: string
  }

  export type TimeLogCreateOrConnectWithoutUserInput = {
    where: TimeLogWhereUniqueInput
    create: XOR<TimeLogCreateWithoutUserInput, TimeLogUncheckedCreateWithoutUserInput>
  }

  export type TimeLogCreateManyUserInputEnvelope = {
    data: TimeLogCreateManyUserInput | TimeLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoomParticipationCreateWithoutUserInput = {
    joinedAt?: Date | string
    room: RoomCreateNestedOneWithoutParticipantsInput
  }

  export type RoomParticipationUncheckedCreateWithoutUserInput = {
    roomCuid: string
    joinedAt?: Date | string
  }

  export type RoomParticipationCreateOrConnectWithoutUserInput = {
    where: RoomParticipationWhereUniqueInput
    create: XOR<RoomParticipationCreateWithoutUserInput, RoomParticipationUncheckedCreateWithoutUserInput>
  }

  export type RoomParticipationCreateManyUserInputEnvelope = {
    data: RoomParticipationCreateManyUserInput | RoomParticipationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoomCreateWithoutOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    participants?: RoomParticipationCreateNestedManyWithoutRoomInput
    timeLogs?: TimeLogCreateNestedManyWithoutRoomInput
    invites?: RoomInviteCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    participants?: RoomParticipationUncheckedCreateNestedManyWithoutRoomInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutRoomInput
    invites?: RoomInviteUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutOwnerInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutOwnerInput, RoomUncheckedCreateWithoutOwnerInput>
  }

  export type RoomCreateManyOwnerInputEnvelope = {
    data: RoomCreateManyOwnerInput | RoomCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type RoomInviteCreateWithoutInviterInput = {
    id?: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutInvitesInput
    invitee: UserCreateNestedOneWithoutReceivedRoomInvitesInput
  }

  export type RoomInviteUncheckedCreateWithoutInviterInput = {
    id?: string
    roomCuid: string
    inviteeCuid: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomInviteCreateOrConnectWithoutInviterInput = {
    where: RoomInviteWhereUniqueInput
    create: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput>
  }

  export type RoomInviteCreateManyInviterInputEnvelope = {
    data: RoomInviteCreateManyInviterInput | RoomInviteCreateManyInviterInput[]
    skipDuplicates?: boolean
  }

  export type RoomInviteCreateWithoutInviteeInput = {
    id?: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutInvitesInput
    inviter: UserCreateNestedOneWithoutSentRoomInvitesInput
  }

  export type RoomInviteUncheckedCreateWithoutInviteeInput = {
    id?: string
    roomCuid: string
    inviterCuid: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomInviteCreateOrConnectWithoutInviteeInput = {
    where: RoomInviteWhereUniqueInput
    create: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput>
  }

  export type RoomInviteCreateManyInviteeInputEnvelope = {
    data: RoomInviteCreateManyInviteeInput | RoomInviteCreateManyInviteeInput[]
    skipDuplicates?: boolean
  }

  export type FriendUpsertWithWhereUniqueWithoutFriendInput = {
    where: FriendWhereUniqueInput
    update: XOR<FriendUpdateWithoutFriendInput, FriendUncheckedUpdateWithoutFriendInput>
    create: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput>
  }

  export type FriendUpdateWithWhereUniqueWithoutFriendInput = {
    where: FriendWhereUniqueInput
    data: XOR<FriendUpdateWithoutFriendInput, FriendUncheckedUpdateWithoutFriendInput>
  }

  export type FriendUpdateManyWithWhereWithoutFriendInput = {
    where: FriendScalarWhereInput
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyWithoutFriendInput>
  }

  export type FriendScalarWhereInput = {
    AND?: FriendScalarWhereInput | FriendScalarWhereInput[]
    OR?: FriendScalarWhereInput[]
    NOT?: FriendScalarWhereInput | FriendScalarWhereInput[]
    friendCuid?: StringFilter<"Friend"> | string
    userCuid?: StringFilter<"Friend"> | string
    status?: EnumFriendStatusFilter<"Friend"> | $Enums.FriendStatus
  }

  export type FriendUpsertWithWhereUniqueWithoutUserInput = {
    where: FriendWhereUniqueInput
    update: XOR<FriendUpdateWithoutUserInput, FriendUncheckedUpdateWithoutUserInput>
    create: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput>
  }

  export type FriendUpdateWithWhereUniqueWithoutUserInput = {
    where: FriendWhereUniqueInput
    data: XOR<FriendUpdateWithoutUserInput, FriendUncheckedUpdateWithoutUserInput>
  }

  export type FriendUpdateManyWithWhereWithoutUserInput = {
    where: FriendScalarWhereInput
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    userCuid?: StringFilter<"RefreshToken"> | string
  }

  export type ScheduleUpsertWithWhereUniqueWithoutUserInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutUserInput, ScheduleUncheckedUpdateWithoutUserInput>
    create: XOR<ScheduleCreateWithoutUserInput, ScheduleUncheckedCreateWithoutUserInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutUserInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutUserInput, ScheduleUncheckedUpdateWithoutUserInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutUserInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutUserInput>
  }

  export type ScheduleScalarWhereInput = {
    AND?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    OR?: ScheduleScalarWhereInput[]
    NOT?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    id?: StringFilter<"Schedule"> | string
    title?: StringFilter<"Schedule"> | string
    startTime?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    status?: EnumScheduleStatusFilter<"Schedule"> | $Enums.ScheduleStatus
    createdAt?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    order?: IntFilter<"Schedule"> | number
    userCuid?: StringFilter<"Schedule"> | string
    date?: StringFilter<"Schedule"> | string
  }

  export type TimeLogUpsertWithWhereUniqueWithoutUserInput = {
    where: TimeLogWhereUniqueInput
    update: XOR<TimeLogUpdateWithoutUserInput, TimeLogUncheckedUpdateWithoutUserInput>
    create: XOR<TimeLogCreateWithoutUserInput, TimeLogUncheckedCreateWithoutUserInput>
  }

  export type TimeLogUpdateWithWhereUniqueWithoutUserInput = {
    where: TimeLogWhereUniqueInput
    data: XOR<TimeLogUpdateWithoutUserInput, TimeLogUncheckedUpdateWithoutUserInput>
  }

  export type TimeLogUpdateManyWithWhereWithoutUserInput = {
    where: TimeLogScalarWhereInput
    data: XOR<TimeLogUpdateManyMutationInput, TimeLogUncheckedUpdateManyWithoutUserInput>
  }

  export type TimeLogScalarWhereInput = {
    AND?: TimeLogScalarWhereInput | TimeLogScalarWhereInput[]
    OR?: TimeLogScalarWhereInput[]
    NOT?: TimeLogScalarWhereInput | TimeLogScalarWhereInput[]
    id?: StringFilter<"TimeLog"> | string
    totalTime?: IntFilter<"TimeLog"> | number
    date?: DateTimeFilter<"TimeLog"> | Date | string
    createdAt?: DateTimeNullableFilter<"TimeLog"> | Date | string | null
    roomCuid?: StringFilter<"TimeLog"> | string
    userCuid?: StringFilter<"TimeLog"> | string
  }

  export type RoomParticipationUpsertWithWhereUniqueWithoutUserInput = {
    where: RoomParticipationWhereUniqueInput
    update: XOR<RoomParticipationUpdateWithoutUserInput, RoomParticipationUncheckedUpdateWithoutUserInput>
    create: XOR<RoomParticipationCreateWithoutUserInput, RoomParticipationUncheckedCreateWithoutUserInput>
  }

  export type RoomParticipationUpdateWithWhereUniqueWithoutUserInput = {
    where: RoomParticipationWhereUniqueInput
    data: XOR<RoomParticipationUpdateWithoutUserInput, RoomParticipationUncheckedUpdateWithoutUserInput>
  }

  export type RoomParticipationUpdateManyWithWhereWithoutUserInput = {
    where: RoomParticipationScalarWhereInput
    data: XOR<RoomParticipationUpdateManyMutationInput, RoomParticipationUncheckedUpdateManyWithoutUserInput>
  }

  export type RoomParticipationScalarWhereInput = {
    AND?: RoomParticipationScalarWhereInput | RoomParticipationScalarWhereInput[]
    OR?: RoomParticipationScalarWhereInput[]
    NOT?: RoomParticipationScalarWhereInput | RoomParticipationScalarWhereInput[]
    userCuid?: StringFilter<"RoomParticipation"> | string
    roomCuid?: StringFilter<"RoomParticipation"> | string
    joinedAt?: DateTimeFilter<"RoomParticipation"> | Date | string
  }

  export type RoomUpsertWithWhereUniqueWithoutOwnerInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutOwnerInput, RoomUncheckedUpdateWithoutOwnerInput>
    create: XOR<RoomCreateWithoutOwnerInput, RoomUncheckedCreateWithoutOwnerInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutOwnerInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutOwnerInput, RoomUncheckedUpdateWithoutOwnerInput>
  }

  export type RoomUpdateManyWithWhereWithoutOwnerInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutOwnerInput>
  }

  export type RoomScalarWhereInput = {
    AND?: RoomScalarWhereInput | RoomScalarWhereInput[]
    OR?: RoomScalarWhereInput[]
    NOT?: RoomScalarWhereInput | RoomScalarWhereInput[]
    id?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    createdAt?: DateTimeNullableFilter<"Room"> | Date | string | null
    ownerCuid?: StringFilter<"Room"> | string
  }

  export type RoomInviteUpsertWithWhereUniqueWithoutInviterInput = {
    where: RoomInviteWhereUniqueInput
    update: XOR<RoomInviteUpdateWithoutInviterInput, RoomInviteUncheckedUpdateWithoutInviterInput>
    create: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput>
  }

  export type RoomInviteUpdateWithWhereUniqueWithoutInviterInput = {
    where: RoomInviteWhereUniqueInput
    data: XOR<RoomInviteUpdateWithoutInviterInput, RoomInviteUncheckedUpdateWithoutInviterInput>
  }

  export type RoomInviteUpdateManyWithWhereWithoutInviterInput = {
    where: RoomInviteScalarWhereInput
    data: XOR<RoomInviteUpdateManyMutationInput, RoomInviteUncheckedUpdateManyWithoutInviterInput>
  }

  export type RoomInviteScalarWhereInput = {
    AND?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
    OR?: RoomInviteScalarWhereInput[]
    NOT?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
    id?: StringFilter<"RoomInvite"> | string
    roomCuid?: StringFilter<"RoomInvite"> | string
    inviterCuid?: StringFilter<"RoomInvite"> | string
    inviteeCuid?: StringFilter<"RoomInvite"> | string
    status?: EnumRoomInviteStatusFilter<"RoomInvite"> | $Enums.RoomInviteStatus
    createdAt?: DateTimeFilter<"RoomInvite"> | Date | string
    updatedAt?: DateTimeFilter<"RoomInvite"> | Date | string
  }

  export type RoomInviteUpsertWithWhereUniqueWithoutInviteeInput = {
    where: RoomInviteWhereUniqueInput
    update: XOR<RoomInviteUpdateWithoutInviteeInput, RoomInviteUncheckedUpdateWithoutInviteeInput>
    create: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput>
  }

  export type RoomInviteUpdateWithWhereUniqueWithoutInviteeInput = {
    where: RoomInviteWhereUniqueInput
    data: XOR<RoomInviteUpdateWithoutInviteeInput, RoomInviteUncheckedUpdateWithoutInviteeInput>
  }

  export type RoomInviteUpdateManyWithWhereWithoutInviteeInput = {
    where: RoomInviteScalarWhereInput
    data: XOR<RoomInviteUpdateManyMutationInput, RoomInviteUncheckedUpdateManyWithoutInviteeInput>
  }

  export type UserCreateWithoutOwnedRoomsInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendCreateNestedManyWithoutFriendInput
    friendsTo?: FriendCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    schedules?: ScheduleCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationCreateNestedManyWithoutUserInput
    sentRoomInvites?: RoomInviteCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteCreateNestedManyWithoutInviteeInput
  }

  export type UserUncheckedCreateWithoutOwnedRoomsInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendsTo?: FriendUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationUncheckedCreateNestedManyWithoutUserInput
    sentRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
  }

  export type UserCreateOrConnectWithoutOwnedRoomsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedRoomsInput, UserUncheckedCreateWithoutOwnedRoomsInput>
  }

  export type RoomParticipationCreateWithoutRoomInput = {
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutRoomParticipationsInput
  }

  export type RoomParticipationUncheckedCreateWithoutRoomInput = {
    userCuid: string
    joinedAt?: Date | string
  }

  export type RoomParticipationCreateOrConnectWithoutRoomInput = {
    where: RoomParticipationWhereUniqueInput
    create: XOR<RoomParticipationCreateWithoutRoomInput, RoomParticipationUncheckedCreateWithoutRoomInput>
  }

  export type RoomParticipationCreateManyRoomInputEnvelope = {
    data: RoomParticipationCreateManyRoomInput | RoomParticipationCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type TimeLogCreateWithoutRoomInput = {
    id?: string
    totalTime: number
    date: Date | string
    createdAt?: Date | string | null
    user: UserCreateNestedOneWithoutTimeLogsInput
  }

  export type TimeLogUncheckedCreateWithoutRoomInput = {
    id?: string
    totalTime: number
    date: Date | string
    createdAt?: Date | string | null
    userCuid: string
  }

  export type TimeLogCreateOrConnectWithoutRoomInput = {
    where: TimeLogWhereUniqueInput
    create: XOR<TimeLogCreateWithoutRoomInput, TimeLogUncheckedCreateWithoutRoomInput>
  }

  export type TimeLogCreateManyRoomInputEnvelope = {
    data: TimeLogCreateManyRoomInput | TimeLogCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RoomInviteCreateWithoutRoomInput = {
    id?: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inviter: UserCreateNestedOneWithoutSentRoomInvitesInput
    invitee: UserCreateNestedOneWithoutReceivedRoomInvitesInput
  }

  export type RoomInviteUncheckedCreateWithoutRoomInput = {
    id?: string
    inviterCuid: string
    inviteeCuid: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomInviteCreateOrConnectWithoutRoomInput = {
    where: RoomInviteWhereUniqueInput
    create: XOR<RoomInviteCreateWithoutRoomInput, RoomInviteUncheckedCreateWithoutRoomInput>
  }

  export type RoomInviteCreateManyRoomInputEnvelope = {
    data: RoomInviteCreateManyRoomInput | RoomInviteCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedRoomsInput = {
    update: XOR<UserUpdateWithoutOwnedRoomsInput, UserUncheckedUpdateWithoutOwnedRoomsInput>
    create: XOR<UserCreateWithoutOwnedRoomsInput, UserUncheckedCreateWithoutOwnedRoomsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedRoomsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedRoomsInput, UserUncheckedUpdateWithoutOwnedRoomsInput>
  }

  export type UserUpdateWithoutOwnedRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUpdateManyWithoutUserNestedInput
    sentRoomInvites?: RoomInviteUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUpdateManyWithoutInviteeNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUncheckedUpdateManyWithoutUserNestedInput
    sentRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
  }

  export type RoomParticipationUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomParticipationWhereUniqueInput
    update: XOR<RoomParticipationUpdateWithoutRoomInput, RoomParticipationUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomParticipationCreateWithoutRoomInput, RoomParticipationUncheckedCreateWithoutRoomInput>
  }

  export type RoomParticipationUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomParticipationWhereUniqueInput
    data: XOR<RoomParticipationUpdateWithoutRoomInput, RoomParticipationUncheckedUpdateWithoutRoomInput>
  }

  export type RoomParticipationUpdateManyWithWhereWithoutRoomInput = {
    where: RoomParticipationScalarWhereInput
    data: XOR<RoomParticipationUpdateManyMutationInput, RoomParticipationUncheckedUpdateManyWithoutRoomInput>
  }

  export type TimeLogUpsertWithWhereUniqueWithoutRoomInput = {
    where: TimeLogWhereUniqueInput
    update: XOR<TimeLogUpdateWithoutRoomInput, TimeLogUncheckedUpdateWithoutRoomInput>
    create: XOR<TimeLogCreateWithoutRoomInput, TimeLogUncheckedCreateWithoutRoomInput>
  }

  export type TimeLogUpdateWithWhereUniqueWithoutRoomInput = {
    where: TimeLogWhereUniqueInput
    data: XOR<TimeLogUpdateWithoutRoomInput, TimeLogUncheckedUpdateWithoutRoomInput>
  }

  export type TimeLogUpdateManyWithWhereWithoutRoomInput = {
    where: TimeLogScalarWhereInput
    data: XOR<TimeLogUpdateManyMutationInput, TimeLogUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomInviteUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomInviteWhereUniqueInput
    update: XOR<RoomInviteUpdateWithoutRoomInput, RoomInviteUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomInviteCreateWithoutRoomInput, RoomInviteUncheckedCreateWithoutRoomInput>
  }

  export type RoomInviteUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomInviteWhereUniqueInput
    data: XOR<RoomInviteUpdateWithoutRoomInput, RoomInviteUncheckedUpdateWithoutRoomInput>
  }

  export type RoomInviteUpdateManyWithWhereWithoutRoomInput = {
    where: RoomInviteScalarWhereInput
    data: XOR<RoomInviteUpdateManyMutationInput, RoomInviteUncheckedUpdateManyWithoutRoomInput>
  }

  export type UserCreateWithoutRoomParticipationsInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendCreateNestedManyWithoutFriendInput
    friendsTo?: FriendCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    schedules?: ScheduleCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogCreateNestedManyWithoutUserInput
    ownedRooms?: RoomCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteCreateNestedManyWithoutInviteeInput
  }

  export type UserUncheckedCreateWithoutRoomParticipationsInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendsTo?: FriendUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutUserInput
    ownedRooms?: RoomUncheckedCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
  }

  export type UserCreateOrConnectWithoutRoomParticipationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomParticipationsInput, UserUncheckedCreateWithoutRoomParticipationsInput>
  }

  export type RoomCreateWithoutParticipantsInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedRoomsInput
    timeLogs?: TimeLogCreateNestedManyWithoutRoomInput
    invites?: RoomInviteCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutParticipantsInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    ownerCuid: string
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutRoomInput
    invites?: RoomInviteUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutParticipantsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutParticipantsInput, RoomUncheckedCreateWithoutParticipantsInput>
  }

  export type UserUpsertWithoutRoomParticipationsInput = {
    update: XOR<UserUpdateWithoutRoomParticipationsInput, UserUncheckedUpdateWithoutRoomParticipationsInput>
    create: XOR<UserCreateWithoutRoomParticipationsInput, UserUncheckedCreateWithoutRoomParticipationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoomParticipationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoomParticipationsInput, UserUncheckedUpdateWithoutRoomParticipationsInput>
  }

  export type UserUpdateWithoutRoomParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUpdateManyWithoutInviteeNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUncheckedUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
  }

  export type RoomUpsertWithoutParticipantsInput = {
    update: XOR<RoomUpdateWithoutParticipantsInput, RoomUncheckedUpdateWithoutParticipantsInput>
    create: XOR<RoomCreateWithoutParticipantsInput, RoomUncheckedCreateWithoutParticipantsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutParticipantsInput, RoomUncheckedUpdateWithoutParticipantsInput>
  }

  export type RoomUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedRoomsNestedInput
    timeLogs?: TimeLogUpdateManyWithoutRoomNestedInput
    invites?: RoomInviteUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerCuid?: StringFieldUpdateOperationsInput | string
    timeLogs?: TimeLogUncheckedUpdateManyWithoutRoomNestedInput
    invites?: RoomInviteUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserCreateWithoutSchedulesInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendCreateNestedManyWithoutFriendInput
    friendsTo?: FriendCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationCreateNestedManyWithoutUserInput
    ownedRooms?: RoomCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteCreateNestedManyWithoutInviteeInput
  }

  export type UserUncheckedCreateWithoutSchedulesInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendsTo?: FriendUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationUncheckedCreateNestedManyWithoutUserInput
    ownedRooms?: RoomUncheckedCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
  }

  export type UserCreateOrConnectWithoutSchedulesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSchedulesInput, UserUncheckedCreateWithoutSchedulesInput>
  }

  export type UserUpsertWithoutSchedulesInput = {
    update: XOR<UserUpdateWithoutSchedulesInput, UserUncheckedUpdateWithoutSchedulesInput>
    create: XOR<UserCreateWithoutSchedulesInput, UserUncheckedCreateWithoutSchedulesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSchedulesInput, UserUncheckedUpdateWithoutSchedulesInput>
  }

  export type UserUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUpdateManyWithoutInviteeNestedInput
  }

  export type UserUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUncheckedUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUncheckedUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
  }

  export type RoomCreateWithoutTimeLogsInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedRoomsInput
    participants?: RoomParticipationCreateNestedManyWithoutRoomInput
    invites?: RoomInviteCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutTimeLogsInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    ownerCuid: string
    participants?: RoomParticipationUncheckedCreateNestedManyWithoutRoomInput
    invites?: RoomInviteUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutTimeLogsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutTimeLogsInput, RoomUncheckedCreateWithoutTimeLogsInput>
  }

  export type UserCreateWithoutTimeLogsInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendCreateNestedManyWithoutFriendInput
    friendsTo?: FriendCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    schedules?: ScheduleCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationCreateNestedManyWithoutUserInput
    ownedRooms?: RoomCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteCreateNestedManyWithoutInviteeInput
  }

  export type UserUncheckedCreateWithoutTimeLogsInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendsTo?: FriendUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationUncheckedCreateNestedManyWithoutUserInput
    ownedRooms?: RoomUncheckedCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
  }

  export type UserCreateOrConnectWithoutTimeLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTimeLogsInput, UserUncheckedCreateWithoutTimeLogsInput>
  }

  export type RoomUpsertWithoutTimeLogsInput = {
    update: XOR<RoomUpdateWithoutTimeLogsInput, RoomUncheckedUpdateWithoutTimeLogsInput>
    create: XOR<RoomCreateWithoutTimeLogsInput, RoomUncheckedCreateWithoutTimeLogsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutTimeLogsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutTimeLogsInput, RoomUncheckedUpdateWithoutTimeLogsInput>
  }

  export type RoomUpdateWithoutTimeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedRoomsNestedInput
    participants?: RoomParticipationUpdateManyWithoutRoomNestedInput
    invites?: RoomInviteUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutTimeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerCuid?: StringFieldUpdateOperationsInput | string
    participants?: RoomParticipationUncheckedUpdateManyWithoutRoomNestedInput
    invites?: RoomInviteUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutTimeLogsInput = {
    update: XOR<UserUpdateWithoutTimeLogsInput, UserUncheckedUpdateWithoutTimeLogsInput>
    create: XOR<UserCreateWithoutTimeLogsInput, UserUncheckedCreateWithoutTimeLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTimeLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTimeLogsInput, UserUncheckedUpdateWithoutTimeLogsInput>
  }

  export type UserUpdateWithoutTimeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUpdateManyWithoutInviteeNestedInput
  }

  export type UserUncheckedUpdateWithoutTimeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUncheckedUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUncheckedUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
  }

  export type UserCreateWithoutFriendsFromInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsTo?: FriendCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    schedules?: ScheduleCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationCreateNestedManyWithoutUserInput
    ownedRooms?: RoomCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteCreateNestedManyWithoutInviteeInput
  }

  export type UserUncheckedCreateWithoutFriendsFromInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsTo?: FriendUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationUncheckedCreateNestedManyWithoutUserInput
    ownedRooms?: RoomUncheckedCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
  }

  export type UserCreateOrConnectWithoutFriendsFromInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsFromInput, UserUncheckedCreateWithoutFriendsFromInput>
  }

  export type UserCreateWithoutFriendsToInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendCreateNestedManyWithoutFriendInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    schedules?: ScheduleCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationCreateNestedManyWithoutUserInput
    ownedRooms?: RoomCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteCreateNestedManyWithoutInviteeInput
  }

  export type UserUncheckedCreateWithoutFriendsToInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendUncheckedCreateNestedManyWithoutFriendInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationUncheckedCreateNestedManyWithoutUserInput
    ownedRooms?: RoomUncheckedCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
  }

  export type UserCreateOrConnectWithoutFriendsToInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsToInput, UserUncheckedCreateWithoutFriendsToInput>
  }

  export type UserUpsertWithoutFriendsFromInput = {
    update: XOR<UserUpdateWithoutFriendsFromInput, UserUncheckedUpdateWithoutFriendsFromInput>
    create: XOR<UserCreateWithoutFriendsFromInput, UserUncheckedCreateWithoutFriendsFromInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendsFromInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendsFromInput, UserUncheckedUpdateWithoutFriendsFromInput>
  }

  export type UserUpdateWithoutFriendsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsTo?: FriendUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUpdateManyWithoutInviteeNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsTo?: FriendUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUncheckedUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUncheckedUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
  }

  export type UserUpsertWithoutFriendsToInput = {
    update: XOR<UserUpdateWithoutFriendsToInput, UserUncheckedUpdateWithoutFriendsToInput>
    create: XOR<UserCreateWithoutFriendsToInput, UserUncheckedCreateWithoutFriendsToInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendsToInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendsToInput, UserUncheckedUpdateWithoutFriendsToInput>
  }

  export type UserUpdateWithoutFriendsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUpdateManyWithoutFriendNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUpdateManyWithoutInviteeNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUncheckedUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUncheckedUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendCreateNestedManyWithoutFriendInput
    friendsTo?: FriendCreateNestedManyWithoutUserInput
    schedules?: ScheduleCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationCreateNestedManyWithoutUserInput
    ownedRooms?: RoomCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteCreateNestedManyWithoutInviteeInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendsTo?: FriendUncheckedCreateNestedManyWithoutUserInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationUncheckedCreateNestedManyWithoutUserInput
    ownedRooms?: RoomUncheckedCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    receivedRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUpdateManyWithoutInviteeNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUncheckedUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUncheckedUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUncheckedUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    receivedRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
  }

  export type RoomCreateWithoutInvitesInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedRoomsInput
    participants?: RoomParticipationCreateNestedManyWithoutRoomInput
    timeLogs?: TimeLogCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutInvitesInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
    ownerCuid: string
    participants?: RoomParticipationUncheckedCreateNestedManyWithoutRoomInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutInvitesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutInvitesInput, RoomUncheckedCreateWithoutInvitesInput>
  }

  export type UserCreateWithoutSentRoomInvitesInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendCreateNestedManyWithoutFriendInput
    friendsTo?: FriendCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    schedules?: ScheduleCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationCreateNestedManyWithoutUserInput
    ownedRooms?: RoomCreateNestedManyWithoutOwnerInput
    receivedRoomInvites?: RoomInviteCreateNestedManyWithoutInviteeInput
  }

  export type UserUncheckedCreateWithoutSentRoomInvitesInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendsTo?: FriendUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationUncheckedCreateNestedManyWithoutUserInput
    ownedRooms?: RoomUncheckedCreateNestedManyWithoutOwnerInput
    receivedRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
  }

  export type UserCreateOrConnectWithoutSentRoomInvitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentRoomInvitesInput, UserUncheckedCreateWithoutSentRoomInvitesInput>
  }

  export type UserCreateWithoutReceivedRoomInvitesInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendCreateNestedManyWithoutFriendInput
    friendsTo?: FriendCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    schedules?: ScheduleCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationCreateNestedManyWithoutUserInput
    ownedRooms?: RoomCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteCreateNestedManyWithoutInviterInput
  }

  export type UserUncheckedCreateWithoutReceivedRoomInvitesInput = {
    id?: string
    userId: string
    password: string
    nickname: string
    profileImg?: string | null
    createdAt?: Date | string | null
    totalStudyTime?: number
    friendsFrom?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendsTo?: FriendUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutUserInput
    timeLogs?: TimeLogUncheckedCreateNestedManyWithoutUserInput
    roomParticipations?: RoomParticipationUncheckedCreateNestedManyWithoutUserInput
    ownedRooms?: RoomUncheckedCreateNestedManyWithoutOwnerInput
    sentRoomInvites?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
  }

  export type UserCreateOrConnectWithoutReceivedRoomInvitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedRoomInvitesInput, UserUncheckedCreateWithoutReceivedRoomInvitesInput>
  }

  export type RoomUpsertWithoutInvitesInput = {
    update: XOR<RoomUpdateWithoutInvitesInput, RoomUncheckedUpdateWithoutInvitesInput>
    create: XOR<RoomCreateWithoutInvitesInput, RoomUncheckedCreateWithoutInvitesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutInvitesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutInvitesInput, RoomUncheckedUpdateWithoutInvitesInput>
  }

  export type RoomUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedRoomsNestedInput
    participants?: RoomParticipationUpdateManyWithoutRoomNestedInput
    timeLogs?: TimeLogUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerCuid?: StringFieldUpdateOperationsInput | string
    participants?: RoomParticipationUncheckedUpdateManyWithoutRoomNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutSentRoomInvitesInput = {
    update: XOR<UserUpdateWithoutSentRoomInvitesInput, UserUncheckedUpdateWithoutSentRoomInvitesInput>
    create: XOR<UserCreateWithoutSentRoomInvitesInput, UserUncheckedCreateWithoutSentRoomInvitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentRoomInvitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentRoomInvitesInput, UserUncheckedUpdateWithoutSentRoomInvitesInput>
  }

  export type UserUpdateWithoutSentRoomInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUpdateManyWithoutOwnerNestedInput
    receivedRoomInvites?: RoomInviteUpdateManyWithoutInviteeNestedInput
  }

  export type UserUncheckedUpdateWithoutSentRoomInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUncheckedUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUncheckedUpdateManyWithoutOwnerNestedInput
    receivedRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
  }

  export type UserUpsertWithoutReceivedRoomInvitesInput = {
    update: XOR<UserUpdateWithoutReceivedRoomInvitesInput, UserUncheckedUpdateWithoutReceivedRoomInvitesInput>
    create: XOR<UserCreateWithoutReceivedRoomInvitesInput, UserUncheckedCreateWithoutReceivedRoomInvitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedRoomInvitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedRoomInvitesInput, UserUncheckedUpdateWithoutReceivedRoomInvitesInput>
  }

  export type UserUpdateWithoutReceivedRoomInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUpdateManyWithoutInviterNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedRoomInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    friendsFrom?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendsTo?: FriendUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutUserNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutUserNestedInput
    roomParticipations?: RoomParticipationUncheckedUpdateManyWithoutUserNestedInput
    ownedRooms?: RoomUncheckedUpdateManyWithoutOwnerNestedInput
    sentRoomInvites?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
  }

  export type FriendCreateManyFriendInput = {
    userCuid: string
    status?: $Enums.FriendStatus
  }

  export type FriendCreateManyUserInput = {
    friendCuid: string
    status?: $Enums.FriendStatus
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ScheduleCreateManyUserInput = {
    id?: string
    title: string
    startTime?: Date | string | null
    endTime?: Date | string | null
    status?: $Enums.ScheduleStatus
    createdAt?: Date | string | null
    order?: number
    date: string
  }

  export type TimeLogCreateManyUserInput = {
    id?: string
    totalTime: number
    date: Date | string
    createdAt?: Date | string | null
    roomCuid: string
  }

  export type RoomParticipationCreateManyUserInput = {
    roomCuid: string
    joinedAt?: Date | string
  }

  export type RoomCreateManyOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string | null
  }

  export type RoomInviteCreateManyInviterInput = {
    id?: string
    roomCuid: string
    inviteeCuid: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomInviteCreateManyInviteeInput = {
    id?: string
    roomCuid: string
    inviterCuid: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendUpdateWithoutFriendInput = {
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    user?: UserUpdateOneRequiredWithoutFriendsToNestedInput
  }

  export type FriendUncheckedUpdateWithoutFriendInput = {
    userCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
  }

  export type FriendUncheckedUpdateManyWithoutFriendInput = {
    userCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
  }

  export type FriendUpdateWithoutUserInput = {
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    friend?: UserUpdateOneRequiredWithoutFriendsFromNestedInput
  }

  export type FriendUncheckedUpdateWithoutUserInput = {
    friendCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
  }

  export type FriendUncheckedUpdateManyWithoutUserInput = {
    friendCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
  }

  export type ScheduleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
  }

  export type ScheduleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
  }

  export type TimeLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    room?: RoomUpdateOneRequiredWithoutTimeLogsNestedInput
  }

  export type TimeLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roomCuid?: StringFieldUpdateOperationsInput | string
  }

  export type TimeLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roomCuid?: StringFieldUpdateOperationsInput | string
  }

  export type RoomParticipationUpdateWithoutUserInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type RoomParticipationUncheckedUpdateWithoutUserInput = {
    roomCuid?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomParticipationUncheckedUpdateManyWithoutUserInput = {
    roomCuid?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: RoomParticipationUpdateManyWithoutRoomNestedInput
    timeLogs?: TimeLogUpdateManyWithoutRoomNestedInput
    invites?: RoomInviteUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: RoomParticipationUncheckedUpdateManyWithoutRoomNestedInput
    timeLogs?: TimeLogUncheckedUpdateManyWithoutRoomNestedInput
    invites?: RoomInviteUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RoomInviteUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutInvitesNestedInput
    invitee?: UserUpdateOneRequiredWithoutReceivedRoomInvitesNestedInput
  }

  export type RoomInviteUncheckedUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCuid?: StringFieldUpdateOperationsInput | string
    inviteeCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomInviteUncheckedUpdateManyWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCuid?: StringFieldUpdateOperationsInput | string
    inviteeCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomInviteUpdateWithoutInviteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutInvitesNestedInput
    inviter?: UserUpdateOneRequiredWithoutSentRoomInvitesNestedInput
  }

  export type RoomInviteUncheckedUpdateWithoutInviteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCuid?: StringFieldUpdateOperationsInput | string
    inviterCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomInviteUncheckedUpdateManyWithoutInviteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCuid?: StringFieldUpdateOperationsInput | string
    inviterCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomParticipationCreateManyRoomInput = {
    userCuid: string
    joinedAt?: Date | string
  }

  export type TimeLogCreateManyRoomInput = {
    id?: string
    totalTime: number
    date: Date | string
    createdAt?: Date | string | null
    userCuid: string
  }

  export type RoomInviteCreateManyRoomInput = {
    id?: string
    inviterCuid: string
    inviteeCuid: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomParticipationUpdateWithoutRoomInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoomParticipationsNestedInput
  }

  export type RoomParticipationUncheckedUpdateWithoutRoomInput = {
    userCuid?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomParticipationUncheckedUpdateManyWithoutRoomInput = {
    userCuid?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeLogUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTimeLogsNestedInput
  }

  export type TimeLogUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCuid?: StringFieldUpdateOperationsInput | string
  }

  export type TimeLogUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTime?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCuid?: StringFieldUpdateOperationsInput | string
  }

  export type RoomInviteUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviter?: UserUpdateOneRequiredWithoutSentRoomInvitesNestedInput
    invitee?: UserUpdateOneRequiredWithoutReceivedRoomInvitesNestedInput
  }

  export type RoomInviteUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterCuid?: StringFieldUpdateOperationsInput | string
    inviteeCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomInviteUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterCuid?: StringFieldUpdateOperationsInput | string
    inviteeCuid?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}