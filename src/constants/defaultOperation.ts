export const defaultOperation = `query ExampleQuery($dragonId: ID!) {
  dragon(id: $dragonId) {
    id
    name
    description    
    active
    first_flight
    type
  }
}`;

