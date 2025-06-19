import { writable } from "svelte/store";

export const APP_STATUS = {
    INIT: 0,
    LOADING: 1,
    CHAT_MODE: 2,
    ERROR: -1
}

export const appStatus = writable(APP_STATUS.INIT);
export const appStatusInfo = writable({
    uuid: '452378f4-dbed-4d00-a091-a49fce527549', 
    originalName: 'Shell-Linux-Programacion', 
    totalPages: 1,
    self: "http://localhost:8080/pdf/452378f4-dbed-4d00-a091-a49fce527549"
})

// Dependiendo del estado se mostrara un componente u otro

export const setAppStatusLoading = () => {
    appStatus.set(APP_STATUS.LOADING)
};

export const setAppStatusError = () => {
    appStatus.set(APP_STATUS.ERROR)
};

export const setAppStatusChatMode = ({uuid, originalName, totalPages, self}: {uuid: string, originalName: string, totalPages: number, self: string}) => {
    appStatus.set(APP_STATUS.CHAT_MODE)
    // Set Global info from PDF
    appStatusInfo.set({uuid, originalName, totalPages, self})
};