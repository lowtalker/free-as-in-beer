import React, { JSX } from "react"

const ItemsList = ({ items }: any): JSX.Element => {
//name abv style description breweryName
    return (
        <div>
            {items.map((item: any) => <div key={item.id}><span>{item.name} : {item.style} : {item.abv} : {item.breweryName}</span><br /><span>{item.description}</span><br/><hr/></div>)}
        </div>
    )
}

export default ItemsList