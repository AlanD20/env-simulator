import React, { useContext, useEffect } from 'react'
import SingleTile from './SingleTile';
import { GlobalDataContext } from '../App';
import {Types as _t} from '../Types';
import { Meteor } from 'meteor/meteor';

type RowTileProps = {
    row: _t.TileType[], 
    id: string,
    prev?: any,
    next?: any,
    rowIdx: number,
}

export default function RowTile({row, id, prev, next, rowIdx}: RowTileProps) {
  const _glob = useContext(GlobalDataContext);
  
  useEffect(()=>{

    // Check for rendering final row.
    if(_glob !== null && next === -1) {
      _glob.isFinalRow.current = true;
      // Check if all tiles has their adjacent tile set.
      if(!_glob.grid.get.isAdjSet) {
        Meteor.call("map.update.adj", _glob.grid.get);
        _glob.grid.get.isAdjSet = true;
      } 
    }
  },[])

  return (
    <div className="row" key={id}>
        {
            row.map((tile, idx, arr)=>(
                <SingleTile 
                id={tile.id} 
                key={tile.id} 
                type={tile.type}
                rowIdx={rowIdx}
                tileIdx={idx}
                adjacent={{
                  mid:{
                    row: rowIdx,
                    left: arr[idx-1]?idx-1:-1,
                    right:arr[idx+1]?idx+1:-1,
                  },
                  top: prev ? {
                    row: prev,
                    left: arr[idx-1]?idx-1:-1,
                    mid: idx,
                    right:arr[idx+1]?idx+1:-1,
                  } : -1,
                  bottom: next ? {
                    row: next,
                    left: arr[idx-1]?idx-1:-1,
                    mid: idx,
                    right:arr[idx+1]?idx+1:-1,
                  } : -1,
                }}
                data-pollution={tile.pollution} />
            ))
        }
    </div>
  )
}