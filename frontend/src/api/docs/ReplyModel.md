
# ReplyModel


## Properties

Name | Type
------------ | -------------
`replyId` | number
`content` | string
`userName` | string
`userIcon` | string
`createdAt` | Date

## Example

```typescript
import type { ReplyModel } from ''

// TODO: Update the object below with actual values
const example = {
  "replyId": null,
  "content": null,
  "userName": null,
  "userIcon": null,
  "createdAt": null,
} satisfies ReplyModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReplyModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


