import React from 'react';

const Buttons = ({title}) => {
    return (
        <button className="btn btn-outline border-0 border-b-4 mt-8 mx-auto">
        {title}
      </button>
    );
};

export default Buttons;