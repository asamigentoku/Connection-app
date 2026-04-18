# TweetApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPostTweetCreatePostPost**](TweetApi.md#createposttweetcreatepostpost) | **POST** /tweet/create_post | Create Post |
| [**createPostWithImageTweetCreatePostWithImagePost**](TweetApi.md#createpostwithimagetweetcreatepostwithimagepost) | **POST** /tweet/create_post_with_image | Create Post With Image |
| [**deletePostTweetDeletePostPostIdDelete**](TweetApi.md#deleteposttweetdeletepostpostiddelete) | **DELETE** /tweet/delete_post/{post_id} | Delete Post |
| [**getGoodNumTweetPostsGoodNumPostIdGet**](TweetApi.md#getgoodnumtweetpostsgoodnumpostidget) | **GET** /tweet/posts/good_num/{post_id} | Get Good Num |
| [**getImagesTweetPostsImagesPostIdGet**](TweetApi.md#getimagestweetpostsimagespostidget) | **GET** /tweet/posts/images/{post_id} | Get Images |
| [**getPostsTweetPostsGet**](TweetApi.md#getpoststweetpostsget) | **GET** /tweet/posts | Get Posts |
| [**getReplysTweetPostsReplyPostIdGet**](TweetApi.md#getreplystweetpostsreplypostidget) | **GET** /tweet/posts/reply/{post_id} | Get Replys |
| [**postLikeTweetManegeLikePostIdPost**](TweetApi.md#postliketweetmanegelikepostidpost) | **POST** /tweet/manege_like/{post_id} | Post Like |
| [**updatePostTweetUpdatePostPut**](TweetApi.md#updateposttweetupdatepostput) | **PUT** /tweet/update_post | Update Post |



## createPostTweetCreatePostPost

> ResponseSchema createPostTweetCreatePostPost(createPostModel)

Create Post

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { CreatePostTweetCreatePostPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new TweetApi(config);

  const body = {
    // CreatePostModel
    createPostModel: ...,
  } satisfies CreatePostTweetCreatePostPostRequest;

  try {
    const data = await api.createPostTweetCreatePostPost(body);
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
| **createPostModel** | [CreatePostModel](CreatePostModel.md) |  | |

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


## createPostWithImageTweetCreatePostWithImagePost

> ResponseSchema createPostWithImageTweetCreatePostWithImagePost(bodyCreatePostWithImageTweetCreatePostWithImagePost)

Create Post With Image

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { CreatePostWithImageTweetCreatePostWithImagePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new TweetApi(config);

  const body = {
    // BodyCreatePostWithImageTweetCreatePostWithImagePost
    bodyCreatePostWithImageTweetCreatePostWithImagePost: ...,
  } satisfies CreatePostWithImageTweetCreatePostWithImagePostRequest;

  try {
    const data = await api.createPostWithImageTweetCreatePostWithImagePost(body);
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
| **bodyCreatePostWithImageTweetCreatePostWithImagePost** | [BodyCreatePostWithImageTweetCreatePostWithImagePost](BodyCreatePostWithImageTweetCreatePostWithImagePost.md) |  | |

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


## deletePostTweetDeletePostPostIdDelete

> ResponseSchema deletePostTweetDeletePostPostIdDelete(postId)

Delete Post

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { DeletePostTweetDeletePostPostIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new TweetApi(config);

  const body = {
    // number
    postId: 56,
  } satisfies DeletePostTweetDeletePostPostIdDeleteRequest;

  try {
    const data = await api.deletePostTweetDeletePostPostIdDelete(body);
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
| **postId** | `number` |  | [Defaults to `undefined`] |

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


## getGoodNumTweetPostsGoodNumPostIdGet

> number getGoodNumTweetPostsGoodNumPostIdGet(postId)

Get Good Num

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { GetGoodNumTweetPostsGoodNumPostIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TweetApi();

  const body = {
    // number
    postId: 56,
  } satisfies GetGoodNumTweetPostsGoodNumPostIdGetRequest;

  try {
    const data = await api.getGoodNumTweetPostsGoodNumPostIdGet(body);
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
| **postId** | `number` |  | [Defaults to `undefined`] |

### Return type

**number**

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


## getImagesTweetPostsImagesPostIdGet

> Array&lt;PostImage&gt; getImagesTweetPostsImagesPostIdGet(postId)

Get Images

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { GetImagesTweetPostsImagesPostIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TweetApi();

  const body = {
    // number
    postId: 56,
  } satisfies GetImagesTweetPostsImagesPostIdGetRequest;

  try {
    const data = await api.getImagesTweetPostsImagesPostIdGet(body);
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
| **postId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;PostImage&gt;**](PostImage.md)

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


## getPostsTweetPostsGet

> Array&lt;GetReplyPostModel&gt; getPostsTweetPostsGet()

Get Posts

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { GetPostsTweetPostsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TweetApi();

  try {
    const data = await api.getPostsTweetPostsGet();
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

[**Array&lt;GetReplyPostModel&gt;**](GetReplyPostModel.md)

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


## getReplysTweetPostsReplyPostIdGet

> Array&lt;ReplyModel&gt; getReplysTweetPostsReplyPostIdGet(postId)

Get Replys

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { GetReplysTweetPostsReplyPostIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TweetApi();

  const body = {
    // number
    postId: 56,
  } satisfies GetReplysTweetPostsReplyPostIdGetRequest;

  try {
    const data = await api.getReplysTweetPostsReplyPostIdGet(body);
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
| **postId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;ReplyModel&gt;**](ReplyModel.md)

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


## postLikeTweetManegeLikePostIdPost

> ResponseSchema postLikeTweetManegeLikePostIdPost(postId)

Post Like

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { PostLikeTweetManegeLikePostIdPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new TweetApi(config);

  const body = {
    // number
    postId: 56,
  } satisfies PostLikeTweetManegeLikePostIdPostRequest;

  try {
    const data = await api.postLikeTweetManegeLikePostIdPost(body);
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
| **postId** | `number` |  | [Defaults to `undefined`] |

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


## updatePostTweetUpdatePostPut

> ResponseSchema updatePostTweetUpdatePostPut(postModel)

Update Post

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { UpdatePostTweetUpdatePostPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new TweetApi(config);

  const body = {
    // PostModel
    postModel: ...,
  } satisfies UpdatePostTweetUpdatePostPutRequest;

  try {
    const data = await api.updatePostTweetUpdatePostPut(body);
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
| **postModel** | [PostModel](PostModel.md) |  | |

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

