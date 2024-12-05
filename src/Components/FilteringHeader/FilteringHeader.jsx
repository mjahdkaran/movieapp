import React, { useState } from 'react';
import { Filter } from '../../utils/icon';
import FilteringInput from './FilteringInput/FilteringInput';
const FILTER_OPTIONS = [
    { category: 'country', values: ['all', 'Iran', 'USA', 'Korea', 'China'] },
    { category: 'age', values: ['all', '6-10', '12-17', '18+'] },
    { category: 'language', values: ['all', 'Persian', 'Original'] },
    { category: 'film', values: ['all', 'movie', 'series', 'Television show'] },
];
export default function FilteringHeader() {
    const [showFilters, setShowFilters] = useState(false);
    const [itemsFilter, setItemsFilter] = useState({}); // Object to store both temporary and applied filters
    const [tempItemsFilter, setTempItemsFilter] = useState({})

    const handleFilter = (filterCategory, filterValue) => {
        setTempItemsFilter((prev) => ({
            ...prev,
            [filterCategory]: filterValue, // Update or add the selected filter (can be temporary)
        }));
    };

    const handleApplyFilters = () => {
        setItemsFilter(tempItemsFilter)
        setShowFilters(false); // Hide the filter options


    };

    const handleRemoveFilter = (filterCategory) => {
        setItemsFilter((prev) => {
            const updatedFilters = { ...prev };
            delete updatedFilters[filterCategory]; // Remove the specific filter
            return updatedFilters;
        });
    };

    return (
        <div className="sticky top-16 z-50 bg-black bg-opacity-95 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-xl md:text-2xl font-semibold">
                    Watch Movies and Series Online
                </h1>
                <div className="flex justify-end flex-wrap-reverse text-white items-center">
                    {/* Display selected filters */}
                    {Object.entries(itemsFilter).map(([category, value], index) => (
                        <div
                            key={index}
                            className="flex items-center  p-1 border border-white hover:border-pink-600 rounded-md mx-1 cursor-pointer"
                            onClick={() => handleRemoveFilter(category)} // Remove filter on click
                        >
                            {value}
                            <span className="text-xl font-medium mx-1">×</span>
                        </div>
                    ))}

                    <button
                        className={`flex items-center justify-center rounded-md mx-6 text-white h-10 ${showFilters ? 'bg-pink-600' : ''}`}
                        onClick={() => setShowFilters(!showFilters)} // Toggle filter visibility
                    >
                        <Filter />
                    </button>
                </div>
            </div>

            <div
                className={`flex flex-col md:flex-row  items-center justify-evenly bg-white bg-opacity-15 overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'h-80 md:h-20 ' : 'h-0  '}`}
            >
                {/* Filter Inputs */}
                {FILTER_OPTIONS.map(({ category, values }) => (
                    <FilteringInput
                        key={category}
                        onFilter={(value) => handleFilter(category, value)}
                        array={[category, ...values]}
                    />
                ))}
                {/* Apply Filters Button */}
                <button
                    onClick={handleApplyFilters} // Apply the filters when clicked
                    className="rounded-lg h-12 md:h-8 bg-pink-700 hover:bg-pink-800 p-1 w-full my-1 md:my-0 md:w-48 font-medium mx-0 md:mx-2"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}
