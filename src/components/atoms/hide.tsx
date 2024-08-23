"use client"
import { useRecoilValue } from "recoil";
import { authstate } from "./atomauth";
const Navbar=()=>{
    const auth=useRecoilValue(authstate);
    return(
        <nav>
            {!auth.isAuthinticated&&<button>Sign up</button>
            }
            {auth.isAuthinticated&&<button>Logout</button>}
        </nav>
    )
}