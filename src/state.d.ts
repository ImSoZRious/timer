export interface RoomCodeState {
    type: 'roomcode'
    data: {}
}

export interface ConnectingState {
    type: 'connecting'
    data: {
        addr: string
        roomCode: string
    }
}

export interface CountdownState {
    type: 'countdown'
    data: {
        socket: WebSocket
    }
}

export type State = ConnectingState | RoomCodeState | CountdownState
