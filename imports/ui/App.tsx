import { Meteor } from 'meteor/meteor';
import React, { createContext, useEffect, useRef } from 'react';
import Body from './pages/Body';
import Header from './pages/Header';
import {Types as _t} from './Types';
import {Pollution as _p} from '/imports/api/GridMap/Helpers/Pollution';
import useFetchCol from './hooks/useFetchCol';
import '/imports/api/GridMap/methods';
import '/imports/api/GridMap/Helpers/GridMap';
import getUserId from './helpers/getUserId';

type AppProps = {};

export const GlobalDataContext = createContext<_t.GlobalDataType | null>(null);

export default function App({}: AppProps) {
  
  // User ID
  const userId: string = getUserId();
  // if true, data retreived successfully
  const isReady = useRef<boolean>(false);
  // if true, Map tiles are ready
  const isFinalRow = useRef<boolean>(false);
  // global context data
  const _glob: _t.GlobalDataType = useFetchCol(userId, isReady, isFinalRow);
  //Holds current timer.
  const time = useRef<number>(_glob.T_emit.get * 1000);
  //Holds current timer id in case of removing.
  const timerId = useRef<number | undefined>(undefined);
  

  //* Handles event on change input value
  const handleOnValueChange = (id: string, obj: object)=> {
    if(isFinalRow.current) {
      console.log("Timer Destroyed");
      // clearInterval(timerId.current);
      Meteor.call('map.onValueChange', id, obj);
    }
  }

  //* Handles map reset button
  const handleResetMap = ()=>{
    console.log("Map Regenerated!!!");
    isFinalRow.current = false;
    window.clearInterval(timerId.current);
    _glob.P_emit.set(_t.DEFAULT_P_EMIT);
    _glob.T_emit.set(_t.DEFAULT_T_EMIT);
    _glob.P_forest.set(_t.DEFAULT_P_FOREST);
    Meteor.call('map.generate', userId);
  };

  //* Passing reset map function to global context
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

  //* When UI is ready, start Pollution emitter.
  useEffect(()=>{
    envTimer();
    return ()=>window.clearInterval(timerId.current);
  },[time.current, isFinalRow.current,isReady.current]);


  //* Handle Event for input field value changes
  useEffect(() => {
    if(isReady.current) {
      handleOnValueChange(_glob.grid.get._id as string, {
        P_emit: _glob.P_emit.get,
        P_forest: _glob.P_forest.get
      });
      time.current = _glob.T_emit.get * 1000;
    }
  }, [_glob.P_emit.get,_glob.P_forest.get])
  
  //* Handle Event for input field value changes
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