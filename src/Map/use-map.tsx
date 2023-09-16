import {useEffect, useRef, useState} from 'react';
import type {IDomEventEmitter, Map} from 'yandex-maps';
import {loadYandex} from './ymap-script-init';
import {IMapEvent, IUseMapInitProps, IUseMapProps} from "./types";


export type TUseMapReturn = ReturnType<typeof useMap>;

function addEvents(instance: IDomEventEmitter, events: IMapEvent[]) {
  for (let i = 0; i < events.length; i++) {
    const { event, callback } = events[i];
    const eventList = Array.isArray(event) ? event : [event];

    for (let j = 0; j < eventList.length; j++) {
      instance.events.add(eventList[j], callback);
    }
  }
}

export const useMapCreator = (props: IUseMapProps) => {
  const { id, zoom = 16, center = [55.755864, 37.617698], events = [], options = {}, state = {} } = props;
  const initStateRef = useRef<boolean>(false);
  const [map, setMap] = useState<Map | undefined>(undefined);

  const initMap = () => {
    initStateRef.current = true;

    loadYandex().then((ymap) => {
      ymap.ready().then(() => {
        const yMap = new window.ymaps.Map(
          id,
          {
            controls: [],
            center: center,
            zoom: zoom,
            ...state
          },
          {
            minZoom: 3,
            suppressMapOpenBlock: true,
            ...options
          }
        );

        addEvents(yMap, events);
        setMap(yMap);
      });
    });
  };

  const destroyMap = () => {
    map?.destroy();
    setMap(undefined);
    initStateRef.current = false;
  };

  return { initMap, destroyMap, initStateRef, map };
};

export const useMap = (props: IUseMapProps) => {
  const { initMap, map, destroyMap, initStateRef } = useMapCreator(props);

  useEffect(() => {
    if (!initStateRef.current) {
      initMap();
    }

    return () => {
      destroyMap();
    };
  }, []);

  return map;
};

export const useMapInit = (props: IUseMapInitProps) => {
  const { map, ...rest } = props;

  return { map };
};
