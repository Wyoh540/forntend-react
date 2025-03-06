// This file is auto-generated by @hey-api/openapi-ts

import { type Options, loginAccessToken, getUsers, createUser, getUserMe, getItems, createItem, deleteItem, updateItem, getItemTags } from '../sdk.gen';
import { queryOptions, type UseMutationOptions, infiniteQueryOptions, type InfiniteData } from '@tanstack/react-query';
import type { LoginAccessTokenData, LoginAccessTokenError, LoginAccessTokenResponse, GetUsersData, CreateUserData, CreateUserError, CreateUserResponse, GetUserMeData, GetItemsData, GetItemsError, GetItemsResponse, CreateItemData, CreateItemError, CreateItemResponse, DeleteItemData, DeleteItemError, DeleteItemResponse, UpdateItemData, UpdateItemError, UpdateItemResponse, GetItemTagsData } from '../types.gen';
import type { AxiosError } from 'axios';
import { client as _heyApiClient } from '../client.gen';

export type QueryKey<TOptions extends Options> = [
    Pick<TOptions, 'baseURL' | 'body' | 'headers' | 'path' | 'query'> & {
        _id: string;
        _infinite?: boolean;
    }
];

const createQueryKey = <TOptions extends Options>(id: string, options?: TOptions, infinite?: boolean): [
    QueryKey<TOptions>[0]
] => {
    const params: QueryKey<TOptions>[0] = { _id: id, baseURL: (options?.client ?? _heyApiClient).getConfig().baseURL } as QueryKey<TOptions>[0];
    if (infinite) {
        params._infinite = infinite;
    }
    if (options?.body) {
        params.body = options.body;
    }
    if (options?.headers) {
        params.headers = options.headers;
    }
    if (options?.path) {
        params.path = options.path;
    }
    if (options?.query) {
        params.query = options.query;
    }
    return [
        params
    ];
};

export const loginAccessTokenQueryKey = (options: Options<LoginAccessTokenData>) => createQueryKey('loginAccessToken', options);

export const loginAccessTokenOptions = (options: Options<LoginAccessTokenData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await loginAccessToken({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: loginAccessTokenQueryKey(options)
    });
};

export const loginAccessTokenMutation = (options?: Partial<Options<LoginAccessTokenData>>) => {
    const mutationOptions: UseMutationOptions<LoginAccessTokenResponse, AxiosError<LoginAccessTokenError>, Options<LoginAccessTokenData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await loginAccessToken({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const getUsersQueryKey = (options?: Options<GetUsersData>) => createQueryKey('getUsers', options);

export const getUsersOptions = (options?: Options<GetUsersData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await getUsers({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getUsersQueryKey(options)
    });
};

export const createUserQueryKey = (options: Options<CreateUserData>) => createQueryKey('createUser', options);

export const createUserOptions = (options: Options<CreateUserData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await createUser({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: createUserQueryKey(options)
    });
};

export const createUserMutation = (options?: Partial<Options<CreateUserData>>) => {
    const mutationOptions: UseMutationOptions<CreateUserResponse, AxiosError<CreateUserError>, Options<CreateUserData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await createUser({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const getUserMeQueryKey = (options?: Options<GetUserMeData>) => createQueryKey('getUserMe', options);

export const getUserMeOptions = (options?: Options<GetUserMeData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await getUserMe({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getUserMeQueryKey(options)
    });
};

export const getItemsQueryKey = (options?: Options<GetItemsData>) => createQueryKey('getItems', options);

export const getItemsOptions = (options?: Options<GetItemsData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await getItems({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getItemsQueryKey(options)
    });
};

const createInfiniteParams = <K extends Pick<QueryKey<Options>[0], 'body' | 'headers' | 'path' | 'query'>>(queryKey: QueryKey<Options>, page: K) => {
    const params = queryKey[0];
    if (page.body) {
        params.body = {
            ...queryKey[0].body as any,
            ...page.body as any
        };
    }
    if (page.headers) {
        params.headers = {
            ...queryKey[0].headers,
            ...page.headers
        };
    }
    if (page.path) {
        params.path = {
            ...queryKey[0].path as any,
            ...page.path as any
        };
    }
    if (page.query) {
        params.query = {
            ...queryKey[0].query as any,
            ...page.query as any
        };
    }
    return params as unknown as typeof page;
};

export const getItemsInfiniteQueryKey = (options?: Options<GetItemsData>): QueryKey<Options<GetItemsData>> => createQueryKey('getItems', options, true);

export const getItemsInfiniteOptions = (options?: Options<GetItemsData>) => {
    return infiniteQueryOptions<GetItemsResponse, AxiosError<GetItemsError>, InfiniteData<GetItemsResponse>, QueryKey<Options<GetItemsData>>, number | Pick<QueryKey<Options<GetItemsData>>[0], 'body' | 'headers' | 'path' | 'query'>>(
    // @ts-ignore
    {
        queryFn: async ({ pageParam, queryKey, signal }) => {
            // @ts-ignore
            const page: Pick<QueryKey<Options<GetItemsData>>[0], 'body' | 'headers' | 'path' | 'query'> = typeof pageParam === 'object' ? pageParam : {
                query: {
                    page: pageParam
                }
            };
            const params = createInfiniteParams(queryKey, page);
            const { data } = await getItems({
                ...options,
                ...params,
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getItemsInfiniteQueryKey(options)
    });
};

export const createItemQueryKey = (options: Options<CreateItemData>) => createQueryKey('createItem', options);

export const createItemOptions = (options: Options<CreateItemData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await createItem({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: createItemQueryKey(options)
    });
};

export const createItemMutation = (options?: Partial<Options<CreateItemData>>) => {
    const mutationOptions: UseMutationOptions<CreateItemResponse, AxiosError<CreateItemError>, Options<CreateItemData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await createItem({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const deleteItemMutation = (options?: Partial<Options<DeleteItemData>>) => {
    const mutationOptions: UseMutationOptions<DeleteItemResponse, AxiosError<DeleteItemError>, Options<DeleteItemData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await deleteItem({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const updateItemMutation = (options?: Partial<Options<UpdateItemData>>) => {
    const mutationOptions: UseMutationOptions<UpdateItemResponse, AxiosError<UpdateItemError>, Options<UpdateItemData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await updateItem({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const getItemTagsQueryKey = (options?: Options<GetItemTagsData>) => createQueryKey('getItemTags', options);

export const getItemTagsOptions = (options?: Options<GetItemTagsData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await getItemTags({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getItemTagsQueryKey(options)
    });
};