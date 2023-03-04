import React from 'react';
import './Header.css'
import {InputAdornment,TextField} from "@mui/material";
import { Search } from "@mui/icons-material";
import './Header.css';
import { useTheme } from '@mui/material/styles';
export default function Header({searchKey,filterSearch}) {
/*Props: 
searchKey: State to the control and store value of search field
filterSearch: Function to filter the admin ui based on seacrh query in searchKey
*/
  const theme = useTheme();
  return (
                    <TextField
                        label="Search by name,email or role"
                        className="search-desktop"
                        sx={{
                          "& .MuiInputBase-root": {
                            border:`1px solid ${theme.components.Search.borderColor}`
                          },
                          "& .MuiInputBase-input":{
                            color:"#AAAAAA"
                          }
                        }
                        }
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                        name="search"
                        value={searchKey}
                        onChange={filterSearch}
                      />
    );
}
      
