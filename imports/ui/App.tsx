import { Meteor } from 'meteor/meteor';
import React, { createContext, useEffect, useRef } from 'react';
import Body from './components/Body';
import Header from './components/Header';
import {Types as _t} from './Types';
import {Pollution as _p} from '../api/Pollution';
import useFetchCol from './hooks/useFetchCol';
import '../api/GridMapMethods';
import '../api/GridMap';

type AppProps = {};

export const GlobalDataContext = createContext<_t.GlobalDataType | null>(null);

export default function App({}: AppProps) {
  
  const isReady = useRef<boolean>(false);
  const isFinalRow = useRef<boolean>(false);
  const _glob: _t.GlobalDataType = useFetchCol(isReady, isFinalRow);
  const time = useRef<number>(_glob.T_emit.get * 1000);
  const timerId = useRef<number | undefined>(undefined);


  const handleOnValueChange = (id: string, obj: object)=> {
    if(isFinalRow.current) {
      console.log("Timer Destroyed");
      // clearInterval(timerId.current);
      Meteor.call('map.onValueChange', id, obj);
    }
  }
  const handleResetMap = ()=>{
    console.log("Map Regenerated!!!");
    isFinalRow.current = false;
    window.clearInterval(timerId.current);
    _glob.P_emit.set(_t.DEFAULT_P_EMIT);
    _glob.T_emit.set(_t.DEFAULT_T_EMIT);
    _glob.P_forest.set(_t.DEFAULT_P_FOREST);
    Meteor.call('map.generate');
  };

  _glob.handleResetMap = handleResetMap;

  //* Pollution Emitter...
  const envTimer = ()=>{
    if(isReady.current && isFinalRow.current){
      console.log("Timer successfully mounted!");
      
      window.clearInterval(timerId.current);
      timerId.current = window.setInterval(()=>{
        Meteor.call('map.pollution');
      },time.current);
    }
  };

  useEffect(()=>{
    envTimer();
    return ()=>window.clearInterval(timerId.current);
  },[time.current, isFinalRow.current,isReady.current]);


  useEffect(() => {
    if(isReady.current) {
      handleOnValueChange(_glob.grid.get._id as string, {
        P_emit: _glob.P_emit.get,
        P_forest: _glob.P_forest.get
      });
      time.current = _glob.T_emit.get * 1000;
    }
  }, [_glob.P_emit.get,_glob.P_forest.get])

  useEffect(() => {
    if(isReady.current) {
      handleOnValueChange(_glob.grid.get._id as string, {T_emit: _glob.T_emit.get, });
      time.current = _glob.T_emit.get * 1000;
    }
  }, [_glob.T_emit.get])
  
  return (
    <div className='col-center'>
      <GlobalDataContext.Provider value={_glob}>
        <Header />
        <Body />
      </GlobalDataContext.Provider>
    </div>
  )
}