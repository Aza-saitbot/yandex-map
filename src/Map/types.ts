import type { EventMap, IEvent,IMapOptions, IMapState } from 'yandex-maps';
import {TUseMapReturn} from "./use-map";
type TEventMap = 'actionbegin' | 'actionbreak' | 'actionend' | 'actiontick' | 'actiontickcomplete' | keyof EventMap;
export interface ILocation {
    center: number[];
    zoom: number;
}
export interface IMapEvent {
    event: TEventMap | TEventMap[];
    callback: (event: IEvent<EventMap[keyof EventMap]>) => void;
}

export interface IUseMapProps extends Partial<ILocation> {
    id: string;
    events?: IMapEvent[];
    options?: IMapOptions;
    state?: Omit<IMapState, 'zoom' | 'center'>;
}
export interface IUseMapInitProps extends Omit<IUseMapProps, 'id'> {
    id: string;
    map: TUseMapReturn;
}
export interface IMapProps extends IUseMapInitProps {
    className?: string;
}