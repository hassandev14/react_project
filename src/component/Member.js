import React from 'react'
import { useEffect, useState } from "react";
import { Button, Table,Form,Modal } from "react-bootstrap";

function Member() {
    const [member, setMember] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editMember, setEditMember] = useState({});
  
    // Fetch Polls
    useEffect(() => {
      fetch("http://localhost/php_api/member").then((result) => {
        result.json().then((res) => {
          setMember(res);
        });
      });
    },[]);
  
    // Delete Poll
    const handleDelete = (id) => {
      fetch(`http://localhost/php_api/member/${id}`, {
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
            setMember(member.filter(d => d.id !== id));
          } else { 
            console.log('Error:', res.message); // Log error message if status is not 'success'
          }
          //setData(data.filter(d => d.id !== id));
        });
      })  
    }
  
     // Open Edit Modal
     const handleEdit = (id) => {
      const memberToEdit = member.find((d) => d.id === id);
      setEditMember(memberToEdit);
      setShowEditModal(true);
    };
  
    // Save Edit
    const saveEdit = () => {
      fetch(`http://localhost/php_api/member/${editMember.id}`, {
        method: "PUT", // Use PUT for updating s
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editMember),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          // Update the local state
          setMember(
            member.map((d) => (d.id === editMember.id ? { ...d, ...editMember } : d))
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
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
  
          </tr>
        </thead>
        <tbody>
          {member.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td><Button className="me-2 btn-danger" onClick={()=>handleDelete(d.id)}>Delete</Button>
                  <Button className="btn-success" onClick={()=>handleEdit(d.id)}>Edit</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
  
      
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={editMember.name}
              onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formDuration">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={editMember.email}
              onChange={(e) =>
                setEditMember({ ...editMember, email: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={saveEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
    );   
}

export default Member