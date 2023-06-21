import { createSignal } from "solid-js"
import "~/components/adminpanel.css"

export default function({ ws }: {ws: WebSocket}) {

    const [second, setSecond] = createSignal(0)
    const [minute, setMinute] = createSignal(0)
    const [hour, setHour] = createSignal(0)

    const getFinalTimestamp = () => {
        return Math.floor(Date.now() / 1000) + hour() * 3600 + minute() * 60 + second()
    }

    const sendNewFinalTime = () => {
        ws.send(JSON.stringify({
            type: 'final_time_change',
            data: {
                new_final_time: getFinalTimestamp(),
            },
        }))
    }

    return <div class="container">
        <button class="admin-btn container-element">pause</button>
        <div class="time-input-container container-element">
            <input type="number" class="time-input-element" placeholder="00" onInput={(e) => setHour(parseInt(e.target.value))}/>
            <input type="number" class="time-input-element" placeholder="00" onInput={(e) => setMinute(parseInt(e.target.value))}/>
            <input type="number" class="time-input-element" placeholder="00" onInput={(e) => setSecond(parseInt(e.target.value))}/>
            <button class="admin-btn time-input-element" title="update final time" onClick={sendNewFinalTime}>set</button>
        </div>
    </div>
}