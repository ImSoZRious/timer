import { Accessor, createSignal } from "solid-js"
import "./roomcode.css"
import { ConnectingState, RoomCodeState, State } from "../state"

export default function({ appState, setAppState }: { appState: Accessor<RoomCodeState>, setAppState: (newState: State) => void }) {
    const [roomCode, setRoomCode] = createSignal("")

    return <div class="container">
        <div class="header">
            <h1 class="header-text">
                enter room code
            </h1>
        </div>
        <div class="body">
            <input type="text" name="room_code" spellcheck={false} class="roomcode-text-input" onInput={(e) => {setRoomCode(e.target.value);}} />
        </div>
        <div class="footer">
            <button class="roomcode-btn" onClick={() => { setAppState({
                type: 'connecting',
                data: {
                    addr: "127.0.0.1:6969",
                    roomCode: roomCode(),
                }
            })}}>
                let's go!
            </button>
        </div>
    </div>
}
