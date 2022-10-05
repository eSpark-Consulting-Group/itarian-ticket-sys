import { api } from '../api'
import {getAllUsers} from '../screens/Agenda/utils/functions'
import {getAllCompanies} from '../screens/Companies/utils/functions'
import { globalState } from '../stores/globalAppState'
import { userStore } from '../stores/userStore'

export const badgeApiCallForGlobalList = () => {
    getAllUsers()
    getAllCompanies()
    getTicketStatus()
    getTicketPriorities()
}

const getTicketStatus = async () => {
    const user: any = userStore.get()?.user
    const USER_TOKEN = user?.token
    console.log(`Basic ${USER_TOKEN}`)
    api.setHeaders({
    'Authorization': `Basic ${USER_TOKEN}` ,
    })
   try {
    const result: any = await api.get('/ticketstatuses')
    if(result?.ok) {
        const data = result?.data?.data?.map((val: any) => {
            return {
                id: val?.id,
                ...val?.attributes
            }
        })
        globalState?.ticketStatus?.set(data)
    }
   } catch (error) {
    console.log("error getAllUsers", error);
   }
}

const getTicketPriorities = async () => {
    const user: any = userStore.get()?.user
    const USER_TOKEN = user?.token
    console.log(`Basic ${USER_TOKEN}`)
    api.setHeaders({
    'Authorization': `Basic ${USER_TOKEN}` ,
    })
   try {
    const result: any = await api.get('/ticketpriorities')
    if(result?.ok) {
        const data = result?.data?.data?.map((val: any) => {
            return {
                id: val?.id,
                ...val?.attributes
            }
        })
        globalState?.ticketPriorities?.set(data)
    }
   } catch (error) {
    console.log("error getAllUsers", error);
   }
}