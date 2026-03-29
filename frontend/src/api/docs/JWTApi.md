# JWTApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**loginForAccessTokenLoginPost**](JWTApi.md#loginforaccesstokenloginpost) | **POST** /login | Login For Access Token |
| [**readOwnItemsUsersMeItemsGet**](JWTApi.md#readownitemsusersmeitemsget) | **GET** /users/me/items/ | Read Own Items |
| [**readUsersMeUsersMeGet**](JWTApi.md#readusersmeusersmeget) | **GET** /users/me/ | Read Users Me |



## loginForAccessTokenLoginPost

> Token loginForAccessTokenLoginPost(password, username, clientId, clientSecret, grantType, scope)

Login For Access Token

### Example

```ts
import {
  Configuration,
  JWTApi,
} from '';
import type { LoginForAccessTokenLoginPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JWTApi();

  const body = {
    // string
    password: password_example,
    // string
    username: username_example,
    // string (optional)
    clientId: clientId_example,
    // string (optional)
    clientSecret: clientSecret_example,
    // string (optional)
    grantType: grantType_example,
    // string (optional)
    scope: scope_example,
  } satisfies LoginForAccessTokenLoginPostRequest;

  try {
    const data = await api.loginForAccessTokenLoginPost(body);
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
| **password** | `string` |  | [Defaults to `undefined`] |
| **username** | `string` |  | [Defaults to `undefined`] |
| **clientId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **clientSecret** | `string` |  | [Optional] [Defaults to `undefined`] |
| **grantType** | `string` |  | [Optional] [Defaults to `undefined`] |
| **scope** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

### Return type

[**Token**](Token.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/x-www-form-urlencoded`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## readOwnItemsUsersMeItemsGet

> any readOwnItemsUsersMeItemsGet()

Read Own Items

### Example

```ts
import {
  Configuration,
  JWTApi,
} from '';
import type { ReadOwnItemsUsersMeItemsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new JWTApi(config);

  try {
    const data = await api.readOwnItemsUsersMeItemsGet();
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

**any**

### Authorization

[OAuth2PasswordBearer password](../README.md#OAuth2PasswordBearer-password)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## readUsersMeUsersMeGet

> User readUsersMeUsersMeGet()

Read Users Me

### Example

```ts
import {
  Configuration,
  JWTApi,
} from '';
import type { ReadUsersMeUsersMeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new JWTApi(config);

  try {
    const data = await api.readUsersMeUsersMeGet();
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

[**User**](User.md)

### Authorization

[OAuth2PasswordBearer password](../README.md#OAuth2PasswordBearer-password)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

