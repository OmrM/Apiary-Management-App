// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Album, Photo, Note, PhotoS3Info } = initSchema(schema);

export {
  Album,
  Photo,
  Note,
  PhotoS3Info
};