/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAlbum = /* GraphQL */ `
  subscription OnCreateAlbum {
    onCreateAlbum {
      id
      name
      owner
      photos {
        items {
          id
          bucket
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAlbum = /* GraphQL */ `
  subscription OnUpdateAlbum {
    onUpdateAlbum {
      id
      name
      owner
      photos {
        items {
          id
          bucket
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAlbum = /* GraphQL */ `
  subscription OnDeleteAlbum {
    onDeleteAlbum {
      id
      name
      owner
      photos {
        items {
          id
          bucket
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto {
    onCreatePhoto {
      id
      album {
        id
        name
        owner
        photos {
          nextToken
        }
        createdAt
        updatedAt
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto {
    onUpdatePhoto {
      id
      album {
        id
        name
        owner
        photos {
          nextToken
        }
        createdAt
        updatedAt
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto {
    onDeletePhoto {
      id
      album {
        id
        name
        owner
        photos {
          nextToken
        }
        createdAt
        updatedAt
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateApiary = /* GraphQL */ `
  subscription OnCreateApiary($owner: String!) {
    onCreateApiary(owner: $owner) {
      id
      name
      description
      location
      image
      hives {
        items {
          id
          ApiaryID
          name
          description
          location
          image
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateApiary = /* GraphQL */ `
  subscription OnUpdateApiary($owner: String!) {
    onUpdateApiary(owner: $owner) {
      id
      name
      description
      location
      image
      hives {
        items {
          id
          ApiaryID
          name
          description
          location
          image
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteApiary = /* GraphQL */ `
  subscription OnDeleteApiary($owner: String!) {
    onDeleteApiary(owner: $owner) {
      id
      name
      description
      location
      image
      hives {
        items {
          id
          ApiaryID
          name
          description
          location
          image
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateHive = /* GraphQL */ `
  subscription OnCreateHive($owner: String!) {
    onCreateHive(owner: $owner) {
      id
      ApiaryID
      name
      description
      location
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateHive = /* GraphQL */ `
  subscription OnUpdateHive($owner: String!) {
    onUpdateHive(owner: $owner) {
      id
      ApiaryID
      name
      description
      location
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteHive = /* GraphQL */ `
  subscription OnDeleteHive($owner: String!) {
    onDeleteHive(owner: $owner) {
      id
      ApiaryID
      name
      description
      location
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
