// This file is auto-generated by @hey-api/openapi-ts

import { type Options as ClientOptions, type TDataShape, type Client, urlSearchParamsBodySerializer, formDataBodySerializer } from '@hey-api/client-axios';
import type { LoginAccessTokenData, LoginAccessTokenResponse, LoginAccessTokenError, GetUsersData, GetUsersResponse, CreateUserData, CreateUserResponse, CreateUserError, GetUserMeData, GetUserMeResponse, GetItemsData, GetItemsResponse, GetItemsError, CreateItemData, CreateItemResponse, CreateItemError, DeleteItemData, DeleteItemResponse, DeleteItemError, UpdateItemData, UpdateItemResponse, UpdateItemError, GetItemTagsData, GetItemTagsResponse, CreateFileData, CreateFileResponse, CreateFileError, GetUploadFilesData, GetUploadFilesResponse, GetUploadFilesError, CreateUploadFileData, CreateUploadFileResponse, CreateUploadFileError, DeleteFileData, DeleteFileError, DownloadFileData, DownloadFileError, CreateFileWithFormData, CreateFileWithFormResponse, CreateFileWithFormError } from './types.gen';
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

/**
 * Create File
 * 使用File()上传文件,适用于小型文件
 */
export const createFile = <ThrowOnError extends boolean = false>(options: Options<CreateFileData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateFileResponse, CreateFileError, ThrowOnError>({
        ...formDataBodySerializer,
        url: '/api/v1/files/',
        ...options,
        headers: {
            'Content-Type': null,
            ...options?.headers
        }
    });
};

/**
 * Get Upload Files
 */
export const getUploadFiles = <ThrowOnError extends boolean = false>(options?: Options<GetUploadFilesData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetUploadFilesResponse, GetUploadFilesError, ThrowOnError>({
        url: '/api/v1/upload-file/',
        ...options
    });
};

/**
 * Create Upload File
 * 使用UploadFile()上传文件, 适用于图像、视频、二进制文件等大型文件, 可获取上传文件的元数据
 */
export const createUploadFile = <ThrowOnError extends boolean = false>(options: Options<CreateUploadFileData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateUploadFileResponse, CreateUploadFileError, ThrowOnError>({
        ...formDataBodySerializer,
        url: '/api/v1/upload-file/',
        ...options,
        headers: {
            'Content-Type': null,
            ...options?.headers
        }
    });
};

/**
 * Delete File
 * 删除上传的文件
 */
export const deleteFile = <ThrowOnError extends boolean = false>(options: Options<DeleteFileData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<unknown, DeleteFileError, ThrowOnError>({
        url: '/api/v1/upload-file/{file_id}',
        ...options
    });
};

/**
 * Download File
 */
export const downloadFile = <ThrowOnError extends boolean = false>(options: Options<DownloadFileData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<unknown, DownloadFileError, ThrowOnError>({
        url: '/api/v1/upload-file/{file_id}',
        ...options
    });
};

/**
 * Create File With Form
 * 表单文件上传
 */
export const createFileWithForm = <ThrowOnError extends boolean = false>(options: Options<CreateFileWithFormData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateFileWithFormResponse, CreateFileWithFormError, ThrowOnError>({
        ...formDataBodySerializer,
        url: '/api/v1/upload-file-form/',
        ...options,
        headers: {
            'Content-Type': null,
            ...options?.headers
        }
    });
};