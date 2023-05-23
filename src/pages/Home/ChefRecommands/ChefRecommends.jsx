import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

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
                    recommends.map(items => <div key={items._id} className="card bg-base-100 shadow-xl">
                    <figure>
                      <img src={items.image} alt="Image not found" className="rounded" />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title text-lg font-bold">{items.name}</h2>
                      <p className='font-semibold text-xs'>{items.recipe}</p>
                      <div className="card-actions">
                      <button className="btn btn-outline border-0 px-6 border-b-4 mt-8 text-yellow-500 uppercase">Add To Cart</button>
                      </div>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default ChefRecommends;