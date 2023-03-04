import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React from "react";
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTheme } from '@mui/material/styles';
import usePagination from './usePagination';
import './Footer.css';
export default function Footer({currentPage,totalCount,usersPerPage,deleteSelected,setCurrentPage}){
  /*currentPage: represents the current active page.
  totalCount: represents the total number of users retrieved from backend.
  usersPerPage: represents the maximum number of users on a single page.
  minAdjacentButtons: represents the min number of page buttons to be shown on each side of the current page button.
  setCurrentPage: callback function invoked with the updated page value when the page is changed.
  deleteSelected: callback function to delete selected users.*/
  const theme = useTheme();
  let pageNumbers=usePagination({totalCount,usersPerPage});
  function toStart()//send webapp to page 1
  {
    setCurrentPage(1);
  }
  function toEnd()//send webapp to last page
  {
    setCurrentPage(pageNumbers.length);
  }
  function previousPage()//send to previous page
  {
    setCurrentPage(currentPage - 1);
  }
  function nextPage()//send to next page
  {
    setCurrentPage(currentPage + 1);
  }
  let lastPage=pageNumbers[pageNumbers.length - 1];
  return (
    <Box className="footer">
      <Stack direction="row" sx={{alignItems:"center"}}spacing={40}>
            <Chip sx={{backgroundColor:theme.components.Button.backgroundColor,color:theme.components.Button.textColor}}label="Delete Selected"onClick={deleteSelected} />
            <Stack direction="row" spacing={2}>
                    <IconButton disabled={currentPage==1?true:false}variant="contained" color="primary" onClick={toStart}>
                        <KeyboardDoubleArrowLeftIcon sx={{ fontSize: "2rem" }}/>
                    </IconButton>
                    <IconButton disabled={currentPage==1?true:false} variant="contained" color="primary" onClick={previousPage}>
                        <ArrowBackIosNewIcon/>
                    </IconButton>  
                    {pageNumbers.map(pageNumber => {
                      return <Button key={pageNumber} size='small'className="page-button" disabled={pageNumber==currentPage?true:false}variant="contained" color="primary" 
                               onClick={()=>setCurrentPage(pageNumber)}>{pageNumber}</Button>
                  })}
                    <IconButton disabled={currentPage==lastPage?true:false}variant="contained" color="primary"  onClick={nextPage}>
                        <ArrowForwardIosIcon />
                    </IconButton>               
                    <IconButton disabled={currentPage==lastPage?true:false}variant="contained" color="primary" onClick={toEnd}>
                        <KeyboardDoubleArrowRightIcon sx={{ fontSize: "2rem" }}/>
                    </IconButton>
            </Stack>
      </Stack>
    </Box>
  );
};
