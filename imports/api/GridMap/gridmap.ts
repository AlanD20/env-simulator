import { Mongo } from 'meteor/mongo';
import { Types as _t } from '/imports/ui/Types';

export const GridMapCollection = new Mongo.Collection<_t.GridMap>('gridmap');
