# FriendsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createFriendsFriendsMakeFriendsPost**](FriendsApi.md#createfriendsfriendsmakefriendspost) | **POST** /friends/make_friends | Create Friends |
| [**deleteFriendsFriendsDeleteFriendsDelete**](FriendsApi.md#deletefriendsfriendsdeletefriendsdelete) | **DELETE** /friends/delete_friends | Delete Friends |
| [**getFriendsListFriendsFriendsListUserIdGet**](FriendsApi.md#getfriendslistfriendsfriendslistuseridget) | **GET** /friends/friends_list/{user_id} | Get Friends List |



## createFriendsFriendsMakeFriendsPost

> ResponseSchema createFriendsFriendsMakeFriendsPost(userId, friendsId)

Create Friends

### Example

```ts
import {
  Configuration,
  FriendsApi,
} from '';
import type { CreateFriendsFriendsMakeFriendsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FriendsApi();

  const body = {
    // number
    userId: 56,
    // number
    friendsId: 56,
  } satisfies CreateFriendsFriendsMakeFriendsPostRequest;

  try {
    const data = await api.createFriendsFriendsMakeFriendsPost(body);
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
| **friendsId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**ResponseSchema**](ResponseSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteFriendsFriendsDeleteFriendsDelete

> ResponseSchema deleteFriendsFriendsDeleteFriendsDelete(userId, friendsId)

Delete Friends

### Example

```ts
import {
  Configuration,
  FriendsApi,
} from '';
import type { DeleteFriendsFriendsDeleteFriendsDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FriendsApi();

  const body = {
    // number
    userId: 56,
    // number
    friendsId: 56,
  } satisfies DeleteFriendsFriendsDeleteFriendsDeleteRequest;

  try {
    const data = await api.deleteFriendsFriendsDeleteFriendsDelete(body);
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
| **friendsId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**ResponseSchema**](ResponseSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getFriendsListFriendsFriendsListUserIdGet

> Array&lt;UserResponse&gt; getFriendsListFriendsFriendsListUserIdGet(userId)

Get Friends List

### Example

```ts
import {
  Configuration,
  FriendsApi,
} from '';
import type { GetFriendsListFriendsFriendsListUserIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FriendsApi();

  const body = {
    // number
    userId: 56,
  } satisfies GetFriendsListFriendsFriendsListUserIdGetRequest;

  try {
    const data = await api.getFriendsListFriendsFriendsListUserIdGet(body);
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
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

