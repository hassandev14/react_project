import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
    
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // Initialize errors state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const validationErrors = {};
    if (!name) validationErrors.name = " name is required";
    if (!password) validationErrors.password = "Password is required";
    setErrors(validationErrors);

    // If there are validation errors, don't proceed
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await fetch("http://localhost/php_api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        navigate('/')
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label> name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
