import {atom} from 'recoil';

const userState=atom({
    key:"useratom",
    default:JSON.parse(localStorage.getItem("user-threads"))
})

export default userState;