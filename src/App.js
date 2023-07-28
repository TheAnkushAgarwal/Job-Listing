import React,{useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';


const API = "https://entryleveljobs.me/api/jobs";
const typeAPI ="https://entryleveljobs.me/api/jobs/type";
const categoryAPI = "https://entryleveljobs.me/api/jobs/category"


const App = () => {
    const [users, setUsers] = useState([]);
    const[dummy, setDummy]=useState([]);

    const[jobType,setJobType]= useState([]);
    const [categoryType, setCategoryType]= useState([]);


    const [currentJob, setCurrentJobs] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [jobsOffset, setJobsOffset] = useState(0);


    
    const typefilter=(catItem)=>{
            const result= dummy.filter((currData)=>{
            if(currData.type != null )
                return currData.type?.name ===catItem;
            else
                return null;
        });

        setUsers(result);
    }


    const categoryfilter=(catItem)=>{
        const result= dummy.filter((currData)=>{
            return currData.category?.name ===catItem;
        });

        setUsers(result);

    }

    const fetchUsers = async (url) => {

        try {
            const res = await fetch(url);
            const data = await res.json();
             setUsers(data?.data);
             setDummy(data?.data);
        } catch (e) {
            console.error(e)
        }
    }


    const fetchJobType = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
             setJobType(data?.data);
        } catch (e) {
            console.error(e)
        }
    }

    const fetchCategoryType = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
             setCategoryType(data?.data);
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        fetchUsers(API);
        fetchJobType(typeAPI);
        fetchCategoryType(categoryAPI);
    }, [])


    useEffect(() => {
        const endOffset = jobsOffset + 10;
        setCurrentJobs(users.slice(jobsOffset, endOffset));
        setPageCount(Math.ceil(users.length / 10));
    }, [users, jobsOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % users.length;
        setJobsOffset(newOffset);
    };


    return(
    <>
        <div className="mx-auto fs-1 text-center mt-5 mb-5 ">
            <h1 className="fw-bold fs-1 text-decoration-underline">JOB LISTING</h1>
        </div>
        <div className="container-fluid mx-2">
            <div className="row mt-5 mx-2">
                <div className="col-md-2">
                    <h1 className=" mb-4">JOB TYPE</h1>

                    {
                        jobType.map((curr) => {
                        const {typeId,name } = curr;
                        return (
                            <>
                                <button className="btn btn-warning w-100 mb-2 mx-2 fs-5" key={typeId} onClick={()=> typefilter(name)}>{name}</button>

                            </>
                            );
                        })
                    }

                    
                    <button className="btn btn-warning w-100 mb-4 mx-2 fs-5" onClick={()=> fetchUsers(API)}>All Job Types</button>

                    <h1 className="p-1 mt-5 mb-4">JOB Category</h1>
                    {
                        categoryType.map((curr) => {
                            const {categoryId,name } = curr;
                        return (
                            <>
                                <button className="btn btn-warning mb-4 mx-2 fs-5" key={categoryId} onClick={()=> categoryfilter(name)}>{name}</button>

                            </>
                            );
                        })
                    }


                </div>

                <div className="col-md-10 overflow-auto table-responsive mt-2">

                    <table className="table table-bordered table-striped mx-5">
                        <thead className="thead-dark">
                        <tr className="row row-cols-6">
                            <th scoper="col" className="fs-3 lh-base col" >Company Name</th>
                            <th scoper="col" className="fs-3 lh-base col">Type</th>
                            <th scoper="col" className="fs-3 lh-base col">Positions</th>
                            <th scoper="col" className="fs-3 lh-base col">Category</th>
                            <th scoper="col" className="fs-3 lh-base col">Location</th>
                            <th scoper="col" className="fs-3 lh-base col">Apply Link</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((curr) => {
                                const { jobId, position, link, category, location, type, companyName } = curr;
                                return (
                                    <>
                                    <tr key={jobId} scope="row"  className="row row-cols-6">
                                        <td className="fs-3 lh-base col">{companyName}</td>
                                        <td className="fs-3 lh-base col">{type?.name}</td>
                                        <td className="fs-3 lh-base col">{position}</td>
                                        <td className="fs-3 lh-base col">{category?.name}</td>
                                        <td className="fs-3 lh-base col">{location}</td>
                                        <td className="fs-3 lh-base col overflow-hidden">
                                            <a href={link}>
                                                Click Here
                                            </a>
                                        </td>
                                        
                                    </tr>
                                    </>
                                );
                            })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>




        <div className="container mx-auto mt-5 mb-5">               

        <div className="pagination align-middle">
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
        </div>
    </>
    )
}

export default App;