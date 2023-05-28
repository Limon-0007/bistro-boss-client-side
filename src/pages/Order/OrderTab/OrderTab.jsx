import React from 'react';
import FoodCard from '../../Shared/FoodCard/FoodCard';

const OrderTab = ({items}) => {
    return (
        <div className="grid md:grid-cols-3 gap-4 xl:grid-cols-4 sm:grid-cols-2">
              {items.map((items) => (
                <FoodCard items={items} key={items._id}></FoodCard>
              ))}
            </div>
    );
};

export default OrderTab;