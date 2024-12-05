import React from 'react';

export default function ({ array, onFilter }) {
    const filterHandler = (e) => {
        onFilter(e.target.value);
    };

    // بررسی اینکه اگر array حداقل یک گزینه دارد، اولین گزینه را به عنوان placeholder استفاده کنیم
    const [placeholder, ...options] = array;

    return (
        <select
            name="filter"
            id="filter"
            onChange={filterHandler}
            className="bg-transparent text-white outline-none border-gray-500 border rounded-md my-1 md:my-0 md:mx-4 p-1 h-12 md:h-8 w-full md:w-48 text-sm focus:border-pink-500"
        >
            <option value="all" disabled selected>{placeholder}</option>

            {options.map((option, index) => (
                <option key={index} className="bg-black outline-none border-none rounded-none" value={option} >
                    {option}
                </option>
            ))}
        </select>
    );
}
