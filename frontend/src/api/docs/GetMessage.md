
# GetMessage


## Properties

Name | Type
------------ | -------------
`id` | number
`content` | string
`roomId` | number
`userId` | number
`userIcon` | string
`createdAt` | Date

## Example

```typescript
import type { GetMessage } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "content": null,
  "roomId": null,
  "userId": null,
  "userIcon": null,
  "createdAt": null,
} satisfies GetMessage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetMessage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


