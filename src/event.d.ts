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

export type Event = FinalTimeChangeEvent | AdminNotice

export type EventKey = Event['type']
