import { Types as _t } from "/imports/ui/Types";
import { nanoid } from 'nanoid'; // Generates random id

//
// This file contains all the related functions to generate & display the map
//

export namespace GridMap {

    // Generate random number with given max & min number of rows and columns
    export function randomNumber(): number {
        const rnd: number = Math.floor((Math.random() * 100));
        const result: number = rnd % (_t.DEFAULT_MAX_ROW_COL + 1);
        return result > _t.DEFAULT_MIN_ROW_COL ? result : randomNumber();
    }

    //Get random tile type
    export function randomTileType(): _t.TileType {
        const myTile: _t.TileType = {
            id: '', type: '', pollution: 0, adj: null
        }
        const rnd: number = Math.floor(Math.random() * 10);
        const idx: number = rnd % Object.keys(_t.tiles).length;
        return { ...myTile, type: Object.keys(_t.tiles)[idx] };
    }

    //Grabs the value of given type to display the tile image.
    export function getSrcFromType(type: string): string {
        return _t.tiles[type.toLowerCase() as keyof typeof _t.tiles];
    }

    // Generates a new map
    export function generate(userId: string): _t.GridMap {
        const { layout, x, y, ...others }: _t.GridMap = {
            userId,
            layout: { rows: [] },
            x: randomNumber(),
            y: randomNumber(),
            isDefault: false,
            isAdjSet: false,
            groundWaterPollution: 0,
            P_emit: _t.DEFAULT_P_EMIT,
            T_emit: _t.DEFAULT_T_EMIT,
            P_forest: _t.DEFAULT_P_FOREST,
            createdAt: new Date()
        };
        for (let i = 0; i < x; i++) {
            layout.rows.push({ row: [], id: nanoid(6) });
            for (let j = 0; j < y; j++) {
                const TileType: _t.TileType = randomTileType();
                layout.rows[i].row.push({ ...TileType, id: nanoid(7) });
            }
        }
        return { layout, x, y, ...others };
    }
}