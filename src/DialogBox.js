import React from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './DialogBox.css';
import { TextField,Dialog,DialogActions,DialogContent,DialogTitle} from "@mui/material"; 
export default function DialogBox({open,formData,update,handleClose,editDetails}) {
/*Props: 
open: State to control open and close of dialog modal
formData: Contains the information about the values in the dialog modal fields
update: Function to update fields in formData
handleClose: Function to close the dialog modal
editDetails: Function to commit the edits to the current row*/
    const theme = useTheme();
    return(
                <Dialog open={open} onClose={handleClose} sx={{'.MuiPaper-root':{backgroundColor:"#383838",padding:"1rem 1rem 1.5rem"}}}>
                    <Stack className="dialog-header"direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <DialogTitle >Update User Details</DialogTitle>
                    </Stack>
                    <DialogContent className="dialog-content"
                        sx={{
                                "& .MuiFormLabel-root": {
                                    color: '#AFAFAF'
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: '#AFAFAF'
                                },
                                "& .MuiInputBase-root": {
                                    border:`1px solid #AFAFAF`
                                },
                                "& .MuiInputBase-root.Mui-focused": {
                                    border:`1px solid #AFAFAF`
                                },
                                "& .MuiInputBase-input":{
                                    color:"#AFAFAF"
                                },
                                "& .MuiFormHelperText-root":{
                                    color: '#AFAFAF'
                                },
                                "& .MuiTextField-root":{
                                    width:"35vw",
                                    marginBottom: "2rem"
                                }
                                }
                                }>
                            <TextField
                                name="name"
                                label="Name"
                                value={formData.name}
                                onChange={update}
                                error={formData.name === ""}
                                helperText={formData.name === "" ? 'Name cannot be empty':''}
                            />
                            <TextField
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={update}
                                error={formData.email === "" || !formData.email.includes('@')}
                                helperText={formData.email === ""?'Email cannot be empty':!formData.email.includes('@')?'Missing @':''}
                            />
                            <TextField
                                name="role"
                                label="Role"
                                value={formData.role}
                                onChange={update}
                                error={formData.role === ""}
                                helperText={formData.role === "" ? 'Role cannot be empty':''}
                            />
                    </DialogContent>
                    <DialogActions style={{justifyContent:"flex-start"}}>
                        <Button variant="contained" style={{backgroundColor:theme.components.Button.backgroundColor}} onClick={editDetails}>Update</Button>
                        <Button variant="text" style={{color:theme.components.Button.textColor}}onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
    );
}