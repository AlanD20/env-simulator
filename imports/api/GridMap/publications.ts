import { Meteor } from "meteor/meteor";
import { GridMapCollection } from "./gridmap";


// A Publication (an event) that can be subscribed to returns data from database
Meteor.publish('map.get', function (userId) {
    const query = GridMapCollection.find({ userId });
    if (query.count() === 0)
        Meteor.call('map.generate', userId);
    return query;
});