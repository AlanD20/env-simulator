import { Meteor } from "meteor/meteor";
import { GridMapCollection } from "./gridmap";


// A Publication (an event) that can be subscribed to returns data from database
Meteor.publish('map.get', function () {
    if (GridMapCollection.find().count() === 0)
        Meteor.call('map.generate');
    return GridMapCollection.find();

});