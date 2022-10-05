import {showMessage} from 'react-native-flash-message';

import {api} from '../../../api';
import {userStore} from '../../../stores/userStore';

const getAllUsers = async () => {
    const user: any = userStore.get()?.user
    const USER_TOKEN = user?.token
    console.log(`Basic ${USER_TOKEN}`)
    api.setHeaders({
    'Authorization': `Basic ${USER_TOKEN}` ,
    })
   try {
    const result: any = await api.get('/users')
    if(result?.ok) {
        const data = result?.data?.data?.map((val: any) => {
            return {
                id: val?.id,
                email: val?.attributes?.email,
                company_name: val?.attributes?.company,
                name: val?.attributes?.user_name
            }
        })
        userStore?.users?.set(data)
    }
   } catch (error) {
    console.log("error getAllUsers", error);
   }
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
        // const data = result?.data?.data?.map((val: any) => {
        //     return {
        //         id: val?.id,
        //         email: val?.attributes?.email,
        //         company_name: val?.attributes?.company,
        //         name: val?.attributes?.user_name
        //     }
        // })
        userStore?.users?.set(result?.data?.data)
    }
   } catch (error) {
    console.log("error getAllUsers", error);
   }
}


export {getAllUsers, getTicketStatus}