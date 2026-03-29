# HarassmentCheckApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**harassmentCheckHarassmentAnycheckPost**](HarassmentCheckApi.md#harassmentcheckharassmentanycheckpost) | **POST** /harassment/anycheck | Harassment Check |



## harassmentCheckHarassmentAnycheckPost

> string harassmentCheckHarassmentAnycheckPost(postId)

Harassment Check

### Example

```ts
import {
  Configuration,
  HarassmentCheckApi,
} from '';
import type { HarassmentCheckHarassmentAnycheckPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HarassmentCheckApi();

  const body = {
    // number
    postId: 56,
  } satisfies HarassmentCheckHarassmentAnycheckPostRequest;

  try {
    const data = await api.harassmentCheckHarassmentAnycheckPost(body);
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

