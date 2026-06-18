import { Container, Form, Button, Card } from "react-bootstrap";
import { useState } from 'react';
import { register } from "../api/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      await register(formData);
      toast.success("Account created successfully! Verify email and log in.");
      navigate("/login");
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };
  
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: "420px" }} className="p-4 shadow-sm">
        <Card.Body>
          <h3 className="mb-4">Create a new account</h3>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder=""
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder=""
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder=""
                required
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Button type="submit" className="w-100" variant="success">
              Sign Up
            </Button>
          </Form>

          <div className="d-flex align-items-center justify-content-center mt-4">
            <span>
              Already have an account?
              <a href="/login"> Sign in</a>
            </span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
