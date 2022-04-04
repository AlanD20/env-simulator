import React, { useContext} from 'react';
import RowTile from '../components/RowTile';
import { Types as _t } from '../Types';
import { GlobalDataContext } from '../App';

type MapTilesProps = {}

export default function MapTiles({}: MapTilesProps) {
    
    const {isLoading, grid: {get: grid}} = useContext(GlobalDataContext) as _t.GlobalDataType;

    
    return (
        <div className="map-container">
            {(isLoading || grid.isDefault) && <Loader />}
            {
                !isLoading && !grid.isDefault && grid.layout.rows.map((singleRow, idx, arr)=> (
                    <RowTile 
                        row={singleRow.row}
                        prev={arr[idx-1]?idx-1:-1}
                        next={arr[idx+1]?idx+1:-1}
                        rowIdx={idx}
                        id={singleRow.id} 
                        key={singleRow.id} 
                    />
                ))
            }
        </div>
    )
}
function Loader(): JSX.Element{
    return (
        <div className="loader">
            <h1>Map is Loading...</h1>
        </div>
    );
}
