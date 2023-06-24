import { Accessor, createSignal, Show } from 'solid-js'
import '~/components/adminpanel.css'

export default function ({
    ws,
    isCounting,
    isPaused,
}: {
    ws: WebSocket
    isCounting: Accessor<boolean>
    isPaused: Accessor<boolean>
}) {
    const [second, setSecond] = createSignal(0)
    const [minute, setMinute] = createSignal(0)
    const [hour, setHour] = createSignal(0)

    const getFinalTimestamp = () => {
        return (
            Math.floor(Date.now() / 1000) +
            hour() * 3600 +
            minute() * 60 +
            second()
        )
    }

    const sendNewFinalTime = () => {
        ws.send(
            JSON.stringify({
                type: 'final_time_change',
                data: {
                    new_final_time: getFinalTimestamp(),
                },
            })
        )
        setHour(0)
        setMinute(0)
        setSecond(0)
    }

    const pauseTimer = () => {
        ws.send(
            JSON.stringify({
                type: 'pause',
                data: {},
            })
        )
    }

    const resumeTimer = () => {
        ws.send(
            JSON.stringify({
                type: 'resume',
                data: {},
            })
        )
    }

    const parseIntOrZero = (x: string) => {
        const parsed = parseInt(x)
        if (isNaN(parsed)) {
            return 0
        }
        return parsed
    }

    return (
        <div class="container">
            <Show when={isCounting()}>
                <button
                    class="admin-btn container-element"
                    onClick={pauseTimer}
                >
                    pause
                </button>
            </Show>
            <Show when={isPaused()}>
                <button
                    class="admin-btn container-element"
                    onClick={resumeTimer}
                >
                    resume
                </button>
            </Show>
            <div class="time-input-container container-element">
                <input
                    type="number"
                    class="time-input-element"
                    placeholder="00"
                    onInput={(e) => setHour(parseIntOrZero(e.target.value))}
                />
                <input
                    type="number"
                    class="time-input-element"
                    placeholder="00"
                    onInput={(e) => setMinute(parseIntOrZero(e.target.value))}
                />
                <input
                    type="number"
                    class="time-input-element"
                    placeholder="00"
                    onInput={(e) => setSecond(parseIntOrZero(e.target.value))}
                />
                <button
                    class="admin-btn time-input-element"
                    title="update final time"
                    onClick={sendNewFinalTime}
                >
                    set
                </button>
            </div>
        </div>
    )
}
