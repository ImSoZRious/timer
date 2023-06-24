import { Accessor, Show, createSignal } from 'solid-js'
import './countdown.css'
import { CountdownState, State } from '../state'
import { EventKey, Event, FinalTimeChangeEvent, AdminNotice } from '~/event'
import AdminPanel from '~/components/adminpanel'

export default function ({
    appState,
    setAppState,
}: {
    appState: Accessor<CountdownState>
    setAppState: (newState: State) => void
}) {
    const [timeRemaining, setTimeRemaining] = createSignal('0')

    const [idle, setIdle] = createSignal(false)

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
        console.log(payload)
        if (cancel) {
            clearInterval(cancel)
            cancel = null
        }

        finalTime = payload.data.new_final_time
        updateTime()

        cancel = setInterval(() => {
            updateTime()
        }, 200)
    })

    handler.set('admin_notice', (payload: AdminNotice) => {
        setIsAdmin(true)
    })

    const updateTime = () => {
        const now = Math.floor(Date.now() / 1000)
        if (finalTime <= now) {
            setTimeRemaining('0')
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
            onMouseMove={(e) => {
                active()
            }}
        >
            <h1 class="text">{timeRemaining()}</h1>
            <Show when={isAdmin()}>
                <div class={idle() ? 'admin-panel-idle' : 'admin-panel-active'}>
                    <AdminPanel ws={appState().data.socket} />
                </div>
            </Show>
        </div>
    )
}
