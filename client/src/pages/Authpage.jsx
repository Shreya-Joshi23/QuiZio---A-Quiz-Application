import React from 'react'
import { useRecoilValue } from 'recoil'
import authState from '../atom/authatom'
import Signup from './Signup';
import Signin from './Signin';

const Authpage = () => {

    const auth=useRecoilValue(authState);

  return (
    <>
    {
        auth=="login"?<Signin/>:<Signup/>
    }
    </>
  )
}

export default Authpage
