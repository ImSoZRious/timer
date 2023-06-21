import CountDown from "./countdown";
import RoomCode from "./roomcode";
import Loading from "./loading"
import { Accessor, Match, Switch, createSignal } from "solid-js";
import { ConnectingState, CountdownState, RoomCodeState, State } from "../state"

export default function App() {
    let [appState, setAppState] = createSignal({
        type: 'roomcode',
        data: {}
    });

    return <>
        <Switch>
            <Match when={appState().type == 'roomcode'}>
                <RoomCode appState={appState as Accessor<RoomCodeState>} setAppState={setAppState} />
            </Match>
            <Match when={appState().type == 'connecting'}>
                <Loading appState={appState as Accessor<ConnectingState>} setAppState={setAppState} />
            </Match>
            <Match when={appState().type == 'countdown'}>
                <CountDown appState={appState as Accessor<CountdownState>} setAppState={setAppState} />
            </Match>
        </Switch>
    </>
}   