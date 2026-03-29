
# ReplyModel


## Properties

Name | Type
------------ | -------------
`content` | string
`createdAt` | Date
`replyId` | number
`userIcon` | string
`userName` | string

## Example

```typescript
import type { ReplyModel } from ''

// TODO: Update the object below with actual values
const example = {
  "content": null,
  "createdAt": null,
  "replyId": null,
  "userIcon": null,
  "userName": null,
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


