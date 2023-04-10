import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

export type AccessTokens = {
  __typename?: 'AccessTokens';
  isAdmin?: Maybe<Scalars['Boolean']>;
  jwt: Scalars['String'];
  refreshToken: Scalars['String'];
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type JwtToken = {
  __typename?: 'JwtToken';
  jwt: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignoutOutput = {
  __typename?: 'SignoutOutput';
  ok: Scalars['Boolean'];
};

export type SignupInput = {
  is_admin?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "auth" */
export type Auth = {
  __typename?: 'auth';
  password: Scalars['String'];
  refresh_token?: Maybe<Scalars['String']>;
  refresh_token_expires_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid'];
  username: Scalars['String'];
};

/** aggregated selection of "auth" */
export type Auth_Aggregate = {
  __typename?: 'auth_aggregate';
  aggregate?: Maybe<Auth_Aggregate_Fields>;
  nodes: Array<Auth>;
};

/** aggregate fields of "auth" */
export type Auth_Aggregate_Fields = {
  __typename?: 'auth_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Auth_Max_Fields>;
  min?: Maybe<Auth_Min_Fields>;
};


/** aggregate fields of "auth" */
export type Auth_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Auth_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "auth". All fields are combined with a logical 'AND'. */
export type Auth_Bool_Exp = {
  _and?: InputMaybe<Array<Auth_Bool_Exp>>;
  _not?: InputMaybe<Auth_Bool_Exp>;
  _or?: InputMaybe<Array<Auth_Bool_Exp>>;
  password?: InputMaybe<String_Comparison_Exp>;
  refresh_token?: InputMaybe<String_Comparison_Exp>;
  refresh_token_expires_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth" */
export enum Auth_Constraint {
  /** unique or primary key constraint on columns "username" */
  AuthPkey = 'auth_pkey'
}

/** input type for inserting data into table "auth" */
export type Auth_Insert_Input = {
  password?: InputMaybe<Scalars['String']>;
  refresh_token?: InputMaybe<Scalars['String']>;
  refresh_token_expires_at?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Auth_Max_Fields = {
  __typename?: 'auth_max_fields';
  password?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  refresh_token_expires_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Auth_Min_Fields = {
  __typename?: 'auth_min_fields';
  password?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  refresh_token_expires_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "auth" */
export type Auth_Mutation_Response = {
  __typename?: 'auth_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Auth>;
};

/** input type for inserting object relation for remote table "auth" */
export type Auth_Obj_Rel_Insert_Input = {
  data: Auth_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Auth_On_Conflict>;
};

/** on_conflict condition type for table "auth" */
export type Auth_On_Conflict = {
  constraint: Auth_Constraint;
  update_columns?: Array<Auth_Update_Column>;
  where?: InputMaybe<Auth_Bool_Exp>;
};

/** Ordering options when selecting data from "auth". */
export type Auth_Order_By = {
  password?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  refresh_token_expires_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth */
export type Auth_Pk_Columns_Input = {
  username: Scalars['String'];
};

/** select columns of table "auth" */
export enum Auth_Select_Column {
  /** column name */
  Password = 'password',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  RefreshTokenExpiresAt = 'refresh_token_expires_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "auth" */
export type Auth_Set_Input = {
  password?: InputMaybe<Scalars['String']>;
  refresh_token?: InputMaybe<Scalars['String']>;
  refresh_token_expires_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
  username?: InputMaybe<Scalars['String']>;
};

/** update columns of table "auth" */
export enum Auth_Update_Column {
  /** column name */
  Password = 'password',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  RefreshTokenExpiresAt = 'refresh_token_expires_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Username = 'username'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "auth" */
  delete_auth?: Maybe<Auth_Mutation_Response>;
  /** delete single row from the table: "auth" */
  delete_auth_by_pk?: Maybe<Auth>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** insert data into the table: "auth" */
  insert_auth?: Maybe<Auth_Mutation_Response>;
  /** insert a single row into the table: "auth" */
  insert_auth_one?: Maybe<Auth>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  login: AccessTokens;
  signout?: Maybe<SignoutOutput>;
  signup?: Maybe<SignoutOutput>;
  /** update data of the table: "auth" */
  update_auth?: Maybe<Auth_Mutation_Response>;
  /** update single row of the table: "auth" */
  update_auth_by_pk?: Maybe<Auth>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
};


/** mutation root */
export type Mutation_RootDelete_AuthArgs = {
  where: Auth_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Auth_By_PkArgs = {
  username: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_AuthArgs = {
  objects: Array<Auth_Insert_Input>;
  on_conflict?: InputMaybe<Auth_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Auth_OneArgs = {
  object: Auth_Insert_Input;
  on_conflict?: InputMaybe<Auth_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootLoginArgs = {
  params: LoginInput;
};


/** mutation root */
export type Mutation_RootSignupArgs = {
  params: SignupInput;
};


/** mutation root */
export type Mutation_RootUpdate_AuthArgs = {
  _set?: InputMaybe<Auth_Set_Input>;
  where: Auth_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Auth_By_PkArgs = {
  _set?: InputMaybe<Auth_Set_Input>;
  pk_columns: Auth_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "auth" */
  auth: Array<Auth>;
  /** fetch aggregated fields from the table: "auth" */
  auth_aggregate: Auth_Aggregate;
  /** fetch data from the table: "auth" using primary key columns */
  auth_by_pk?: Maybe<Auth>;
  refreshJwtToken: JwtToken;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


export type Query_RootAuthArgs = {
  distinct_on?: InputMaybe<Array<Auth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Auth_Order_By>>;
  where?: InputMaybe<Auth_Bool_Exp>;
};


export type Query_RootAuth_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Auth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Auth_Order_By>>;
  where?: InputMaybe<Auth_Bool_Exp>;
};


export type Query_RootAuth_By_PkArgs = {
  username: Scalars['String'];
};


export type Query_RootRefreshJwtTokenArgs = {
  refreshToken: Scalars['String'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "auth" */
  auth: Array<Auth>;
  /** fetch aggregated fields from the table: "auth" */
  auth_aggregate: Auth_Aggregate;
  /** fetch data from the table: "auth" using primary key columns */
  auth_by_pk?: Maybe<Auth>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


export type Subscription_RootAuthArgs = {
  distinct_on?: InputMaybe<Array<Auth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Auth_Order_By>>;
  where?: InputMaybe<Auth_Bool_Exp>;
};


export type Subscription_RootAuth_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Auth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Auth_Order_By>>;
  where?: InputMaybe<Auth_Bool_Exp>;
};


export type Subscription_RootAuth_By_PkArgs = {
  username: Scalars['String'];
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  /** An object relationship */
  auth?: Maybe<Auth>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['uuid']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  is_admin: Scalars['Boolean'];
  level?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status: Scalars['numeric'];
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_by?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  status?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  auth?: InputMaybe<Auth_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_by?: InputMaybe<Uuid_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_admin?: InputMaybe<Boolean_Comparison_Exp>;
  level?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_by?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserPkey = 'user_pkey'
}

/** input type for incrementing numeric columns in table "user" */
export type User_Inc_Input = {
  status?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  auth?: InputMaybe<Auth_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  created_by?: InputMaybe<Scalars['uuid']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  is_admin?: InputMaybe<Scalars['Boolean']>;
  level?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['numeric']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  updated_by?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['uuid']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  level?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_by?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['uuid']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  level?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_by?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** on_conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  auth?: InputMaybe<Auth_Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_admin?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsAdmin = 'is_admin',
  /** column name */
  Level = 'level',
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedBy = 'updated_by'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  created_by?: InputMaybe<Scalars['uuid']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  is_admin?: InputMaybe<Scalars['Boolean']>;
  level?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['numeric']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  updated_by?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  status?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  status?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  status?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  status?: Maybe<Scalars['numeric']>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsAdmin = 'is_admin',
  /** column name */
  Level = 'level',
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedBy = 'updated_by'
}

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  status?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  status?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  status?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type UserFieldsFragment = { __typename?: 'user', id: any, name: string, level?: string | null, status: any, created_at?: any | null, is_admin: boolean, auth?: { __typename?: 'auth', username: string } | null };

export type AuthInsertMutationVariables = Exact<{
  object: Auth_Insert_Input;
}>;


export type AuthInsertMutation = { __typename?: 'mutation_root', result?: { __typename?: 'auth', username: string } | null };

export type UserUpsertMutationVariables = Exact<{
  object: User_Insert_Input;
}>;


export type UserUpsertMutation = { __typename?: 'mutation_root', result?: { __typename?: 'user', id: any } | null };

export type UsersUpdateMutationVariables = Exact<{
  where: User_Bool_Exp;
  data?: InputMaybe<User_Set_Input>;
}>;


export type UsersUpdateMutation = { __typename?: 'mutation_root', result?: { __typename?: 'user_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'user', id: any }> } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type UserQuery = { __typename?: 'query_root', item?: { __typename?: 'user', id: any, name: string, level?: string | null, status: any, created_at?: any | null, is_admin: boolean, auth?: { __typename?: 'auth', username: string } | null } | null };

export type UsersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By> | User_Order_By>;
  where?: InputMaybe<User_Bool_Exp>;
}>;


export type UsersQuery = { __typename?: 'query_root', items: Array<{ __typename?: 'user', id: any, name: string, level?: string | null, status: any, created_at?: any | null, is_admin: boolean, auth?: { __typename?: 'auth', username: string } | null }>, items_aggregate: { __typename?: 'user_aggregate', aggregate?: { __typename?: 'user_aggregate_fields', count: number } | null } };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on user {
  id
  name
  level
  status
  created_at
  is_admin
  auth {
    username
  }
}
    `;
export const AuthInsertDocument = gql`
    mutation AuthInsert($object: auth_insert_input!) {
  result: insert_auth_one(object: $object) {
    username
  }
}
    `;
export type AuthInsertMutationFn = Apollo.MutationFunction<AuthInsertMutation, AuthInsertMutationVariables>;

/**
 * __useAuthInsertMutation__
 *
 * To run a mutation, you first call `useAuthInsertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthInsertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authInsertMutation, { data, loading, error }] = useAuthInsertMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useAuthInsertMutation(baseOptions?: Apollo.MutationHookOptions<AuthInsertMutation, AuthInsertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthInsertMutation, AuthInsertMutationVariables>(AuthInsertDocument, options);
      }
export type AuthInsertMutationHookResult = ReturnType<typeof useAuthInsertMutation>;
export type AuthInsertMutationResult = Apollo.MutationResult<AuthInsertMutation>;
export type AuthInsertMutationOptions = Apollo.BaseMutationOptions<AuthInsertMutation, AuthInsertMutationVariables>;
export const UserUpsertDocument = gql`
    mutation UserUpsert($object: user_insert_input!) {
  result: insert_user_one(
    object: $object
    on_conflict: {constraint: user_pkey, update_columns: [name, deleted_at]}
  ) {
    id
  }
}
    `;
export type UserUpsertMutationFn = Apollo.MutationFunction<UserUpsertMutation, UserUpsertMutationVariables>;

/**
 * __useUserUpsertMutation__
 *
 * To run a mutation, you first call `useUserUpsertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpsertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpsertMutation, { data, loading, error }] = useUserUpsertMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useUserUpsertMutation(baseOptions?: Apollo.MutationHookOptions<UserUpsertMutation, UserUpsertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpsertMutation, UserUpsertMutationVariables>(UserUpsertDocument, options);
      }
export type UserUpsertMutationHookResult = ReturnType<typeof useUserUpsertMutation>;
export type UserUpsertMutationResult = Apollo.MutationResult<UserUpsertMutation>;
export type UserUpsertMutationOptions = Apollo.BaseMutationOptions<UserUpsertMutation, UserUpsertMutationVariables>;
export const UsersUpdateDocument = gql`
    mutation UsersUpdate($where: user_bool_exp!, $data: user_set_input) {
  result: update_user(where: $where, _set: $data) {
    affected_rows
    returning {
      id
    }
  }
}
    `;
export type UsersUpdateMutationFn = Apollo.MutationFunction<UsersUpdateMutation, UsersUpdateMutationVariables>;

/**
 * __useUsersUpdateMutation__
 *
 * To run a mutation, you first call `useUsersUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUsersUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [usersUpdateMutation, { data, loading, error }] = useUsersUpdateMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUsersUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UsersUpdateMutation, UsersUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UsersUpdateMutation, UsersUpdateMutationVariables>(UsersUpdateDocument, options);
      }
export type UsersUpdateMutationHookResult = ReturnType<typeof useUsersUpdateMutation>;
export type UsersUpdateMutationResult = Apollo.MutationResult<UsersUpdateMutation>;
export type UsersUpdateMutationOptions = Apollo.BaseMutationOptions<UsersUpdateMutation, UsersUpdateMutationVariables>;
export const UserDocument = gql`
    query User($id: uuid!) {
  item: user_by_pk(id: $id) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users($limit: Int, $offset: Int, $order_by: [user_order_by!], $where: user_bool_exp) {
  items: user(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
    ...UserFields
  }
  items_aggregate: user_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      order_by: // value for 'order_by'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    