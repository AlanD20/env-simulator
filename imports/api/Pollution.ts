import { GridMapCollection } from './GridMapCollection';
import { Types as _t } from "../ui/Types";

//
// This file contains all the pollution related functions
//

export namespace Pollution {
    
    
    export function emmit(){

        // get data from database
        const data = GridMapCollection.find({}).fetch()[0];
        data.layout.rows.forEach((singleRow: _t.RowType) => {
            singleRow.row.forEach((tile: _t.TileType) => {
                // return if tile does not needs to emmit pollution
                if (tile.type !== _t.POLLUTION_EMMIT_FROM) return;

                //update pollution value
                tile.pollution += Number(data.P_emit);
            });
        });
        
        // Update data in database
        GridMapCollection.update(
            {"_id": data._id}, 
            { "$set": { ...data } }
        );
    }

    // Check if tiles exceeded pollution limit
    export function check(): void {
        
        const data = GridMapCollection.find({}).fetch()[0];
        data.layout.rows.forEach((singleRow: _t.RowType) => {
            singleRow.row.forEach((tile: _t.TileType) => {
                if (tile.type !== _t.DESTROYS_BY_POLLUTION) 
                    return;
                if (tile.pollution < Number(data.P_forest))
                    return; 
                
                tile.type = _t.DESTROYED_LAND
                data.groundWaterPollution +=1;
            });
        });
        
        GridMapCollection.update(
            {"_id": data._id}, 
            { "$set": { ...data } }
        );
    }

    //! At the bottom of the page contains the database layout.
    // TODO:: Pollution is distributed randomly between adjacent tiles according to the following rules: 
    // 1. Wasteland and City can hold unlimited amount of pollution.
    // 2. Forest can hold P_forest units of pollution. If this limit is exceeded, Forest becomes a Wasteland.

    export function distribute(): void {

        const data = GridMapCollection.find({}).fetch()[0];
        data.layout.rows.forEach((singleRow: _t.RowType) => {
            singleRow.row.forEach((tile: _t.TileType) => {
                if (tile.pollution <= 0) return;
                const amount: number = randomDistributeNumber(tile.pollution);
                tile.pollution -= amount;
                const [rowIdx, tileIdx] = randomAdjacentTile(tile.adj);
                
                //Update pollution value of randomly chosen adjacent tile
                data.layout.rows[rowIdx].row[tileIdx].pollution += amount;
            });
        });
        GridMapCollection.update(
            {"_id": data._id}, 
            { "$set": { ...data } }
        );
    }

    //Get random amount of pollution that needs to be distributed
    function randomDistributeNumber(amount: number): number {
        return Math.floor(Math.random() * 1_000_000_000) % amount;
    }

    // Get random adjacent tile.
    function randomAdjacentTile(adj: any): number[] {
        let finalRow: number = 0;
        let finaltile: number = 0;
        while (true) {
            //Grab random row index
            const rowIdx: number = Math.floor(Math.random() * 10) % Object.keys(adj).length
            //Get key of randomly chosen row from index
            const rowKey = Object.keys(adj)[rowIdx]
            //Check if row is valid
            if (adj[rowKey] === -1 || adj[rowKey].row === -1) continue;

            //Grab random tile index from adj[key]
            const tileIdx = Math.floor(Math.random() * 10) % Object.keys(adj[rowKey]).length
            //Get key of randomly chosen tile from adj[key][tile_index]
            const tileKey = Object.keys(adj[rowKey])[tileIdx]

            if (tileKey === 'row' || adj[rowKey][tileKey] === -1) continue;
            else {
                finalRow = adj[rowKey]?.row;
                finaltile = adj[rowKey][tileKey];
                break;
            }
        }
        return [finalRow, finaltile];
    }
}

    // Random Tile Data
    // layout:
    //     rows: Array(1)
    //         0:
    //             id: "WKfLq2"
    //             row: Array(1)
    //                 0:[
    //                     adj: {
    //                             mid: {...}, 
    //                             top: -1, 
    //                             bottom: {
    //                                 row: 2,
    //                                 left: 1,
    //                                 mid: 2,
    //                                 right: 3
    //                             }
    //                         }
    //                     id: "SmWQJs1"
    //                     pollution: 57
    //                     type: "City"
    //                   ]