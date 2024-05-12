import HomeCard from '@/components/modules/HomeCard/HomeCard'
import React from 'react'
import db from '@/data/db.json'
function Homes() {
    return (
        <div className="homes">
            {
                db.homes.slice(0, 6).map(item => (
                    <HomeCard key={item.id} {...item} />
                ))
            }
        </div>
    )
}

export default Homes