import React from 'react';


const Header = () => {
    return (
        <div className="h-80 md:h-96 relative home__header">
            <div className="fadeIn opacity-0 flex flex-col space-y-2 h-full justify-center px-10 text-white">
                <h2 className="text-4xl md:text-5xl font-bold">Get Personalized Pet Matches</h2>
                <p className="font-light text-2xl">Answer a few quick questions to see your perfect matches on PetConnect.</p>
            </div>
            {/* <div className="bg-blue-600 p-4 rounded home__header-bottom">hi</div> */}
        </div>
    )
}

export default Header;