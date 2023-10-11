export const AJAX=async function(url){
   try{ const fetchpro=fetch(url);
    const request=await fetchpro;
    const data=await request.json();
    if(!request.ok) throw new Error(`${data.message} ${request.status}}`)
    return data;
}
    catch(error){
        throw error;
    }
}