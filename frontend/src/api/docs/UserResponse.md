
# UserResponse


## Properties

Name | Type
------------ | -------------
`userName` | string
`email` | string
`gender` | string
`status` | string
`iconUrl` | string
`userId` | number
`isOnline` | boolean
`isVerified` | boolean

## Example

```typescript
import type { UserResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "userName": null,
  "email": null,
  "gender": null,
  "status": null,
  "iconUrl": null,
  "userId": null,
  "isOnline": null,
  "isVerified": null,
} satisfies UserResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


