import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    textarea: "",
    gender: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        console.log("Done data");
        navigate("/");
      }
    } catch (error) {
      console.log("Submit Error", error.message);
    }
  };
  return (
    <div className="container mb-2">
      <div class="d-flex justify-content-between flex-wrap flex-md nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Customer</h1>
        <div class="btn-toolbar mb-2 mb-md 0">
          <div class="btn-group me-2">
            <button class="btn btn-sm btn-outline-secondary">?</button>
          </div>
        </div>
      </div>

      <div class="col py-3">
        <div class="row">
          <div class="col">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <NavLink style={{textDecoration:"none", color:'black'}} to="/">Dashboard</NavLink>
                </li>
                <li class="breadcrumb-item active">New Customer</li>
              </ol>
            </nav>
          </div>
          <div class="col text-end fw-lighter">
            <b>UserId</b>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            value={user.firstname}
            onChange={handleChange}
            className="form-control"
            name="firstname"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            value={user.lastname}
            onChange={handleChange}
            className="form-control"
            name="lastname"
            required
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            name="email"
            id="exampleInputEmail1"
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Textarea</label>
          <textarea
            className="form-control"
            rows={8}
            cols={12}
            value={user.textarea}
            onChange={handleChange}
            required
            name="textarea"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label d-block mx-2">Gender</label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
            className="form-check-input mx-2"
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
            className="form-check-input mx-2"
          />
          Female
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
