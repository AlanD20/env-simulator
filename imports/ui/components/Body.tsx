import React from 'react';
import MapTiles from './MapTiles';

type BodyProps = {}

export default function Body({}: BodyProps) {
    return (
        <div className="main-container col-center">
            <MapTiles />
        </div>
    )
}