import axios from "axios"

export default async function ApiData(meth, data) {
    let baseUrl = "http://localhost:8080/"

    switch (meth) {
        case 'post':
            try {
                const reso = await axios.post(baseUrl, data);
                return reso.data;

            }
            catch (err) {
                return "Some error occured";
            }

        default:
            break;
    }

    return "Some Error Occurred"
}