import * as modal from './modal.js';
import SearchView from './views/SearchView.js';
import pagination from './views/pagination.js';
import Filter from './views/filter.js'
import genreView from './views/genreView.js';
import gamegenresView from './views/gamegenresView.js';
import gamevVew from './views/gamevVew.js';
import Slider from './minislider.js'
import bigslider from './slider.js'
import searchsuggesview, { Searchsuggest } from './views/searchsuggesview.js';
import wishlistview from './views/wishlistview.js';
import plattformsview from './views/plattformsview.js';
let search=false

const searchResults=async function(e){
    try{
        const query=localStorage.getItem('search')
        if(!query) return;
        else{
        search=true
        SearchView.loadSpinner()
        const data=await modal.searchGames(query);
        SearchView.searchtitle(query,modal.state.search.count)
        SearchView.render(data)
        pagination.loadSpinner()
        pagination.render(modal.state.search)
        localStorage.clear()
        }
    }catch(err){
    SearchView.renderError()
    console.log(err);

    }
}
const searchsuggest=async function(query){
    try{
        searchsuggesview.loadSpinner(true);
        const data= await modal.searchGames(query,1,[{ filterr: "parent_platforms", option: "2" }],6)
        console.log(data);
        searchsuggesview.render(data)
        if(data.length===0) searchsuggesview.renderError()
    }catch(err){
        console.error(err);
    }
}
const paginationControl=async function(page){
    const data=await modal.searchGames(modal.state.search.query,page,modal.state.search.filters);
    SearchView.render(data)
    pagination.render(modal.state.search)
}
const filterSearch=async function(filters){
    if(!search) return;
    SearchView.loadSpinner()
    const data=await modal.searchGames(modal.state.search.query,1,filters);
    SearchView.searchtitle(modal.state.search.query,modal.state.search.count)
    SearchView.render(data)
    pagination.render(modal.state.search)
}

const getGenre=async function(){
   const genres=await modal.LoadGenres()
   genreView.render(genres)
   const data=await modal.getGameFromgenres()
   gamegenresView.render( data)

}
const filterGenres=async function(genre){
    gamegenresView.loadSpinner()
    const data= await modal.getGameFromgenres(genre);
    gamegenresView.render(data)
}

const setgame=async function(id){
    localStorage.setItem('id',id)
    if(!id) return;
    window.location="gamedetailed.html"
}
const getgame=async function(){
    try{   
    const id=localStorage.getItem('id')
    if(!id) return;
    else{
    gamevVew.loadSpinner()
    const data= await modal.getGame(id)
    gamevVew.render(data);
    const slider=new Slider(document.querySelector('.screenshot-slider'),'',  document.querySelectorAll(".game-btn"))
    slider.render(data.screenshots, false,false,true);
    slider.clickButtons();
    const largeslider= new bigslider(document.querySelector('.slider-screen'),document.querySelector('.pagi-screen'))
    largeslider.render(data.screenshots,true)
    largeslider.clickButtons();
    gamevVew.viewscreen(largeslider)
    // if(!document.URL.includes("gamedetailed.html")) localStorage.clear()
    }}catch(err) {
        gamevVew.renderError()
        console.error(err)
    }
}


const addtowishlist=function(data,id){
    modal.state.game=data;
    localStorage.setItem('id',id)
    let prop=false;
    modal.state.wishlist?.forEach(wish=>{
        if(wish.id===modal.state.game?.id) prop=true;
    })
if(!modal.state.game?.wishlisted &&!prop) modal.addwishlist(modal.state.game)
}
const loadwishlist=function(){
    wishlistview.render(modal.state.wishlist)
}
const deletebookmark=function(id){
    modal.deletebookmark(id)
}
const getplatforms=async function(){
    try{plattformsview.loadSpinner();
    const data=await modal.loadplatforms();
    plattformsview.render(data);
    const slider=new Slider(document.querySelector('.platforms'),'', document.querySelectorAll(".game-btn"))
    slider.render(data,true);
    slider.clickButtons();}catch(err){console.error(err)}
}
const platformdetails=async function(id){
   try{ 
    SearchView.plat=true
    SearchView.loadSpinner()
    const data=await modal.gamebyplatforms(id)
    console.log(data);
    console.log(modal.state);
    SearchView.render(data)
    pagination.render(modal.state.search)}catch(err){console.error(err)}

}
const init=()=>{
    getGenre()
    searchResults()
    getgame()
    getplatforms()
    searchsuggesview.addhandler(searchsuggest)
    Filter.addhandler(filterSearch)
    pagination.addhandler(paginationControl)
    genreView.addhandler(filterGenres)
    SearchView.addhandler(setgame,addtowishlist)
    gamegenresView.addhandler(setgame,addtowishlist)
    searchsuggesview.addhandler2(setgame)
    wishlistview.addhandler(loadwishlist,deletebookmark,setgame)
    gamevVew.addhandler(setgame,addtowishlist)
    plattformsview.addhandler(platformdetails,addtowishlist)
}
init();
