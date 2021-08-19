import React from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';

const createButtonClasses = (color, className) => {
    let classes = ['font-medium', 'items-center', 'justify-center', 'text-sm', 'px-4', 'py-2', 'rounded-md', 'inline-flex', 'transition', 'ease-in-out', 'duration-150'];
    switch(color){
        case 'success':
            classes = [...classes, 'bg-green-500', 'hover:bg-green-600', 'text-white'];
            break;
        case 'warning':
            classes = [...classes, 'bg-yellow-500', 'hover:bg-yellow-600', 'text-white'];
            break;
        case 'danger':
            classes = [...classes, 'bg-red-600', 'hover:bg-red-700', 'text-white'];
            break;
        default:
            classes = [...classes, 'bg-blue-700', 'hover:bg-blue-800', 'text-white'];
            break;

    }
    return classes.join(' ') + ' ' + className;
}

const Button = ({loading, children, onClick, color, className, disabled, ...rest}) => (
    <button onClick={onClick} className={createButtonClasses(color, className)} disabled={disabled || loading} {...rest} >{ loading ? <Spinner /> : children }</button>
);

Button.prototype = {
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    color: PropTypes.oneOf(['primary', 'success', 'warning', 'danger'])
}

export default Button;