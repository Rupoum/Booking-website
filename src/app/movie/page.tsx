"use client"
import { CreateMovie } from "@/components/templates/CreateMovie";
import { withAuth } from "@/components/useauth";
import { RecoilRoot } from "recoil";
 function movie(){
return(
    <RecoilRoot>
    <CreateMovie>
    </CreateMovie>
    </RecoilRoot>
)
}export default withAuth(movie,"Admin");