// This file is auto-generated by @hey-api/openapi-ts

export type BodyCreateFile = {
    file: Blob | File;
};

export type BodyCreateFileWithForm = {
    file: Blob | File;
    fileb?: (Blob | File) | null;
    token: string;
};

export type BodyCreateUploadFile = {
    file: Blob | File;
};

export type BodyLoginAccessToken = {
    grant_type?: string | null;
    username: string;
    password: string;
    scope?: string;
    client_id?: string | null;
    client_secret?: string | null;
};

/**
 * File响应模型
 */
export type File = {
    file_size: number;
};

/**
 * File表单上传响应模型
 */
export type FileForm = {
    file_size: number;
    token: string;
    fileb_content_type: string | null;
};

export type HttpValidationError = {
    detail?: Array<ValidationError>;
};

export type ItemCreate = {
    title: string;
    /**
     * 1: 在线, 2: 离线
     */
    status?: StatusEnum;
    tags?: Array<string>;
};

export type ItemPublic = {
    title: string;
    /**
     * 1: 在线, 2: 离线
     */
    status?: StatusEnum;
    id: number;
    owner: UserPubic;
    tags: Array<TagName>;
};

export type ItemUpdate = {
    title?: string | null;
    /**
     * 1: 在线, 2: 离线
     */
    status?: StatusEnum;
    tags?: Array<string>;
};

export type PageItemPublic = {
    items: Array<ItemPublic>;
    total: number | null;
    page: number | null;
    size: number | null;
    pages?: number | null;
};

/**
 * 状态，1: 在线, 2: 离线
 */
export enum StatusEnum {
    _1 = 1,
    _2 = 2
}

/**
 * 标签表
 */
export type Tag = {
    id?: number | null;
    name: string;
};

export type TagName = string;

export type Token = {
    access_token: string;
    token_type?: string;
};

/**
 * UploadFile响应模型
 */
export type UploadFile = {
    file_name: string | null;
    file_size: number | null;
    content_type: string | null;
};

export type UserCreate = {
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    full_name?: string | null;
    password: string;
};

export type UserPubic = {
    id?: number | null;
    email?: string | null;
    is_active?: boolean;
    is_superuser?: boolean;
    full_name?: string | null;
};

export type UsersPublic = {
    data: Array<UserPubic>;
};

export type ValidationError = {
    loc: Array<string | number>;
    msg: string;
    type: string;
};

export type LoginAccessTokenData = {
    body: BodyLoginAccessToken;
    path?: never;
    query?: never;
    url: '/api/v1/login/access-token';
};

export type LoginAccessTokenErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type LoginAccessTokenError = LoginAccessTokenErrors[keyof LoginAccessTokenErrors];

export type LoginAccessTokenResponses = {
    /**
     * Successful Response
     */
    200: Token;
};

export type LoginAccessTokenResponse = LoginAccessTokenResponses[keyof LoginAccessTokenResponses];

export type GetUsersData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v1/users/';
};

export type GetUsersResponses = {
    /**
     * Successful Response
     */
    200: UsersPublic;
};

export type GetUsersResponse = GetUsersResponses[keyof GetUsersResponses];

export type CreateUserData = {
    body: UserCreate;
    path?: never;
    query?: never;
    url: '/api/v1/users/';
};

export type CreateUserErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateUserError = CreateUserErrors[keyof CreateUserErrors];

export type CreateUserResponses = {
    /**
     * Successful Response
     */
    200: UserPubic;
};

export type CreateUserResponse = CreateUserResponses[keyof CreateUserResponses];

export type GetUserMeData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v1/users/me';
};

export type GetUserMeResponses = {
    /**
     * Successful Response
     */
    200: UserPubic;
};

export type GetUserMeResponse = GetUserMeResponses[keyof GetUserMeResponses];

export type GetItemsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * 多个字段使用`,`隔开，字段前`-`表示降序， 例如 `-id` 表示降序
         */
        order_by?: string | null;
        /**
         * 1: 在线， 2: 离线
         */
        status?: StatusEnum | null;
        title__like?: string | null;
        /**
         * Page number
         */
        page?: number;
        /**
         * Page size
         */
        size?: number;
    };
    url: '/api/v1/items/';
};

export type GetItemsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetItemsError = GetItemsErrors[keyof GetItemsErrors];

export type GetItemsResponses = {
    /**
     * Successful Response
     */
    200: PageItemPublic;
};

export type GetItemsResponse = GetItemsResponses[keyof GetItemsResponses];

export type CreateItemData = {
    body: ItemCreate;
    path?: never;
    query?: never;
    url: '/api/v1/items/';
};

export type CreateItemErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateItemError = CreateItemErrors[keyof CreateItemErrors];

export type CreateItemResponses = {
    /**
     * Successful Response
     */
    200: ItemPublic;
};

export type CreateItemResponse = CreateItemResponses[keyof CreateItemResponses];

export type DeleteItemData = {
    body?: never;
    path: {
        item_id: number;
    };
    query?: never;
    url: '/api/v1/items/{item_id}';
};

export type DeleteItemErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type DeleteItemError = DeleteItemErrors[keyof DeleteItemErrors];

export type DeleteItemResponses = {
    /**
     * Successful Response
     */
    200: ItemPublic;
};

export type DeleteItemResponse = DeleteItemResponses[keyof DeleteItemResponses];

export type UpdateItemData = {
    body: ItemUpdate;
    path: {
        item_id: number;
    };
    query?: never;
    url: '/api/v1/items/{item_id}';
};

export type UpdateItemErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type UpdateItemError = UpdateItemErrors[keyof UpdateItemErrors];

export type UpdateItemResponses = {
    /**
     * Successful Response
     */
    200: ItemPublic;
};

export type UpdateItemResponse = UpdateItemResponses[keyof UpdateItemResponses];

export type GetItemTagsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v1/items/tags/';
};

export type GetItemTagsResponses = {
    /**
     * Successful Response
     */
    200: Array<Tag>;
};

export type GetItemTagsResponse = GetItemTagsResponses[keyof GetItemTagsResponses];

export type CreateFileData = {
    body: BodyCreateFile;
    path?: never;
    query?: never;
    url: '/api/v1/files/';
};

export type CreateFileErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateFileError = CreateFileErrors[keyof CreateFileErrors];

export type CreateFileResponses = {
    /**
     * Successful Response
     */
    200: File;
};

export type CreateFileResponse = CreateFileResponses[keyof CreateFileResponses];

export type CreateUploadFileData = {
    body: BodyCreateUploadFile;
    path?: never;
    query?: never;
    url: '/api/v1/upload-file/';
};

export type CreateUploadFileErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateUploadFileError = CreateUploadFileErrors[keyof CreateUploadFileErrors];

export type CreateUploadFileResponses = {
    /**
     * Successful Response
     */
    200: UploadFile;
};

export type CreateUploadFileResponse = CreateUploadFileResponses[keyof CreateUploadFileResponses];

export type CreateFileWithFormData = {
    body: BodyCreateFileWithForm;
    path?: never;
    query?: never;
    url: '/api/v1/upload-file-form/';
};

export type CreateFileWithFormErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateFileWithFormError = CreateFileWithFormErrors[keyof CreateFileWithFormErrors];

export type CreateFileWithFormResponses = {
    /**
     * Successful Response
     */
    200: FileForm;
};

export type CreateFileWithFormResponse = CreateFileWithFormResponses[keyof CreateFileWithFormResponses];

export type ClientOptions = {
    baseURL: 'http://127.0.0.1:8000' | (string & {});
};