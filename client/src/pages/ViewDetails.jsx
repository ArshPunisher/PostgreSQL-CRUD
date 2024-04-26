import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

const ViewDetails = () => {
  const [details, setDetails] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/edit/${userId}`);
        const jsonData = await response.json();
        setDetails(jsonData);
        if (response.ok) {
          console.log("Success Edit");
        }
      } catch (error) {
        console.log("Edit Details Error", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div class="d-flex justify-content-between flex-wrap flex-md nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">
          {details.firstname} {details.lastname}
        </h1>
        <div class="btn-toolbar mb-2 mb-md 0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">
              Share
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary">
              Export
            </button>
          </div>
        </div>
      </div>

      <div class="col py-3">
        <div class="row">
          <div class="col">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <NavLink
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li class="breadcrumb-item active">
                  {details.firstname} {details.lastname}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: "140px" }}>
              {" "}
              <b>Name:</b>
            </div>
            <div className="col">
              {details.firstname} {details.lastname}
            </div>
          </div>
        </li>

        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: "140px" }}>
              {" "}
              <b>Email:</b>
            </div>
            <div className="col">{details.email}</div>
          </div>
        </li>

        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: "140px" }}>
              {" "}
              <b>Gender:</b>
            </div>
            <div className="col">{details.gender}</div>
          </div>
        </li>

        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: "140px" }}>
              {" "}
              <b>Details:</b>
            </div>
            <div className="col">{details.textarea}</div>
          </div>
        </li>

        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: "140px" }}>
              {" "}
              <b>Date Created:</b>
            </div>
            <div className="col">NULL</div>
          </div>
        </li>

        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{ maxWidth: "140px" }}>
              {" "}
              <b>Date Modified:</b>
            </div>
            <div className="col">NULL</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ViewDetails;
