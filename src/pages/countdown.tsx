import { Accessor, Show, createSignal } from 'solid-js'
import './countdown.css'
import { CountdownState, State } from '../state'
import { EventKey, Event, FinalTimeChangeEvent, ResumeEvent } from '~/event'
import AdminPanel from '~/components/adminpanel'

export default function ({
    appState,
}: {
    appState: Accessor<CountdownState>
    setAppState: (newState: State) => void
}) {
    const [timeRemaining, setTimeRemaining] = createSignal('0')

    const [idle, setIdle] = createSignal(false)
    const [isCounting, setIsCounting] = createSignal(false)
    const [isPaused, setIsPaused] = createSignal(false)

    let finalTime = 0
    let cancel: any
    let [isAdmin, setIsAdmin] = createSignal(false)
    let idleTimeout: any

    appState().data.socket.onmessage = (rawEvent) => {
        const event = JSON.parse(rawEvent.data) as Event
        let eventHandler = handler.get(event.type)
        if (eventHandler) {
            eventHandler(event)
        }
    }

    const handler: Map<EventKey, (payload: any) => void> = new Map()

    handler.set('final_time_change', (payload: FinalTimeChangeEvent) => {
        if (cancel) {
            clearInterval(cancel)
            cancel = null
        }

        setIsCounting(true)
        setIsPaused(false)
        finalTime = payload.data.new_final_time
        updateTime()

        cancel = setInterval(() => {
            updateTime()
        }, 1000 / 60)
    })

    handler.set('admin_notice', () => {
        setIsAdmin(true)
    })

    handler.set('pause', () => {
        if (cancel) {
            clearInterval(cancel)
        }
        setIsCounting(false)
        setIsPaused(true)
    })

    handler.set('resume', (payload: ResumeEvent) => {
        if (cancel) {
            clearInterval(cancel)
            cancel = null
        }

        // receiver will receive for sure
        finalTime = payload.data.new_final_time as number
        setIsCounting(true)
        setIsPaused(false)
        updateTime()

        cancel = setInterval(() => {
            updateTime()
        }, 1000 / 60)
    })

    handler.set('reset', () => {
        if (cancel) {
            clearInterval(cancel)
            cancel = null
        }

        finalTime = 0
        setIsCounting(false)
        setIsPaused(false)
        setTimeRemaining('0')
    })

    const updateTime = () => {
        const now = Date.now()
        if (finalTime <= now) {
            setTimeRemaining('0')
            setIsCounting(false)
            if (cancel) {
                clearInterval(cancel)
            }
            return
        }

        const totalMs = finalTime - now

        let hour = Math.floor(totalMs / 3_600_000)
        let minute = Math.floor((totalMs % 3_600_000) / 60_000)
        let second = Math.floor((totalMs % 60_000) / 1_000)
        let ms = totalMs % 1000

        let newTime = ''
        if (hour == 0 && minute == 0 && second < 10) {
            newTime = `${second}.${ms.toString().padStart(0, '0')}`
        } else {
            let omit = true
            let displays = [hour, minute, second]
            for (let i = 0; i < displays.length; i++) {
                const value = displays[i]
                if (omit && value == 0) {
                    continue
                }

                if (omit) {
                    omit = false
                    newTime += `${value.toString()}`
                } else {
                    newTime += `:${value.toString().padStart(2, '0')}`
                }
            }
        }

        setTimeRemaining(newTime)
    }

    const active = () => {
        setIdle(false)

        if (idleTimeout) {
            clearTimeout(idleTimeout)
        }
        idleTimeout = setTimeout(() => {
            setIdle(true)
        }, 2000)
    }

    return (
        <div
            class="container unselectable"
            onMouseMove={() => {
                active()
            }}
        >
            <h1 class="text">{timeRemaining()}</h1>
            <Show when={isAdmin()}>
                <div class={idle() ? 'admin-panel-idle' : 'admin-panel-active'}>
                    <AdminPanel
                        ws={appState().data.socket}
                        isCounting={isCounting}
                        isPaused={isPaused}
                    />
                </div>
            </Show>
        </div>
    )
}
