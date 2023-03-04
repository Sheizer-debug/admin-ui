import React from 'react';
import {useEffect,useState,useRef} from 'react';
import Header from './Header.js'
import axios from 'axios';
import UsersTable from './UsersTable';
import ipConfig from "./ipConfig.json";
import Footer from './Footer.js'
export default function Landing() {
const [users,setUsers]=useState([]);//state to save list of users
const [search,setSearch]=useState("");//state to save search bar text
const [currentPage,setCurrentPage]=useState(1);//this state holds the current page number
const usersPerPage=10;//contains the number of users to display per page
const [currentPageData,setCurrentPageData]=useState([]);//used to hold user data of current page
const [selectAll,setSelectAll] = useState(false);//state to check if the global or "All" checkbox is selected
const [selected,setSelected]=useState([]);//state to hold user rows selected
const allUsers=useRef([]);//contains an immutable reference to all users to be used to reset all users on clearing search field
const isInitialMount = useRef(true);//to prevent useEffect from running on update on initial mount
async function fetchData(){//function to fetch user data from backend
  const url=`${ipConfig.backendIP}`;
  try{
      const response = await axios.get(url);
      //console.log('API Reponse',response);
      setUsers(response.data);
      allUsers.current=response.data;
      let firstIndex= (currentPage-1)*usersPerPage;//first user index of current page
      let lastIndex=firstIndex+usersPerPage;//last user index of current page
      setCurrentPageData(response.data.slice(firstIndex,lastIndex));
    }
    catch (e) {
        console.log(e.response.data.message);
      }
}
useEffect(()=>{//called on component mount
console.log('On Mount');
fetchData();
},[]);
useEffect(()=>{//called on component mount
  if(isInitialMount.current)
    isInitialMount.current=false;
  else
  {
    console.log('On Update');
    let firstIndex= (currentPage-1)*usersPerPage;//first user index of current page
    let lastIndex=firstIndex+usersPerPage;//last user index of current page
    /*in case we are on a page which becomes empty on filtering based on a search query we move the current page one page back
    and keep doing it until we reach a filled page*/
    if(users.slice(firstIndex,lastIndex).length===0)//if current page is empty we revert back to page 1
      {
        setCurrentPage((prevState)=>1);
        let firstIndex= (currentPage-1)*usersPerPage;//first user index of current page
        let lastIndex=firstIndex+usersPerPage;//last user index of current page        
      }
    setCurrentPageData(users.slice(firstIndex,lastIndex));
  }
},[currentPage,users]);
function onSelectAll()
{
  setSelectAll(!selectAll);//flip the state of the Select All checkbox
  setSelected(currentPageData.map((row)=>row.id));
  /*if selectAll is false which mean checkbox is unchecked then deselect all checks*/
  if (selectAll) {//as state updates are batched we will still get the non updated state value here
    setSelected([]);
  }
}
function changeSelection(id)//manages selection or deselection of a row
{
  if(selected.includes(id))//if row is already selected when checkbox is clicked then deselect it
  {
    setSelected(selected.filter((selection_id)=>selection_id!=id));
  }
  else//else select it and add it to selected state array
  {
    setSelected((prevState)=>{
      return [...prevState,id];
    });
  }
}
function deleteSelected()//delete based on selected rows
{
  let newUsers=users.filter((user)=>!selected.includes(user.id));
  setUsers(newUsers); 
  if(selectAll)
    setSelectAll(!selectAll);//flip the state of the Select All checkbox
  setSelected([]);//on deletion using the 'Delete Selected' button remove all selected rows from selected state array
}
function deleteUser(id)//delete user using delete icon
{
  let newUsers=users.filter((user)=>user.id!=id);
  setUsers(newUsers);   
}
function filterSearch(e)//function to filter users based on search query
{ 
  setSearch(e.target.value);
  let searchTerm=e.target.value.toLowerCase();
  console.log(searchTerm);
  if(searchTerm==='')//if the search bar is empty we display all the users
  {
    setUsers(allUsers.current);  
  }
  else if(['admin','member'].includes(searchTerm))//if either of admin or member is there we filter acoording to role
  {
    let newUsers=allUsers.current.filter((user)=>user.role===searchTerm);
    setUsers(newUsers);    
  }
  else if(searchTerm.includes("@"))//if @ is there we filter according to email
  {
    let newUsers=allUsers.current.filter((user)=>user.email.includes(searchTerm));
    setUsers(newUsers);    
  }
  else//in all other cases we filter according to name
  {
    let newUsers=allUsers.current.filter((user)=>user.name.toLowerCase().includes(searchTerm));
    setUsers(newUsers);    
  }
}
return (
  <>
      <Header search={search} filterSearch={filterSearch}/>
      <UsersTable users={users} currentPageData={currentPageData} setUsers={setUsers} allUsers={allUsers} selected={selected} onSelectAll={onSelectAll}
        selectAll={selectAll} changeSelection={changeSelection}deleteUser={deleteUser}/>
      <Footer currentPage={currentPage} totalCount={users.length} usersPerPage={usersPerPage} deleteSelected={deleteSelected} setCurrentPage={setCurrentPage}/>
   </>
);
}
