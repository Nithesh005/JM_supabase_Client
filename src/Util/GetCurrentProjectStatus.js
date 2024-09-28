import { supabase } from "./Supabase";

export const getCountries = async () =>{
    console.log("Function call");
    try {
        const { data, error } = await supabase.from('jm_project_sts').select('*');
        console.log("Data:", data);
        if (error) {
            console.error("Error fetching data:", error);
        } else {
            console.log("Fetched data:", data);
        }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
}
