# EmotionApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getEmotionByMessageEmotionGetEmotionByMessagePost**](EmotionApi.md#getemotionbymessageemotiongetemotionbymessagepost) | **POST** /emotion/get_emotion_by_message | Get Emotion By Message |
| [**getEmotionByPostEmotionGetEmotionByPostPost**](EmotionApi.md#getemotionbypostemotiongetemotionbypostpost) | **POST** /emotion/get_emotion_by_post | Get Emotion By Post |



## getEmotionByMessageEmotionGetEmotionByMessagePost

> string getEmotionByMessageEmotionGetEmotionByMessagePost(messageId)

Get Emotion By Message

### Example

```ts
import {
  Configuration,
  EmotionApi,
} from '';
import type { GetEmotionByMessageEmotionGetEmotionByMessagePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EmotionApi();

  const body = {
    // number
    messageId: 56,
  } satisfies GetEmotionByMessageEmotionGetEmotionByMessagePostRequest;

  try {
    const data = await api.getEmotionByMessageEmotionGetEmotionByMessagePost(body);
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

**string**

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


## getEmotionByPostEmotionGetEmotionByPostPost

> string getEmotionByPostEmotionGetEmotionByPostPost(postId)

Get Emotion By Post

### Example

```ts
import {
  Configuration,
  EmotionApi,
} from '';
import type { GetEmotionByPostEmotionGetEmotionByPostPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EmotionApi();

  const body = {
    // number
    postId: 56,
  } satisfies GetEmotionByPostEmotionGetEmotionByPostPostRequest;

  try {
    const data = await api.getEmotionByPostEmotionGetEmotionByPostPost(body);
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

**string**

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

