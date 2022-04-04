import { Meteor } from "meteor/meteor";
import { Types as _t } from '/imports/ui/Types';
import { GridMap as _GridMap } from './Helpers/GridMap';
import { Pollution } from './Helpers/Pollution';
import { GridMapCollection } from './gridmap';

declare global {

    var GLOBAL_TIMER_ID: any;
}

Meteor.methods({

    'map.generate'() {
        console.log("%cMap Generated!", "color: yellow;");
        if (Meteor.isServer) {
            Meteor.clearInterval(global.GLOBAL_TIMER_ID);
            global.GLOBAL_TIMER_ID = null;
        }
        const layout: _t.GridMap = _GridMap.generate();
        GridMapCollection.remove({});
        return GridMapCollection.insert({
            ...layout,
            createdAt: new Date()
        });
    },
    'map.layout.update'(layout: _t.GridMap) {
        console.log("%cMap Layout Updated!", "color: yellow;");
        if (!layout) return;
        return GridMapCollection.update(
            { "_id": layout._id },
            { "$set": { ...layout } }
        );
    },
    'map.onValueChange'(id: string, { P_emit, T_emit, P_forest }: _t.GridMap) {
        console.log("%cOnValueChange Updated!", "color: yellow;");
        return GridMapCollection.update(
            { _id: id }, {
            '$set': {
                P_emit,
                T_emit,
                P_forest
            }
        });
    },
    'map.update.adj'(layout: _t.GridMap) {
        if (layout.isAdjSet) return;
        console.log("%cTile Adjacent Updated!", "color: yellow;");
        return GridMapCollection.update(
            { "_id": layout._id },
            { "$set": { ...layout, isAdjSet: true } }
        );
    },
    'map.pollution'() {

        //* Pollution Emitter..
        console.log("%cPollution Emitting...", "color: red;");
        console.time("Pollution_Emitter");
        Pollution.emmit();
        console.timeEnd("Pollution_Emitter");
        console.log("%cPollution Emitter finished!", "color: yellow;");

        if (global.GLOBAL_TIMER_ID) return;
        if (!Meteor.isServer) return;

        global.GLOBAL_TIMER_ID = Meteor.setInterval(() => {
            //* Pollution Distribution..
            console.log("%cPollution Distribution...", "color: red;");
            console.time("Distribute_Task");
            Pollution.distribute();
            console.timeEnd("Distribute_Task");
            console.log(`%cDistribution finished!`, "color: yellow;");

            //* Pollution Checking..
            console.log("%cPollution Checking...", "color: red;");
            console.time("Pollution_Check_Task");
            Pollution.check();
            console.timeEnd("Pollution_Check_Task");
            console.log(`%cPollution Checking finished!`, "color: yellow;");
        }, _t.DEFAULT_TIMER_RUN);


    },


});
