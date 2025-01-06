import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const formHandles = async (e) => {
    e.preventDefault();

    // Directly perform validation here
    let formErrors = {};

    if (!inputs.name) {
      formErrors.name = "Name is required";
    } else if (inputs.name.length < 3) {
      formErrors.name = "Name must be at least 3 characters long";
    }

    if (!inputs.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      formErrors.email = "Email address is invalid";
    }

    if (!inputs.password) {
      formErrors.password = "Password is required";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set the errors state
      return; // Stop form submission if there are errors
    }

    // If no errors, proceed with the fetch request
    fetch("http://localhost/php_api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials
      body: JSON.stringify(inputs), // Send inputs as JSON
    })
      .then((response) => {
        if (response.ok && response.status === 201) {
          return response.json(); // Return the JSON response if success
        }
        throw new Error("Failed to add User");
      })
      .then(() => navigate("/login")) // Redirect on success
      .catch((error) => console.error("Error:", error.message)); // Log the error
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <>
      <div style={{ width: "50%", margin: "auto" }}>
        <Form onSubmit={formHandles}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label className="text-start">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDuration">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDuration">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Signup;
