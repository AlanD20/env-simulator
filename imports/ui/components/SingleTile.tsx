import React, { useContext } from 'react'
import { GlobalDataContext } from '../App';
import {Types as _t} from '../Types';
import {GridMap as _GridMap} from '../../api/GridMap';

type SingleTileProps = {
    id: string,
    type: string,
    'data-pollution': number,
    adjacent: object | undefined,
    rowIdx: number,
    tileIdx: number,
}

export default function SingleTile({id, type, 'data-pollution': pollution, adjacent, rowIdx, tileIdx }: SingleTileProps) {

    const _glob = useContext(GlobalDataContext);
    
    const src = _GridMap.getSrcFromType(type);
    const title: string = ['id: '+ id, 'Type: ' + type, 'Pollution: '+pollution].join('\n');
    
    if(_glob !== null && !_glob.grid.get.isAdjSet){
        _glob.grid.get.layout.rows[rowIdx].row[tileIdx].adj = adjacent as _t.Adjacent;
    }
    return (
        <div 
            className="tile " key={id} 
            data-pollution={pollution}
            title={title}
        >
            <img src={src} alt={type.toLowerCase()} className="tile__img" />
            <div className="tile__info">
                <div className="tile__bg">
                    <span>Pollution:</span>
                    <span>{pollution}</span>
                </div>
            </div>
        </div>
    )
}