import { createContext, useContext } from 'react';
import type { Map } from 'yandex-maps';

export interface IMapContext {
  map?: Map;
}

export const MapContext = createContext<IMapContext | undefined>(undefined);

export function useMapContext() {
  const context = useContext(MapContext);

  if (!context) {
    throw Error('Нет MapContext.Provider');
  }

  return context;
}
