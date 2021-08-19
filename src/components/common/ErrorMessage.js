import React from 'react';

import {ExclamationCircleIcon} from '@heroicons/react/outline';

const ErrorMessage = ({msg}) => {
    return (
        <div className="text-red-600 flex items-center text-sm mt-1"><ExclamationCircleIcon className="w-4 h-4 inline mt-0.5" />&nbsp;{msg}</div>
    )
};

export default ErrorMessage;