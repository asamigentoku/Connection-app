
# RoomBase


## Properties

Name | Type
------------ | -------------
`roomId` | number
`roomName` | string
`roomIcon` | string
`createdAt` | Date
`isGroup` | boolean

## Example

```typescript
import type { RoomBase } from ''

// TODO: Update the object below with actual values
const example = {
  "roomId": null,
  "roomName": null,
  "roomIcon": null,
  "createdAt": null,
  "isGroup": null,
} satisfies RoomBase

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoomBase
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


