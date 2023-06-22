import { Accessor, createSignal } from 'solid-js'
import './loading.css'
import { ConnectingState, State } from '../state'

const wsEndpoint = import.meta.env.VITE_WS_ENDPOINT || 'ws://localhost:3000/ws'

export default function ({
    appState,
    setAppState,
}: {
    appState: Accessor<ConnectingState>
    setAppState: (newState: State) => void
}) {
    const [dotCount, setDotCount] = createSignal(0)
    const loadingText = () => innerText() + '.'.repeat(dotCount())
    const [innerText, setInnerText] = createSignal('Connecting')

    function generateRandomId() {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
        let randomString = ''

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            randomString += characters[randomIndex]
        }

        return randomString
    }

    const ws = new WebSocket(wsEndpoint)
    ws.onopen = () => {
        setInnerText('Handshaking')
        setDotCount(0)
        ws.send(
            JSON.stringify({
                room_id: appState().data.roomCode,
                user_id: generateRandomId(),
            })
        )
        setAppState({
            type: 'countdown',
            data: {
                socket: ws,
            },
        })
        clearInterval(cancel)
    }
    ws.onclose = () => {
        console.log('close')
    }
    ws.onerror = (e) => {
        console.log(e)
    }
    ws.onmessage = (msg) => {
        console.log(msg)
    }

    const cancel = setInterval(() => {
        setDotCount(dotCount() + 1)
    }, 750)

    return (
        <div>
            <h1>{loadingText()}</h1>
        </div>
    )
}
