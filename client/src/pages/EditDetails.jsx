import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

const EditDetails = () => {
  const { userId } = useParams();
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/edit/${userId}`);
        const jsonData = await response.json();
        setDetails(jsonData);
        console.log(jsonData);
        if (response.ok) {
          console.log("Success Edit");
        }
      } catch (error) {
        console.log("Edit Details Error", error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/edit/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      if (res.ok) {
        console.log("Done data");
        navigate("/");
      }
    } catch (error) {
      console.log("Update Error", error.message);
    }
  };

  const handleChange = (e) => {
    console.log("e value", e);
    const name = e.target.name;
    const value = e.target.value;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div class="d-flex justify-content-between flex-wrap flex-md nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">
          Editing: {details.firstname} {details.lastname}
        </h1>
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
                <NavLink to="/" style={{textDecoration:"none", color:'black'}}>Dashboard</NavLink>
                </li>
                <li class="breadcrumb-item active">
                  {details.firstname} {details.lastname}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="my-3">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            value={details?.firstname}
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
            value={details?.lastname}
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
            value={details?.email}
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
            value={details?.textarea}
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

export default EditDetails;
