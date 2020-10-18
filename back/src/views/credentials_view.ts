import Image from "../models/Image";
import Credentials from "../models/Credentials";


export default {
    render(credentials: Credentials){
        return {
            username: credentials.username,
        }
    },

}