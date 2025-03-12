import React from 'react'
import { useFormik } from 'formik';
import { Search } from 'lucide-react'

export default function Searchbar() {
    const searchForm = useFormik({
        initialValues: {
            searchValue: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        }
    })
    return (
        <>
            <div className='mx-auto'>
                <form onSubmit={searchForm.handleSubmit}>
                    <div className='flex items-center justify-center gap-2'>
                        <input 
                            className='border border-gray-500 rounded-xl py-2 px-4'
                            type="text" 
                            name='searchValue' 
                            id='searchValue' 
                            placeholder='Search...'
                            onChange={searchForm.handleChange}
                            value={searchForm.values.searchValue}
                        />
                        <button type='submit'><Search size={25} /></button>
                    </div>
                </form>
            </div>
        </>
    )
}