import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../config.js";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    about: "",
    position: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    axios
      .get(config.BASE_URL1 + "employees/" + id + "/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.full_name,
          email: result.data.email,
          address: result.data.address,
          phone: result.data.phone,
          about: result.data.about,
          position: result.data.position,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", employee.name);
    formData.append("about", employee.about);
    formData.append("salary", employee.salary);
    formData.append("email", employee.email);
    formData.append("address", employee.address);
    formData.append("phone", employee.phone);
    const accessToken = localStorage.getItem("token");

    axios
      .patch(config.BASE_URL1 + "employees/" + id + "/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Address"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputPhone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPhone"
              placeholder="Enter Phone"
              value={employee.phone}
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAbout" className="form-label">
              About
            </label>
            <textarea
              className="form-control rounded-0"
              id="inputAbout"
              placeholder="Enter About"
              value={employee.about}
              onChange={(e) =>
                setEmployee({ ...employee, about: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
