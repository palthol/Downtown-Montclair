import { useEffect } from "react";


import { supabase } from "~/supabase/supabaseClient";


export default function TestProfiles() {
  useEffect(() => {
    async function fetchProfiles() {
      const { data, error } = await supabase.from("profiles").select();
      if (error) {
        console.error("Error fetching profiles:", error);
      } else {
        console.log("Profiles:", data);
      }
    }
    fetchProfiles();
  }, []);

}