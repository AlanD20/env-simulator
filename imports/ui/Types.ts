//
// This File contains all the global types and default values.
//
export namespace Types {

    //
    // Types
    //

    //adjacent type for single tile
    export type Adjacent = {
        mid: {
            row: number,
            left: number,
            right: number
        },
        top: {
            row: number,
            left: number,
            mid: number,
            right: number,
        } | 0
        bottom: {
            row: number,
            left: number,
            mid: number,
            right: number,
        } | 0
    } | null

    // Each tile must follow TileType
    export type TileType = {
        id: string,
        type: string,
        pollution: number,
        adj: Adjacent
    }

    // Each row must follow RowType
    export type RowType = {
        id: string,
        row: TileType[],
    }

    // The inserted data to database must follow GridMap type
    export type GridMap = {
        _id?: string;
        layout: { rows: RowType[] };
        x: number;
        y: number;
        P_emit: number;
        T_emit: number;
        P_forest: number;
        groundWaterPollution: number;
        isDefault: boolean;
        isAdjSet: boolean;
        createdAt: Date;
    }

    // All the data that is provided by App component must follow GlobalDataType

    export type handleState = {
        set: React.Dispatch<React.SetStateAction<number>>;
        get: number;
    }

    export interface GlobalDataType {
        isLoading: boolean;
        grid: {
            set: React.Dispatch<React.SetStateAction<GridMap>>;
            get: GridMap;
        };
        isFinalRow: React.MutableRefObject<boolean>;
        isReady: React.MutableRefObject<boolean>;
        P_emit: handleState;
        T_emit: handleState;
        P_forest: handleState;
        handleResetMap?: React.MouseEventHandler<HTMLButtonElement>;
    }


    //
    // Default Properties
    //

    // Default max number of rows & columns
    export const DEFAULT_MAX_ROW_COL: number = 20;
    // Default min number of rows & columns (given value will not be included)
    export const DEFAULT_MIN_ROW_COL: number = 2;

    // Default timer for emitting
    export const DEFAULT_T_EMIT: number = 12;

    // Default emitting amount
    export const DEFAULT_P_EMIT: number = 15;

    // defaul amount that a forest can hold pollution
    export const DEFAULT_P_FOREST: number = 75;

    // Max value for T_EMIT
    export const MAX_T_EMIT: number = 3600;
    // Min value for T_EMIT
    export const MIN_T_EMIT: number = 0;


    // Max value for P_EMIT
    export const MAX_P_EMIT: number = 500;
    // Min value for P_EMIT
    export const MIN_P_EMIT: number = 0;


    // Max value for P_FOREST
    export const MIN_P_FOREST: number = 0;
    // Min value for P_FOREST
    export const MAX_P_FOREST: number = 500;

    // Tile images & types
    export const tiles: object = {
        "forest": "/forest.jpg",
        "wasteland": "/wasteland.jpg",
        "city": "/city.jpg"
    };

    // Default values for inserted data into database
    export const DEFAULT_LAYOUT: GridMap = {
        layout: { rows: [] },
        x: 0,
        y: 0,
        isDefault: true,
        isAdjSet: false,
        groundWaterPollution: 0,
        P_emit: DEFAULT_P_EMIT,
        T_emit: DEFAULT_T_EMIT,
        P_forest: DEFAULT_P_FOREST,
        createdAt: new Date()
    }

    //
    // Pollution related default values.
    //

    export const DEFAULT_TIMER_RUN: number = 1000;
    export const POLLUTION_EMMIT_FROM: string = 'city';
    export const DESTROYS_BY_POLLUTION: string = 'forest';
    export const DESTROYED_LAND: string = 'wasteland';

}