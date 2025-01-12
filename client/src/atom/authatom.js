import {atom} from 'recoil';

const authState=atom({
    key:"authScreenAtom",
    default:"signup"
})

export default authState;