# TweetApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPostTweetcreatePostPost**](TweetApi.md#createposttweetcreatepostpost) | **POST** /tweetcreate_post | Create Post |
| [**createPostWithImageTweetcreatePostWithImagePost**](TweetApi.md#createpostwithimagetweetcreatepostwithimagepost) | **POST** /tweetcreate_post_with_image | Create Post With Image |
| [**deletePostTweetdeletePostPostIdDelete**](TweetApi.md#deleteposttweetdeletepostpostiddelete) | **DELETE** /tweetdelete_post/{post_id} | Delete Post |
| [**getGoodNumTweetpostsGoodNumPostIdGet**](TweetApi.md#getgoodnumtweetpostsgoodnumpostidget) | **GET** /tweetposts/good_num/{post_id} | Get Good Num |
| [**getImagesTweetpostsImagesPostIdGet**](TweetApi.md#getimagestweetpostsimagespostidget) | **GET** /tweetposts/images/{post_id} | Get Images |
| [**getPostsTweetPostsGet**](TweetApi.md#getpoststweetpostsget) | **GET** /tweet/posts | Get Posts |
| [**getReplysTweetpostsReplyPostIdGet**](TweetApi.md#getreplystweetpostsreplypostidget) | **GET** /tweetposts/reply/{post_id} | Get Replys |
| [**postLikeTweetmanegeLikePostIdPost**](TweetApi.md#postliketweetmanegelikepostidpost) | **POST** /tweetmanege_like/{post_id} | Post Like |
| [**updatePostTweetupdatePostPut**](TweetApi.md#updateposttweetupdatepostput) | **PUT** /tweetupdate_post | Update Post |



## createPostTweetcreatePostPost

> ResponseSchema createPostTweetcreatePostPost(createPostModel)

Create Post

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { CreatePostTweetcreatePostPostRequest } from '';

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
  } satisfies CreatePostTweetcreatePostPostRequest;

  try {
    const data = await api.createPostTweetcreatePostPost(body);
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


## createPostWithImageTweetcreatePostWithImagePost

> ResponseSchema createPostWithImageTweetcreatePostWithImagePost(bodyCreatePostWithImageTweetcreatePostWithImagePost)

Create Post With Image

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { CreatePostWithImageTweetcreatePostWithImagePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2PasswordBearer password
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new TweetApi(config);

  const body = {
    // BodyCreatePostWithImageTweetcreatePostWithImagePost
    bodyCreatePostWithImageTweetcreatePostWithImagePost: ...,
  } satisfies CreatePostWithImageTweetcreatePostWithImagePostRequest;

  try {
    const data = await api.createPostWithImageTweetcreatePostWithImagePost(body);
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
| **bodyCreatePostWithImageTweetcreatePostWithImagePost** | [BodyCreatePostWithImageTweetcreatePostWithImagePost](BodyCreatePostWithImageTweetcreatePostWithImagePost.md) |  | |

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


## deletePostTweetdeletePostPostIdDelete

> ResponseSchema deletePostTweetdeletePostPostIdDelete(postId)

Delete Post

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { DeletePostTweetdeletePostPostIdDeleteRequest } from '';

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
  } satisfies DeletePostTweetdeletePostPostIdDeleteRequest;

  try {
    const data = await api.deletePostTweetdeletePostPostIdDelete(body);
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


## getGoodNumTweetpostsGoodNumPostIdGet

> number getGoodNumTweetpostsGoodNumPostIdGet(postId)

Get Good Num

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { GetGoodNumTweetpostsGoodNumPostIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TweetApi();

  const body = {
    // number
    postId: 56,
  } satisfies GetGoodNumTweetpostsGoodNumPostIdGetRequest;

  try {
    const data = await api.getGoodNumTweetpostsGoodNumPostIdGet(body);
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


## getImagesTweetpostsImagesPostIdGet

> Array&lt;PostImage&gt; getImagesTweetpostsImagesPostIdGet(postId)

Get Images

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { GetImagesTweetpostsImagesPostIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TweetApi();

  const body = {
    // number
    postId: 56,
  } satisfies GetImagesTweetpostsImagesPostIdGetRequest;

  try {
    const data = await api.getImagesTweetpostsImagesPostIdGet(body);
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


## getReplysTweetpostsReplyPostIdGet

> Array&lt;ReplyModel&gt; getReplysTweetpostsReplyPostIdGet(postId)

Get Replys

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { GetReplysTweetpostsReplyPostIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TweetApi();

  const body = {
    // number
    postId: 56,
  } satisfies GetReplysTweetpostsReplyPostIdGetRequest;

  try {
    const data = await api.getReplysTweetpostsReplyPostIdGet(body);
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


## postLikeTweetmanegeLikePostIdPost

> ResponseSchema postLikeTweetmanegeLikePostIdPost(postId)

Post Like

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { PostLikeTweetmanegeLikePostIdPostRequest } from '';

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
  } satisfies PostLikeTweetmanegeLikePostIdPostRequest;

  try {
    const data = await api.postLikeTweetmanegeLikePostIdPost(body);
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


## updatePostTweetupdatePostPut

> ResponseSchema updatePostTweetupdatePostPut(postModel)

Update Post

### Example

```ts
import {
  Configuration,
  TweetApi,
} from '';
import type { UpdatePostTweetupdatePostPutRequest } from '';

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
  } satisfies UpdatePostTweetupdatePostPutRequest;

  try {
    const data = await api.updatePostTweetupdatePostPut(body);
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

