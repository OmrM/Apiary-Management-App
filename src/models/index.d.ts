import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class PhotoS3Info {
  readonly key: string;
  readonly width: number;
  readonly height: number;
  constructor(init: ModelInit<PhotoS3Info>);
}

export declare class Album {
  readonly id: string;
  readonly name: string;
  readonly owner: string;
  readonly photos?: (Photo | null)[];
  constructor(init: ModelInit<Album>);
  static copyOf(source: Album, mutator: (draft: MutableModel<Album>) => MutableModel<Album> | void): Album;
}

export declare class Photo {
  readonly id: string;
  readonly album?: Album;
  readonly bucket: string;
  readonly fullsize: PhotoS3Info;
  readonly thumbnail: PhotoS3Info;
  constructor(init: ModelInit<Photo>);
  static copyOf(source: Photo, mutator: (draft: MutableModel<Photo>) => MutableModel<Photo> | void): Photo;
}

export declare class Note {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Note>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}