import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';

const errors = {
      nameRequired: 'Please Enter a Name',
      nameMin: "name must be at least 2 characters",
      sizeRequired: 'Please Select a Pizza Size',
      sizeOptions: 'Size must be Small, Medium or Large',
      toppingOptions: 'all we have it ham, pineapple, olives, or banana peppers'
}

const schema = yup.object().shape({
      nameInput: yup
            .string().trim()
            .required(errors.nameRequired)
            .min(2, errors.nameMin),
      pizzaSize: yup
            .string()
            .required(errors.sizeRequired).trim()
            .oneOf(['small', 'medium', 'large'], errors.sizeOptions),
      ham: yup.boolean(),
      pineapple: yup.boolean(),
      olives: yup.boolean(),
      bananaPeppers: yup.boolean(),
      specialNotes: yup
            .string().trim()
})

const initialValues = {
      nameInput: '',
      pizzaSize: '',
      ham: false,
      pineapple: false,
      olives: false,
      bananaPeppers: false,
      specialNotes:'',
}

const initialErrors = {
      nameInput: '',
      pizzaSize: ''
}

const initialOrders=[];

export default function Pizza() {  
      const [successMessage, setSuccessMessage] = useState('');
      const [failMessage, setFailMessage] = useState(initialErrors);
      const [values, setValues] = useState(initialValues);
      const [disabled, setDisabled] = useState(true);
      const [orders, setOrders] = useState(initialOrders);

      const postNewOrder = newOrder => {
            // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
            //    helper to [POST] `newFriend` to `http://buddies.com/api/friends`
            //    and regardless of success or failure, the form should reset
            axios.post('https://reqres.in/api/orders', newOrder)
              .then( res => {
                  setOrders([res.data, ...orders]);
              }).catch(err => console.err(err)
              ).finally(() => setValues(initialValues));
      }

      // const validate = ((name,value) => {
      //       yup.reach(schema, name)
      //         .validate(value)
      //         .then(() => setFailMessage({...errors, [name]:'' }))
      //         .catch(err => setFailMessage({...errors, [name]: err.errors[0] }))
      //   })      

      const onChange = evt => {
            // validate(name,value);
            let {type, name, value, checked} = evt.target
            value = type === 'checkbox' ? checked : value
            // name=name-input
            setValues({...values, [name]:value })
            yup.reach(schema, name)
              .validate(value)
              .then(() => setFailMessage({...failMessage, [name]:'' }))
              .catch(err => setFailMessage({...failMessage, [name]: err.errors[0] }))
      }  

      const onSubmit = evt => {
            evt.preventDefault()
            const newOrder = {
                  name: values.nameInput.trim(),
                  pizzaSize: values.pizzaSize.trim(),
                  toppings: ['ham', 'pineapple', 'olives', 'bananaPeppers'].filter(topping => !!values[topping])
            }
            postNewOrder(newOrder);
      }  

      useEffect(() => {
            schema.isValid(values).then(valid => (setDisabled(!valid)))
      }, [values])

      return (
            <div>
                  <h2>Build Your Pizza!</h2>
                  <form className='pizza-form' id='pizza-form' onSubmit={onSubmit}>
                        {successMessage && <h4 className="success">{successMessage}</h4>}
                        {/* lLatmap combines .map and .filter */}
                        
                        {Object.keys(failMessage).flatMap(failKey => 
                              failMessage[failKey] 
                                    ? <h4 className="error">{failMessage[failKey]}</h4> 
                                    : []      
                        )}

                        {/* DISABLED BUTTON */}
                         <button disabled={disabled} id='order-button'>submit</button>

                        {/* ////////// TEXT INPUTS ////////// */}
                                          
                        <div className="inputGroup">
                              <label htmlFor="name-input">Name:</label>
                              <input value={values.nameInput} onChange={onChange} id="name-input" name="nameInput" type="text" placeholder="Enter Name" />
                              {errors.nameInput && <div className="validation">{errors.nameInput}</div>}
                        </div>
                  
                        {/* ////////// DROPDOWN ////////// */}
                        <div className="inputGroup">
                              <label htmlFor="pizzaSize">Pizza Size:</label>
                              <select value={values.pizzaSize} onChange={onChange} id="size-dropdown" name="pizzaSize">
                                    <option value="">-- Select Size --</option>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                              </select>
                              {errors.pizzaSize && <div className="validation">{errors.pizzaSize}</div>}
                        </div>
                  
                        {/* ////////// CHECKBOXES ////////// */}

                        <div className='inputGroup' id='toppings'>
                              <h4>Toppings:</h4>
                              <label>Ham
                                    <input 
                                          type='checkbox'
                                          name='ham'
                                          value='ham'
                                          onChange={onChange}
                                          checked={values.ham} 
                                    />
                              </label>
                              <label>Pineapple
                                    <input 
                                          type='checkbox'
                                          name='pineapple'
                                          value='pineapple'
                                          onChange={onChange}
                                          checked={values.pineapple}
                                    />
                              </label>
                              <label>Olives
                                    <input 
                                          type='checkbox'
                                          name='olives'
                                          value='olives'
                                          onChange={onChange}
                                          checked={values.olives}
                                    />
                              </label>
                              <label>Banana Peppers
                                    <input 
                                          type='checkbox'
                                          name='bananaPeppers'
                                          value='bananaPeppers'
                                          onChange={onChange}
                                          checked={values.bananaPeppers}
                                    />
                              </label>
                        </div>
                        <div className='inputGroup'>
                              <label>Special Instructions
                                    <input
                                          value={values.specialNotes}
                                          type='text'
                                          name='specialNotes'
                                          id='special-text'
                                          onChange={onChange}
                                    />
                              </label>
                        </div>
                  </form>
            </div> 
      )
}