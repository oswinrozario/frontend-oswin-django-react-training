// Import necessary dependencies and styles
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.js";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    address: "",
    phone: "",
    about: "",
    position: "",
    date_of_birth: "",
    date_of_joining: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", employee.full_name);
    formData.append("email", employee.email);
    formData.append("address", employee.address);
    formData.append("phone", employee.phone);
    formData.append("about", employee.about);
    formData.append("position", employee.position);
    formData.append("date_of_birth", employee.date_of_birth);
    formData.append("date_of_joining", employee.date_of_joining);

    const accessToken = localStorage.getItem("token");

    axios
      .post(config.BASE_URL1 + "employees/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
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
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputFullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputFullName"
              placeholder="Enter Full Name"
              onChange={(e) =>
                setEmployee({ ...employee, full_name: e.target.value })
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
              onChange={(e) =>
                setEmployee({ ...employee, about: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="selectPosition" className="form-label">
              Position
            </label>
            <select
              id="selectPosition"
              className="form-select rounded-0"
              value={employee.position}
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
            >
              <option value="">Select Position</option>
              <option value="Manager">Manager</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Project Leader">Project Leader</option>
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="inputDateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDateOfBirth"
              onChange={(e) =>
                setEmployee({ ...employee, date_of_birth: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputDateOfJoining" className="form-label">
              Date of Joining
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDateOfJoining"
              onChange={(e) =>
                setEmployee({ ...employee, date_of_joining: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
