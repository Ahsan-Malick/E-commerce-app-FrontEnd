import React from 'react'

const address = [
    {
        name: 'Leslie Alexander',
        street: '12 losinga road',
        postcode: 'IG11 4XD',
        phone: '07499999'

    },
    {
        name: 'Jack Lee',
        street: '25 baker lane',
        postcode: 'PE33 4XD',
        phone: '07499555'

    },

]

function Stacklist() {
    return (
        <fieldset>
            
                {address.map((address) => (
    <div className='text-start p-3 flex gap-5'>
                        <input id={address.name} name='address' type='radio' className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 " />
                        <span>
                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.postcode}</p>
                        </span>
                        </div> 
                ))}
                
        </fieldset>
    )
}

export default Stacklist
