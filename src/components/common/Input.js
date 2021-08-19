import React from 'react';

const Input = ({onChange, className, field, form, ...rest}) => {
    return(
        <input {...rest} {...field} className={['focus:outline-none focus:ring rounded py-2 text-gray-900 px-3 w-full shadow border', className].join(' ')} onChange={onChange} />
    );
};

export default Input;