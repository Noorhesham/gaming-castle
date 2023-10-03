import * as modal from './modal.js';
import SearchView from './views/SearchView.js';
import pagination from './views/pagination.js';
import Filter from './views/filter.js'
let search=false

const searchResults=async function(e){
    try{
        const query=localStorage.getItem('search')
        if(!query) return;
        else{
        search=true
        const data=await modal.searchGames(query);
        SearchView.searchtitle(query,modal.state.search.count)
        SearchView.render(data)
        pagination.render(modal.state.search)
        localStorage.clear()
        }
    }catch(err){
    console.log(err);
    }
}
const paginationControl=async function(page){
    const data=await modal.searchGames(modal.state.search.query,page,modal.state.search.filters);
    SearchView.render(data)
    pagination.render(modal.state.search)
}
const filterSearch=async function(filters){
    if(!search) return;
    console.log(filters);
    const data=await modal.searchGames(modal.state.search.query,1,filters);
    console.log(data);
    SearchView.searchtitle(modal.state.search.query,modal.state.search.count)
    SearchView.render(data)
    pagination.render(modal.state.search)
}
searchResults()
Filter.addhandler(filterSearch)
pagination.addhandler(paginationControl)

// const getgame=function(){

// }
// document.querySelector('#detail')?.addEventListener('click',getgame)