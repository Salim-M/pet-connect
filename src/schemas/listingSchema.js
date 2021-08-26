import {schema} from 'normalizr';

const image = new schema.Entity('images');

const listing = new schema.Entity('listings', {
    images: [image]
});

export default listing;