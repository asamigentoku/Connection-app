# FakecheckApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**fakeCheckByPostFakecheckFakeCheckByPostPost**](FakecheckApi.md#fakecheckbypostfakecheckfakecheckbypostpost) | **POST** /fakecheck/fake_check_by_post | Fake Check By Post |



## fakeCheckByPostFakecheckFakeCheckByPostPost

> number fakeCheckByPostFakecheckFakeCheckByPostPost(postId)

Fake Check By Post

### Example

```ts
import {
  Configuration,
  FakecheckApi,
} from '';
import type { FakeCheckByPostFakecheckFakeCheckByPostPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FakecheckApi();

  const body = {
    // number
    postId: 56,
  } satisfies FakeCheckByPostFakecheckFakeCheckByPostPostRequest;

  try {
    const data = await api.fakeCheckByPostFakecheckFakeCheckByPostPost(body);
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

