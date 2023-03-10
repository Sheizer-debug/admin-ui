import React from 'react';
import {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DialogBox from './DialogBox'
import './UsersTable.css'
export default function UsersTable({users,currentPageData,setUsers,allUsers,selected,onSelectAll,selectAll,changeSelection,deleteUser}) {
/*Props: 
users: State containing all users currently shown on the site
currentPageData: State containing all users currently shown on the current page
setUsers: State to update users
allUsers: Ref variable containing a copy of ALL the users on the site unmodified by any search query. We need to update any edits to this 
variable also as the search query filters based on allUsers
selected: state to hold user rows selected
onSelectAll: Function to select or deselect all rows when the All select button at the top is clicked
selectAll: state to check if the global or "All" checkbox is selected
changeSelection: Function to update number of rows selected in a page
deleteUser: Function to delete user on click of delete icon of a row*/
const theme = useTheme();
const [open, setOpen] = React.useState(false);
const [editId,setEditId]=useState(0);//current id being edited
const [formData,setFormData]=useState({
    "name": "",
    "email": "",
    "role": "" });
function update(event)
{
    setFormData((prevState)=>{
        console.log(event.target.name,event.target.value);
        return {...prevState,[event.target.name]:event.target.value};//for updating specific values of an object
    });
}
function handleOpen(id)//open dialog modal
{
    setOpen(()=>true);
    setEditId(()=>id);
}
function handleClose()//close dialog modal
{
    setOpen(false);
}
function validateInput()//function to validate the details to edit
{
        if(formData.email===""||formData.role === ""||formData.email === "" || !formData.email.includes('@'))
            return false;
        return true;
}
function editDetails(){
    if(!validateInput())
        return;
    let newUsers=structuredClone(users);
    // Get the index of Array item which matchs the editId
    let index=newUsers.findIndex(user=>user.id===editId);
    newUsers[index]={id:`${editId}`,...formData};
    setUsers(newUsers);//we update users state array as the useffect triggered by this will also update currentPageData
    let updatedAllUsers=structuredClone(allUsers.current);
    index=updatedAllUsers.findIndex(user=>user.id===editId);
    updatedAllUsers[index]={id:`${editId}`,...formData};
    allUsers.current=updatedAllUsers;
    setFormData({
        "name": "",
        "email": "",
        "role": "" });
    handleClose();
}
return (
        <div class="table-wrapper">
                <table className="users-table">
                    <thead className="table-header">
                        <tr style={{backgroundColor:theme.components.Table.primary,color:theme.components.Table.secondary}}>
                            <th><Checkbox checked={selectAll} sx={{color: "#FFFF"}} onChange={onSelectAll}/></th>
                            <th align="center">Name</th>
                            <th align="center">Email</th>
                            <th align="center">Role</th>
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    <DialogBox open={open} formData={formData} update={update} handleOpen={handleOpen} handleClose={handleClose} editDetails={editDetails}/>
                        {currentPageData.map((user) => (
                                <tr
                                key={user.id}
                                sx={{ backgroundColor:selected.includes(user.id)?theme.components.Row.selected:theme.components.Row.primary}}
                                >
                                    <td><Checkbox checked={selected.includes(user.id)} onChange={()=>changeSelection(user.id)}/></td>
                                    <td align="center">{user.name}</td>
                                    <td align="center">{user.email}</td>
                                    <td align="center">{user.role}</td>
                                    <td align="center">
                                            <Stack direction="row" justifyContent="center" spacing={1}>
                                                <IconButton color="primary"onClick={()=>handleOpen(user.id)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={()=>deleteUser(user.id)}>
                                                    <DeleteOutlineOutlinedIcon color="error"/>
                                                </IconButton>
                                            </Stack>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
        </div>
  );
}