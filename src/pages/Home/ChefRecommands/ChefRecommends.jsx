import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import FoodCard from '../../Shared/FoodCard/FoodCard';

const ChefRecommends = () => {
    const [recommends, setREcommends] = useState([])
    useEffect(() => {
        fetch("menu.json")
        .then(res => res.json())
        .then(data => {
            const salad = data.filter(singleData => singleData.category === "salad")
            const custom = salad.slice(0, 3)
            setREcommends(custom)
        })
    }, [])
    return (
        <div>
            <SectionTitle
                heading="CHEF RECOMMENDS"
                subHeading="Should Try"
            ></SectionTitle>

            <div className='grid md:grid-cols-3 grid-cols-1 gap-4 px-8 mt-20 mb-6'>
                {
                    recommends.map(items => <FoodCard key={items._id} items={items}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default ChefRecommends;