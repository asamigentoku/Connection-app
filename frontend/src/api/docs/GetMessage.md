
# GetMessage


## Properties

Name | Type
------------ | -------------
`content` | string
`createdAt` | Date
`id` | number
`roomId` | number
`userIcon` | string
`userId` | number

## Example

```typescript
import type { GetMessage } from ''

// TODO: Update the object below with actual values
const example = {
  "content": null,
  "createdAt": null,
  "id": null,
  "roomId": null,
  "userIcon": null,
  "userId": null,
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


