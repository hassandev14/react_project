import React from "react";
import { useEffect, useState } from "react";
import { Button, Table,Form,Modal } from "react-bootstrap";

function Poll() {
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPoll, setEditPoll] = useState({ id: "", title: "", duration_in_minute: "" });

  // Fetch Polls
  useEffect(() => {
    fetch("http://localhost/php_api/polls").then((result) => {
      result.json().then((res) => {
        setData(res);
        console.log(res)
      });
    });
  },[]);

  // Delete Poll
  const handleDelete = (id) => {
    fetch(`http://localhost/php_api/polls/${id}`, {
      method: 'DELETE',  // Adjust based on the request method
      headers: {
        'Content-Type': 'application/json', // Make sure you specify the content type
      },
     
    })  
    .then((response) => {
      response.json().then((res) => {
        console.log(res)
        if (res.status === 'success') {  // Check if the response status is 'success'
          // If successful, filter out the deleted item from data
          setData(data.filter(d => d.id !== id));
        } else {
          console.log('Error:', res.message); // Log error message if status is not 'success'
        }
        //setData(data.filter(d => d.id !== id));
      });
    })  
  }

   // Open Edit Modal
   const handleEdit = (id) => {
    const pollToEdit = data.find((d) => d.id === id);
    setEditPoll(pollToEdit);
    setShowEditModal(true);
  };

  // Save Edit
  const saveEdit = () => {
    fetch(`http://localhost/php_api/polls/${editPoll.id}`, {
      method: "PUT", // Use PUT for updating data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPoll),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        // Update the local state
        setData(
          data.map((d) => (d.id === editPoll.id ? { ...d, ...editPoll } : d))
        );
        setShowEditModal(false);
      });
  };

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Duration</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.id}>
            <td>{d.id}</td>
            <td>{d.title}</td>
            <td>{d.duration_in_minute}</td>
            <td><Button className="me-2 btn-danger" onClick={()=>handleDelete(d.id)}>Delete</Button>
            <Button className="btn-success" onClick={()=>handleEdit(d.id)}>Edit</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>

    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Poll</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={editPoll.title}
            onChange={(e) => setEditPoll({ ...editPoll, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formDuration">
          <Form.Label>Duration (in minutes)</Form.Label>
          <Form.Control
            type="number"
            value={editPoll.duration_in_minute}
            onChange={(e) =>
              setEditPoll({ ...editPoll, duration_in_minute: e.target.value })
            }
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowEditModal(false)}>
        Cancel
      </Button>
      <Button className="btn-success" variant="primary" onClick={saveEdit}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  );
}

export default Poll;
