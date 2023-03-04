export default function usePagination({totalCount,usersPerPage})
/*Props: 
totalCount: Contains total number of users
usersPerPage: Number of users to be kept per page*/
{
//function to return array of page numbers in given range
    function range(start, end) {
        let rangeArr=[];
        for (let i=start;i<=end;i++) {
            rangeArr.push(i);
        }
        return rangeArr;
    }
    function getPageNumbers()
    {
        let totalPages=Math.ceil(totalCount/usersPerPage);//total number of pages to be generated
        return range(1,totalPages);
    }
    return getPageNumbers();
}