import './App.css'
import {useMap} from "./Map/use-map";
import Map from "./Map/Map";

function App() {
    const id = 'map';
    const map = useMap({id});

    return (
        <Map map={map} id={id} options={{autoFitToViewport: 'always'}} className='map'>
<div>2</div>
        </Map>
    )
}

export default App
