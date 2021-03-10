export interface IRawCharacter {
    id: number,
    name: string,
    gender: string,
    species: string,
    origin: {
      name: string,
      [key: string]: any
    },
    location: {
      name: string,
      [key: string]: any
    },
    status: string,
    [key: string]: any
  }