# UsersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createUserRegisterPost**](UsersApi.md#createuserregisterpost) | **POST** /register | Create User |
| [**getAllUserAllUserGet**](UsersApi.md#getalluseralluserget) | **GET** /all_user | Get All User |
| [**getUserDetailUsersUserIdGet**](UsersApi.md#getuserdetailusersuseridget) | **GET** /users/{user_id} | Get User Detail |
| [**modifyUserUsersUserIdPut**](UsersApi.md#modifyuserusersuseridput) | **PUT** /users/{user_id} | Modify User |



## createUserRegisterPost

> ResponseSchema createUserRegisterPost(userCreate)

Create User

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { CreateUserRegisterPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UsersApi();

  const body = {
    // UserCreate
    userCreate: ...,
  } satisfies CreateUserRegisterPostRequest;

  try {
    const data = await api.createUserRegisterPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userCreate** | [UserCreate](UserCreate.md) |  | |

### Return type

[**ResponseSchema**](ResponseSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAllUserAllUserGet

> Array&lt;UserResponse&gt; getAllUserAllUserGet()

Get All User

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { GetAllUserAllUserGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UsersApi();

  try {
    const data = await api.getAllUserAllUserGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;UserResponse&gt;**](UserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getUserDetailUsersUserIdGet

> UserResponse getUserDetailUsersUserIdGet(userId)

Get User Detail

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { GetUserDetailUsersUserIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // number
    userId: 56,
  } satisfies GetUserDetailUsersUserIdGetRequest;

  try {
    const data = await api.getUserDetailUsersUserIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**UserResponse**](UserResponse.md)

### Authorization

[OAuth2PasswordBearer password](../README.md#OAuth2PasswordBearer-password)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## modifyUserUsersUserIdPut

> ResponseSchema modifyUserUsersUserIdPut(userId, userUpdate)

Modify User

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ModifyUserUsersUserIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // number
    userId: 56,
    // UserUpdate
    userUpdate: ...,
  } satisfies ModifyUserUsersUserIdPutRequest;

  try {
    const data = await api.modifyUserUsersUserIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Defaults to `undefined`] |
| **userUpdate** | [UserUpdate](UserUpdate.md) |  | |

### Return type

[**ResponseSchema**](ResponseSchema.md)

### Authorization

[OAuth2PasswordBearer password](../README.md#OAuth2PasswordBearer-password)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

