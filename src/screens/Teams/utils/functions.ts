import { api } from "../../../api"
import { teamStore } from "../../../stores/teamStore"
import { userStore } from "../../../stores/userStore"

const getAllTeams = async () => {
    const user: any = userStore.get()?.user
    const USER_TOKEN = user?.token
    api.setHeaders({
    'Authorization': `Basic ${USER_TOKEN}` ,
    })
   try {
    const result: any = await api.get('/teams')
    if(result?.ok) {
        teamStore?.teams?.set(result?.data?.data)
    }
   } catch (error) {
    console.log("error getAllUsers", error);
   }
}

export {getAllTeams}