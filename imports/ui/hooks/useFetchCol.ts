import { useEffect, useState } from 'react'
import { Types as _t } from '../Types';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { GridMapCollection } from '../../api/GridMap/gridmap';

type Param = React.MutableRefObject<boolean>;

export default function useFetchCol(isReady: Param, isFinalRow: Param): _t.GlobalDataType {
    const [P_emit, setP_emit] = useState<number>(_t.DEFAULT_P_EMIT);
    const [T_emit, setT_emit] = useState<number>(_t.DEFAULT_T_EMIT);
    const [P_forest, setP_forest] = useState<number>(_t.DEFAULT_P_FOREST);
    const [grid, setGrid] = useState<_t.GridMap>({ ..._t.DEFAULT_LAYOUT });
    const isLoading = useSubscribe('map.get')();

    let gridMapCol: _t.GridMap[] = useFind(() => GridMapCollection.find({}));

    useEffect(() => {
        if (!isLoading) {
            setGrid(gridMapCol[0]);
            setP_emit(gridMapCol[0].P_emit);
            setT_emit(gridMapCol[0].T_emit);
            setP_forest(gridMapCol[0].P_forest);
            isReady.current = true;
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) {
            console.log("%c MongoDB Grid Map Changed..", "color:red;");
            setGrid(gridMapCol[0]);
            console.log("%cGrid Map Updated!", "color:yellow;");
        }
    }, [gridMapCol[0]]);

    return {
        grid: { set: setGrid, get: grid },
        P_emit: { set: setP_emit, get: P_emit },
        T_emit: { set: setT_emit, get: T_emit },
        P_forest: { set: setP_forest, get: P_forest },
        isFinalRow,
        isReady,
        isLoading
    };
} 
