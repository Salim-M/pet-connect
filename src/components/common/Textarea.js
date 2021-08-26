import React from 'react';

const Textarea = ({onChange, className, field, form, ...rest}) => {
    return(
        <textarea {...rest} {...field} rows="5" className={['bg-white focus:outline-none focus:ring rounded py-2 text-gray-900 px-3 w-full shadow border', className].join(' ')} onChange={onChange} />
    );
};

export default Textarea;