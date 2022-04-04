import React, { useContext } from 'react'
import { GlobalDataContext } from '../App';
import {Types as _t} from '../Types';
import InputCard from '../components/InputCard';

type HeaderProps = {}

export default function Header({}: HeaderProps) {

  const _glob = useContext(GlobalDataContext);
  
  const handleP_emit = (e:any)=>{
    const val: number = Number(e.target.value);
    if( _t.MIN_P_EMIT < val && val < _t.MAX_P_EMIT) _glob?.P_emit.set(val);
    else _glob?.P_emit.set(_t.MAX_P_EMIT);
  }
  const handleT_emit = (e:any)=>{
    const val: number = Number(e.target.value);
    if( _t.MIN_T_EMIT < val && val < _t.MAX_T_EMIT) _glob?.T_emit.set(val);
    else _glob?.T_emit.set(_t.MAX_T_EMIT);
  }
  const handleP_forest = (e:any)=>{
    const val: number = Number(e.target.value);
    if(_t.MIN_P_FOREST < val && val < _t.MAX_P_FOREST) _glob?.P_forest.set(val);
    else _glob?.P_forest.set(_t.MAX_P_FOREST);
  }
  
  return (
    <div className="header-container">
      <div className="header-container__left ">
        <InputCard 
          id={"p_emit"} 
          text={"Pollution Emit:"}
          handle={handleP_emit}
          value={_glob?.P_emit.get} 
        />
        <InputCard 
          id={"t_emit"} 
          text={"Pollution Emit in Seconds:"}
          handle={handleT_emit}
          value={_glob?.T_emit.get} 
        />
        <InputCard 
          id={"p_forest"} 
          text={"Limited Pollution in Forest:"}
          handle={handleP_forest}
          value={_glob?.P_forest.get} 
        />
      </div>
      <div className="header-container__right">
        <div className="map-info">
          <span>Groundwater Pollution:{" " +_glob?.grid.get.groundWaterPollution}</span>
          <span>Rows:{" " +_glob?.grid.get.x}</span>
          <span>Columns:{" " +_glob?.grid.get.y}</span>
        </div>
        <button onClick={_glob?.handleResetMap} className="btn">
          Reset Map
        </button>
      </div>
    </div>
  )
}