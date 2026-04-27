# DMApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addRoomMemberTalkAddRoomMemberPost**](DMApi.md#addroommembertalkaddroommemberpost) | **POST** /talk/add_room_member | Add Room Member |
| [**createRoomTalkCreateRoomPost**](DMApi.md#createroomtalkcreateroompost) | **POST** /talk/create_room | Create Room |
| [**deleteMessageTalkMessageDeleteMessageIdDelete**](DMApi.md#deletemessagetalkmessagedeletemessageiddelete) | **DELETE** /talk/message_delete/{message_id} | Delete Message |
| [**getRoomsByUserTalkUserRoomsGet**](DMApi.md#getroomsbyusertalkuserroomsget) | **GET** /talk/user_rooms | Get Rooms By User |
| [**readRoomTalkFriendInformationRoomIdGet**](DMApi.md#readroomtalkfriendinformationroomidget) | **GET** /talk/friend_information/{room_id} | Read Room |
| [**readRoomTalkUserInformationRoomIdGet**](DMApi.md#readroomtalkuserinformationroomidget) | **GET** /talk/user_information/{room_id} | Read Room |
| [**searchRoomTalkSearchMakeUsersRoomPost**](DMApi.md#searchroomtalksearchmakeusersroompost) | **POST** /talk/search_make_users_room | Search Room |
| [**submitMessageTalkMessageSubmitPost**](DMApi.md#submitmessagetalkmessagesubmitpost) | **POST** /talk/message_submit | Submit Message |
| [**updateTalkMessageUpdatePut**](DMApi.md#updatetalkmessageupdateput) | **PUT** /talk/message_update | Update |



## addRoomMemberTalkAddRoomMemberPost

> ResponseSchema addRoomMemberTalkAddRoomMemberPost(addRoomMember)

Add Room Member

### Example

```ts
import {
  Configuration,
  DMApi,
} from '';
import type { AddRoomMemberTalkAddRoomMemberPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DMApi(config);

  const body = {
    // AddRoomMember
    addRoomMember: ...,
  } satisfies AddRoomMemberTalkAddRoomMemberPostRequest;

  try {
    const data = await api.addRoomMemberTalkAddRoomMemberPost(body);
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
| **addRoomMember** | [AddRoomMember](AddRoomMember.md) |  | |

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


## createRoomTalkCreateRoomPost

> ResponseSchema createRoomTalkCreateRoomPost(createRoom)

Create Room

### Example

```ts
import {
  Configuration,
  DMApi,
} from '';
import type { CreateRoomTalkCreateRoomPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DMApi(config);

  const body = {
    // CreateRoom
    createRoom: ...,
  } satisfies CreateRoomTalkCreateRoomPostRequest;

  try {
    const data = await api.createRoomTalkCreateRoomPost(body);
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
| **createRoom** | [CreateRoom](CreateRoom.md) |  | |

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


## deleteMessageTalkMessageDeleteMessageIdDelete

> ResponseSchema deleteMessageTalkMessageDeleteMessageIdDelete(messageId)

Delete Message

### Example

```ts
import {
  Configuration,
  DMApi,
} from '';
import type { DeleteMessageTalkMessageDeleteMessageIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DMApi(config);

  const body = {
    // number
    messageId: 56,
  } satisfies DeleteMessageTalkMessageDeleteMessageIdDeleteRequest;

  try {
    const data = await api.deleteMessageTalkMessageDeleteMessageIdDelete(body);
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
| **messageId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**ResponseSchema**](ResponseSchema.md)

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


## getRoomsByUserTalkUserRoomsGet

> Array&lt;RoomBase&gt; getRoomsByUserTalkUserRoomsGet()

Get Rooms By User

### Example

```ts
import {
  Configuration,
  DMApi,
} from '';
import type { GetRoomsByUserTalkUserRoomsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DMApi(config);

  try {
    const data = await api.getRoomsByUserTalkUserRoomsGet();
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

[**Array&lt;RoomBase&gt;**](RoomBase.md)

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


## readRoomTalkFriendInformationRoomIdGet

> UserResponse readRoomTalkFriendInformationRoomIdGet(roomId)

Read Room

### Example

```ts
import {
  Configuration,
  DMApi,
} from '';
import type { ReadRoomTalkFriendInformationRoomIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DMApi(config);

  const body = {
    // number
    roomId: 56,
  } satisfies ReadRoomTalkFriendInformationRoomIdGetRequest;

  try {
    const data = await api.readRoomTalkFriendInformationRoomIdGet(body);
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
| **roomId** | `number` |  | [Defaults to `undefined`] |

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


## readRoomTalkUserInformationRoomIdGet

> Array&lt;GetMessage&gt; readRoomTalkUserInformationRoomIdGet(roomId)

Read Room

### Example

```ts
import {
  Configuration,
  DMApi,
} from '';
import type { ReadRoomTalkUserInformationRoomIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DMApi(config);

  const body = {
    // number
    roomId: 56,
  } satisfies ReadRoomTalkUserInformationRoomIdGetRequest;

  try {
    const data = await api.readRoomTalkUserInformationRoomIdGet(body);
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
| **roomId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;GetMessage&gt;**](GetMessage.md)

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


## searchRoomTalkSearchMakeUsersRoomPost

> RoomBase searchRoomTalkSearchMakeUsersRoomPost(user1Id, user2Id)

Search Room

### Example

```ts
import {
  Configuration,
  DMApi,
} from '';
import type { SearchRoomTalkSearchMakeUsersRoomPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DMApi(config);

  const body = {
    // number
    user1Id: 56,
    // number
    user2Id: 56,
  } satisfies SearchRoomTalkSearchMakeUsersRoomPostRequest;

  try {
    const data = await api.searchRoomTalkSearchMakeUsersRoomPost(body);
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
| **user1Id** | `number` |  | [Defaults to `undefined`] |
| **user2Id** | `number` |  | [Defaults to `undefined`] |

### Return type

[**RoomBase**](RoomBase.md)

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


## submitMessageTalkMessageSubmitPost

> ResponseSchema submitMessageTalkMessageSubmitPost(submitMessage)

Submit Message

### Example

```ts
import {
  Configuration,
  DMApi,
} from '';
import type { SubmitMessageTalkMessageSubmitPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DMApi(config);

  const body = {
    // SubmitMessage
    submitMessage: ...,
  } satisfies SubmitMessageTalkMessageSubmitPostRequest;

  try {
    const data = await api.submitMessageTalkMessageSubmitPost(body);
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
| **submitMessage** | [SubmitMessage](SubmitMessage.md) |  | |

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


## updateTalkMessageUpdatePut

> ResponseSchema updateTalkMessageUpdatePut(updateMessage)

Update

### Example

```ts
import {
  Configuration,
  DMApi,
} from '';
import type { UpdateTalkMessageUpdatePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new DMApi(config);

  const body = {
    // UpdateMessage
    updateMessage: ...,
  } satisfies UpdateTalkMessageUpdatePutRequest;

  try {
    const data = await api.updateTalkMessageUpdatePut(body);
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
| **updateMessage** | [UpdateMessage](UpdateMessage.md) |  | |

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

