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
        }, 200)
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
        }, 200)
    })

    const updateTime = () => {
        const now = Math.floor(Date.now() / 1000)
        if (finalTime <= now) {
            setTimeRemaining('0')
            setIsCounting(false)
            if (cancel) {
                clearInterval(cancel)
            }
            return
        }

        const total_second = Math.floor(finalTime - now)

        let hour = Math.floor(total_second / 3600)
        let minute = Math.floor((total_second % 3600) / 60)
        let second = Math.floor(total_second % 60)

        let newTime = ''
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
