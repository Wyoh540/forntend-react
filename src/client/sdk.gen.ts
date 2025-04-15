// This file is auto-generated by @hey-api/openapi-ts

import { type Options as ClientOptions, type TDataShape, type Client, urlSearchParamsBodySerializer } from '@hey-api/client-axios';
import type { LoginAccessTokenData, LoginAccessTokenResponse, LoginAccessTokenError, GetUsersData, GetUsersResponse, CreateUserData, CreateUserResponse, CreateUserError, GetUserMeData, GetUserMeResponse, GetItemsData, GetItemsResponse, GetItemsError, CreateItemData, CreateItemResponse, CreateItemError, DeleteItemData, DeleteItemResponse, DeleteItemError, UpdateItemData, UpdateItemResponse, UpdateItemError, GetItemTagsData, GetItemTagsResponse } from './types.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

/**
 * Login Access Token
 */
export const loginAccessToken = <ThrowOnError extends boolean = false>(options: Options<LoginAccessTokenData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<LoginAccessTokenResponse, LoginAccessTokenError, ThrowOnError>({
        ...urlSearchParamsBodySerializer,
        url: '/api/v1/login/access-token',
        ...options,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options?.headers
        }
    });
};

/**
 * Get Users
 */
export const getUsers = <ThrowOnError extends boolean = false>(options?: Options<GetUsersData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetUsersResponse, unknown, ThrowOnError>({
        url: '/api/v1/users/',
        ...options
    });
};

/**
 * Create User
 */
export const createUser = <ThrowOnError extends boolean = false>(options: Options<CreateUserData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateUserResponse, CreateUserError, ThrowOnError>({
        url: '/api/v1/users/',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get User Me
 */
export const getUserMe = <ThrowOnError extends boolean = false>(options?: Options<GetUserMeData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetUserMeResponse, unknown, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/users/me',
        ...options
    });
};

/**
 * Get Items
 */
export const getItems = <ThrowOnError extends boolean = false>(options?: Options<GetItemsData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetItemsResponse, GetItemsError, ThrowOnError>({
        url: '/api/v1/items/',
        ...options
    });
};

/**
 * Create Item
 */
export const createItem = <ThrowOnError extends boolean = false>(options: Options<CreateItemData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateItemResponse, CreateItemError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/items/',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete Item
 */
export const deleteItem = <ThrowOnError extends boolean = false>(options: Options<DeleteItemData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<DeleteItemResponse, DeleteItemError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/items/{item_id}',
        ...options
    });
};

/**
 * Update Item
 */
export const updateItem = <ThrowOnError extends boolean = false>(options: Options<UpdateItemData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).patch<UpdateItemResponse, UpdateItemError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/items/{item_id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get Item Tags
 */
export const getItemTags = <ThrowOnError extends boolean = false>(options?: Options<GetItemTagsData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetItemTagsResponse, unknown, ThrowOnError>({
        url: '/api/v1/items/tags/',
        ...options
    });
};