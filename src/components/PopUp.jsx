import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useMutation, useQuery } from 'react-query'
import postTodo from '../api/postTodo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import putTodo from '../api/putTodo';
import { getSingleTodo } from '../api/getTodo';
import { debounce } from 'lodash';


function PopUp({ isOpen, setIsOpen, id, setmsg, msg }) {

    const [formData, setFormData] = useState([])

    // single todo task getting api using single todo task id
    const { mutate: mutateSingle } = useMutation(getSingleTodo, {
        onSuccess: (data) => {
            setFormData(data)
        },
        onError: (err) => {
            console.error(err)
        }
    })

    // for single task getting call mutate and through that call getSingleTodo api
    useEffect(() => {
        if (id) {
            mutateSingle(id)
        }
    }, [id])

    //  post todo api call for adding new task 
    const { isLoading: loading, mutate } = useMutation({
        mutationKey: ['todosTask'],
        mutationFn: postTodo,
        onSuccess: (data) => {
            toast.success("Task added successfully", { autoClose: 500 })
            setIsOpen(false)
            setmsg("updated")
        },
        onError: (err) => {
            console.error(err)
        }
    })


    // update task api using todo task id
    const { mutate: mutatePut } = useMutation(putTodo, {
        onSuccess: debounce((data) => {
            setIsOpen(false)
            // refetch()
            setmsg("updated")
        }, 500),
        onError: (err) => {
            console.error(err)
        }
    })

    //  formik i have use for form validation and handle form data 
    const formik = useFormik({
        initialValues: {
            todo: ""
        },
        validationSchema: Yup.object({
            todo: Yup.string().required("Required field").trim()
        }),
        onSubmit: (values) => {
            if (formData.id) {
                mutatePut({ id: formData.id, todo: values.todo })
            } else {
                mutate(values);
            }

        },
    });


    return (
        <>
        {/* for this popup model i have use @headlessui/react package */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(true)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center bg-font_black bg-opacity-75">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="absolute top-0 right-0  pt-6 pr-6 block">
                                        <button type="button" onClick={() => setIsOpen(false)} className="rounded-md bg-white hover:bg-background_gray text-gray-400 hover:text-gray-500 focus:outline-none stroke-grey_border">
                                            <span className="sr-only">Close</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 text-gray-900 font-Nunito"
                                    >
                                        Add Your Task
                                        <hr className='mt-3' />
                                    </Dialog.Title>

                                    <div className="mt-2">
                                        <form className='mt-6 space-y-6' onSubmit={formik.handleSubmit}>
                                            <div>
                                                <label htmlFor="todo" className='inline-block mb-2 font-Nunito text-sm'>Add Your Task
                                                </label>
                                                <div className='relative mt-1'>
                                                    <textarea disabled={loading} type="text" name="todo" id="todo" placeholder="Write Your Task Here....." onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.todo || formData.todo}
                                                        className='w-full border-2  px-3 py-3 h-32 text-font_black focus:outline-none bg-white rounded-md' />
                                                </div>
                                                {formik.touched.todo && formik.errors.todo ? (
                                                    <div className='mt-1 text-sm text-red font-Nunito'>{formik.errors.todo}</div>
                                                ) : null}
                                            </div>
                                            <div className="mt-4 flex justify-center">
                                                <button
                                                    type="submit"
                                                    className="rounded-md border  bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    {formData.id ? "Update" : "Submit"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div >
                </Dialog >
            </Transition >
            <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>
    )
}

export default PopUp