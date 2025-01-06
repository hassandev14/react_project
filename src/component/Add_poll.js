import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Add_poll() {
  const [inputs, setInputs] = useState({ title: "", duration_in_minute: "" });
  const navigate = useNavigate();

  const formHandles = async (e) => {
    e.preventDefault();
  
    fetch("http://localhost/php_api/polls", {
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
        console.log(inputs)
        throw new Error("Failed to add poll"); // Throw error if not successful
      })
      .then(() => navigate("/")) // Redirect on success
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
     <div style={{width: '50%', margin: 'auto'}}>
      <Form onSubmit={formHandles}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label className="text-start">Title</Form.Label>
          <Form.Control
            type="text" placeholder="Enter title" name="title" value={inputs.title} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDuration">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="number" placeholder="Enter duration" name="duration_in_minute" value={inputs.duration_in_minute} onChange={handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
     </div>
    </>
  );
}

export default Add_poll;
