import React, { useState } from 'react';

import {ChevronDownIcon, ChevronUpIcon, XCircleIcon} from '@heroicons/react/outline';

const Select = ({arrayHelpers, values, hint = "Breed"}) => {
    // TODO: Needs Improvements
    const [open, setOpen] = useState(false);
    const v = [
        {
            id: 1,
            name: 'Breed 1'
        },
        {
            id: 2,
            name: 'Breed 2'
        },
        {
            id: 3,
            name: 'Breed 3'
        },
        {
            id: 4,
            name: 'Breed 4'
        },
    ];
    return (
        <>
            <div className="flex space-x-2 items-center">
                <div className="rounded bg-white text-gray-400 font-base flex-grow overflow-x-scroll px-3 pt-2 pb-1 h-10 overflow-y-hidden shadow border flex space-x-1" >
                    {values.length > 0 ? values.map((object, index) => (
                        <div key={index} className="bg-blue-600 rounded-full text-sm space-x-2 py-0.5 px-2 text-white flex items-center">
                            <span className="truncate">{object.name}</span>
                            <div className="cursor-pointer" onClick={() => arrayHelpers.remove(index)}>
                                <XCircleIcon className="w-4 h-4" />
                            </div>
                        </div>
                    )) : <span>{hint}</span>}
                    
                </div>
                <div className="bg-blue-600 mt-1 rounded-full p-1 cursor-pointer" onClick={() => setOpen(!open)}>
                    {open ? <ChevronUpIcon className="w-4 h-4 text-white" /> : <ChevronDownIcon className="w-4 h-4 text-white" />}
                </div>
            </div>
            {open && (
                <div className="w-full rounded mt-1 bg-white shadow border cursor-pointer h-28 overflow-y-scroll selectbox">
                    {v.map((object, index) => (
                        <div key={object.id} onClick={() => {arrayHelpers.push(object);setOpen(false);}} className={`py-2 px-5 hover:bg-gray-100 ${index + 1 !== values.length && 'border-b'}`}>
                            {object.name}
                        </div>
                    ))}
                </div>
            )}
        </>
        
    );
};

export default Select;