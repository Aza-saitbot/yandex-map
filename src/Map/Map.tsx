import {forwardRef, PropsWithChildren} from 'react';
import {MapContext} from './map-context';
import {useMapInit} from './use-map';
import {IMapProps} from "./types";

const Map = forwardRef<HTMLDivElement, PropsWithChildren<IMapProps>>((props, ref) => {
    const {id, className = '', children, ...rest} = props;
    const context = useMapInit({...rest, id});

    return (
        <MapContext.Provider value={context}>
            <div id={id} ref={ref} className={`relative flex ${className}`}>
                {context.map && children}
            </div>
        </MapContext.Provider>
    );
});

export default Map;
