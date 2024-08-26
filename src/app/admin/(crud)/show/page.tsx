"use client"
import { CreateShowtime} from "@/components/templates/CreateShowtime";
import { withAuth } from "@/components/useauth";
import { RecoilRoot } from "recoil";
 function movie(){
return(
    <RecoilRoot>
    <CreateShowtime>

    </CreateShowtime>
    </RecoilRoot>
)
}
export default withAuth(movie,"Admin");