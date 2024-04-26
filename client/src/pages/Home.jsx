import React, { useEffect, useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [customers, setCustomers] = useState(null);
  const [ignored, forceUpdate] = useReducer(x=>x+1, 0);

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const response = await fetch('http://localhost:8000/customer')
        const jsonData = await response.json()
        setCustomers(jsonData);
        console.log('Fetched data:', jsonData);
      } catch (error) {
        console.log("error", error.message)
      }
    }
    fetchData();
  }, [ignored])

  const handleDelete = async (id) =>{
    console.log("I rannnn")
    try {
      const res = await fetch(`http://localhost:8000/delete/${id}`, {
        method:"DELETE"
      })
      const temp = await res
      console.log(temp)
      if(res.ok){
        console.log("ALL GOOD AND DELETED")
        forceUpdate();
      }
    } catch (error) {
      console.log("Deleting Error", error.message)
    }
  }

  return (
    <div className='container'>
      <h1 className='my-4 text-center'>WELCOME TO C.R.U.D</h1>
      <table className='table table-striped '>
        <thead>
          <tr>
            <th scope='cols'>First Name</th>
            <th scope='cols'>Last Name</th>
            <th scope='cols'>Email</th>
            <th scope='cols'>Gender</th>
            <th scope='cols' className='text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
            {customers ? customers.map((customer, idx)=>
              <tr key={idx}>
                <td>{customer.firstname}</td>
                <td>{customer.lastname}</td>
                <td>{customer.email}</td>
                <td>{customer.gender}</td>
                <td>
                  <div className='d-flex justify-content-end gap-2'>
                    <NavLink className="btn btn-primary btn-small" type="button" to={'/view/'+customer.id}>
                      <i className='bi bi-eye'></i>
                    </NavLink>
                    <NavLink className="btn btn-warning btn-small" type="button" to={'/edit/'+customer.id}>
                      <i className='bi bi-pencil'></i>
                    </NavLink>
                    <button type="submit" onClick={()=> handleDelete(customer.id)} className='btn btn-danger btn-small'>
                      <i className='bi bi-person-x'></i>
                    </button>
                  </div>
                </td>
              </tr>
            ): <tr></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default Home
