import { writable } from "svelte/store";

export const APP_STATUS = {
    INIT: 0,
    LOADING: 1,
    CHAT_MODE: 2,
    ERROR: -1
}

export const appStatus = writable(APP_STATUS.CHAT_MODE)
export const appStatusInfo = writable({
    uuid: 'f7854c9b-5835-4f10-94a4-e2860247b602', 
    origName: 'How to Escape Special Characters in a String in JavaScript', 
    numPages: 33
})

// Dependiendo del estado se mostrara un componente u otro

export const setAppStatusLoading = () => {
    appStatus.set(APP_STATUS.LOADING)
};

export const setAppStatusError = () => {
    appStatus.set(APP_STATUS.ERROR)
};

export const setAppStatusChatMode = (
    {uuid, origName, numPages}:
    {uuid: string, origName: string, numPages: number}) => {
    appStatus.set(APP_STATUS.CHAT_MODE)
    // Set Global info from PDF
    appStatusInfo.set({uuid, origName, numPages})
};