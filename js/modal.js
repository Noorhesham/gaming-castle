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
    wishlist:[],
}
  const createGameobjects=function(data,screenshots,similar){
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
      stores:game.stores,
        tags:game.tags,
        puplisher:game.publishers,
        rating:game.rating_top,
        ...(similar&&{similargames:similar.results}),
        wishlistd:false,
      };
  }   
  export const getGame=async function(ID){
    try{
        const data= await AJAX(`${APIURL}${games}/${ID}?key=${KEY}`);
        const screenshots= await AJAX(`${APIURL}${games}/${ID}/screenshots?&key=${KEY}`)
        const similar= await AJAX(`${APIURL}${games}/${ID}/game-series?key=${KEY}`)
        return state.game=createGameobjects(data,screenshots,similar)
    }catch(err){throw err}
  }

  export const searchGames=async function(query,page=state.search.page,filters,page_size=20){//=[{filterr:"parent_platforms",option:"2"}]
    state.search.query=query;
    state.search.page=page;
    state.search.filters=filters;
    const data=await AJAX(`${APIURL}${games}?search=${query}&page_size=${page_size}&page=${state.search.page}&${state.search.filters?.map(filter =>`${filter.filterr}=${filter.option}&`).join('')}ordering=-rating&search_exact&key=${KEY}`);
    state.search.count=data.count
    return state.search.results= data.results.map(result=>createGameobjects(result));
  }
  
  export const LoadGenres=async function(){
    const data=await AJAX(`${APIURL}${genres}?key=${KEY}`)
    return data.results
  }
  export const getGameFromgenres=async function(genre='51'){
    const data=await AJAX(`${APIURL}${games}?genres=${genre}&page_size=15&key=${KEY}`);
    return  data.results.map(result=>createGameobjects(result));
  }
  export const loadplatforms=async function(){
    const data=await AJAX(`${APIURL}${platforms}?key=${KEY}`);
    return data.results;

  }
  export const gamebyplatforms=async function(id,page=state.search.page,page_size=20){
    const data=await AJAX(`${APIURL}${games}?platforms=${id}&page_size=40&key=${KEY}`);
    state.search.page=page;
    state.search.count=data.count;
    state.search.resultPerPage=40;
    return data.results.map(result=>createGameobjects(result));
  }
  export const addwishlist=function(game){
   state.wishlist.push(game);
   state.game.wishlisted=true;
  setlocal()
  }
export const deletebookmark=function(id){
  const index=state.wishlist.findIndex(game=>(game.id)===Number(id));
  state.wishlist?.splice(index,1);
  console.log(state.wishlist);
  setlocal()
}
const setlocal = function () {
  window.localStorage.setItem('wishlist', JSON.stringify(state.wishlist));//using window cause it is global
};
  const getlocal = function () {
    const storage = localStorage.getItem('wishlist');
    if (storage) state.wishlist =JSON.parse(storage)
  };
console.log( typeof  JSON.stringify(localStorage.getItem('wishlist')));
  getlocal()
