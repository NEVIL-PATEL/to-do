import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getTodo } from '../api/getTodo'
import PopUp from '../components/PopUp'
import { debounce } from 'lodash'
import deleteTodo from '../api/deleteTodo'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';


function Todo() {
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState('')
    const [todo, setTodo] = useState([])
    const [msg, setmsg] = useState('')
    const [pagination, setPagination] = useState({
        currentPage: 1,
        total: 10,
        skip: 0,
        limit: 12,
        sdata: ''
    })

    // useQuery use for refech,data,loading,error and so on...
    const { refetch, isLoading } = useQuery('to-do', () => getTodo(pagination), {
        onSuccess: (data) => {
            setTodo(data)
        },
        onError: (err) => {
            console.error(err)
        }
    });


    const reData = debounce(() => {
        refetch();
        setmsg('')
    }, 500)

    // after update msg get reData fucntion call and again refech data 
    useEffect(() => {
        if (msg) {
            reData();
        }
    }, [msg])


    // refech when changes in pagination
    useEffect(debounce(() => {
        refetch();
    }, 700), [pagination])



    // delete api call when click delete button
    const { mutate } = useMutation(deleteTodo, {
        onSuccess: debounce((data) => {
            refetch();
        }, 500),
        onError: (err) => {
            console.error(err)
        }
    });


    //  search input arrow function and after pagination change call refetch function for api calling
    const handleSearch = async (sData) => {
        setPagination({ ...pagination, sdata: sData });
    }

    // on pagination change click event and after pagination change call refetch function for api calling
    const handlePage = (page) => {
        setPagination({ ...pagination, currentPage: page })
    }

    return (
        <>
            <div className='flex justify-center font-Nunito font-semibold text-3xl'>
                To-Dos Task
            </div>
            <div className='flex justify-between mx-24'>
                <button className="inline-flex justify-end items-center bg-button_color border-0 py-1 px-3 focus:outline-none hover:bg-btnClip_hover rounded text-base mt-4 md:mt-0" onClick={() => setIsOpen(true)}>Add Task
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
                <div>
                    <input id="search" type="text" name="search" placeholder="Search here.." className="w-full focus:outline-none bg-button_color border-gray-400 py-2 px-4 border rounded-md" onChange={(e) => { handleSearch(e.target.value) }} />
                </div>
            </div>
            <div className='container mx-auto px-5 py-7'>
                <div className='flex flex-wrap'>
                    {
                        todo && todo?.map((i, index) => {
                            const { id, todo } = i;
                            return (
                                <React.Fragment key={index}>
                                    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                        <div className="block p-3 relative h-48 rounded-3xl rounded-tl-none rounded-br-none border-2 border-dark overflow-hidden bg-button_color font-Nunito" >
                                            {todo}
                                        </div>
                                        <div className="mt-4 flex justify-around">
                                            <button className='px-4 py-2 text-white font-Nunito bg-light hover:bg-dark rounded-md' onClick={() => {
                                                setId(id)
                                                setIsOpen(true)
                                            }}>Edit</button>
                                            <button className='px-4 py-2 text-white font-Nunito bg-light_red hover:bg-red rounded-md' onClick={() => {
                                                mutate(id)
                                            }}>Delete</button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>

            {/* for pagination buttons i have use react-responsive-pagination package */}
            <div className='mb-8 mx-3'>
                <ResponsivePagination
                    current={pagination.currentPage}
                    total={pagination.total}
                    onPageChange={page => handlePage(page)}
                />
            </div>

            {/* popup component call for popup model and pass all this mentioned variable and functions as a props */}
            <PopUp isOpen={isOpen} setIsOpen={setIsOpen} id={id} setmsg={setmsg} msg={msg} />
        </>
    )
}

export default Todo