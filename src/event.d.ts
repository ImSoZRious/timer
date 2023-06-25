export interface FinalTimeChangeEvent {
    type: 'final_time_change'
    data: {
        new_final_time: number
    }
}

export interface AdminNotice {
    type: 'admin_notice'
    data: {}
}

export interface PauseEvent {
    type: 'pause'
    data: {}
}

export interface ResumeEvent {
    type: 'resume'
    data: {
        new_final_time: number | null
    }
}

export interface ResetEvent {
    type: 'reset'
    data: {}
}

export type Event =
    | FinalTimeChangeEvent
    | AdminNotice
    | PauseEvent
    | ResumeEvent
    | ResetEvent

export type EventKey = Event['type']
