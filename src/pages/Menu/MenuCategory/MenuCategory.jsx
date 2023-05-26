import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import Buttons from '../../../components/Buttons/Buttons';
import { Link } from 'react-router-dom';

const MenuCategory = ({items, title, coverImg}) => {
    return (
       <div>
        {title && <Cover img={coverImg} title={title}></Cover>}
       <div className="grid md:grid-cols-2 gap-10 px-10 mb-8 mt-20">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
        <div className='text-center mb-20'>
        <Link to={`/order/${title}`}>
        <Buttons title="order your favorite food"></Buttons>
        </Link>
        </div>
      </div>
    );
};

export default MenuCategory;