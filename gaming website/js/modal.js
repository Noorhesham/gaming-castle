  import {KEY,APIURL,games, creators, genres, platforms,publishers}from "../js/config.js"
  import { AJAX } from "./helpers.js"
import filter from "./views/filter.js";

export const state={
    game:{},
    search:{
        query:'',
        page:1,
        resultPerPage:20,
        results:[],
        count:0
    },
    wishlist:[]
}
  const createGameobjects=function(data,screenshots){
    const game=data;
    return {
      title:game.name,
        id: game.id,
        background:game.background_image,
        backgroundsec:game.background_image_additional,
        description:game.description_raw,
      developers:game.developers,
       genres:game.genres,
       plattformP:game.parent_platforms,
       platforms:game.platforms,
       playtime:game.playtime,
       ...(screenshots&&{screenshots:screenshots.results}),
      realese:game.released,
      stores:game.stores
      };
  }   
  export const getGame=async function(ID){
    try{
        const data= await AJAX(`${APIURL}${games}/${ID}?key=${KEY}`);
        const screenshots= await AJAX(`${APIURL}${games}/${ID}/screenshots?key=${KEY}`)
        state.game=createGameobjects(data,screenshots)
    }catch(err){throw err}
  }

  export const searchGames=async function(query,page=state.search.page,filters){//=[{filterr:"parent_platforms",option:"2"}]
    state.search.query=query;
    state.search.page=page;
    state.search.filters=filters;
    const data=await AJAX(`${APIURL}${games}?search=${query}&page_size=20&page=${state.search.page}&${state.search.filters?.map(filter =>`${filter.filterr}=${filter.option}&`).join('')}ordering=-rating&exclude_additions&search_exact&key=${KEY}`);
    state.search.count=data.count
    console.log(data); 
    return state.search.results= data.results.map(result=>createGameobjects(result));
  }
  
  // ${state.search.filters?.map(filter =>`${filter.filterr}=${filter.option}&`).join('')}
