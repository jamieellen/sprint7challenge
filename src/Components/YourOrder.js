import React, {useState, useEffect} from "react";
import axios from 'axios';

// import Pizza from './Pizza';
const initialOrders = []


export default function YourOrder({ details }) {
      const [orders, setOrders] = useState(initialOrders)
      const getOrders = () => {
            axios.get('https://reqres.in/api/orders')
              .then( res => {
                // console.log(res); (Here to see what data you are getting back to organize)
                setOrders(res.data);
            }).catch(err => console.err(err))
      }

      useEffect(() => {
            getOrders()
      }, [])

      if (!details) {
      return <h3>Working fetching your order&apos;s values...</h3>
      }

      return (
            <div className='order container'>
                  <h2>{details.nameInput}</h2>
                  <p>Pizza Size: {details.pizzaSize}</p>

                  {
                        !!details.toppings && !!details.toppings.length &&
                        <div>
                              Toppings:
                              <ul>
                                    {details.toppings.map((like, idx) => <li key={idx}>{like}</li>)}
                              </ul>
                        </div>
                  }

                  <p>Special Instructions: {details.specialNotes}</p>

                  {
                        orders.map(order => {
                              return (
                                    <YourOrder key={order.id} details={order} />
                              )
                        })
                  }

            </div>
      )
}
