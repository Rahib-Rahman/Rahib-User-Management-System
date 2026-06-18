import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { login } from "../api/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [verifiedMessage, setVerifiedMessage] = useState(false);
  const navigate = useNavigate();

  // Check for verification message from email confirmation link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('verified') === 'true') {
      setVerifiedMessage(true);
      window.history.replaceState({}, document.title, '/login');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      toast.success("Logged in successfully.");
      navigate("/admin");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  return (
      <Container fluid className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: '#f5f5f5' }}>
        <Row className="w-100" style={{ maxWidth: '1000px' }}>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow-sm border-0">
              <Card.Body className="p-5">
                {verifiedMessage && (
                    <Alert variant="success" className="mb-3">
                      Email verified successfully! You can now login.
                    </Alert>
                )}

                <div className="mb-2">
                  <small className="text-muted">Start your journey</small>
                </div>
                <h4 className="mb-4 fw-bold">Sign In to The App</h4>

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small">E-mail</Form.Label>
                    <Form.Control
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        type="email"
                        placeholder="test@example.com"
                        required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small">Password</Form.Label>
                    <Form.Control
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        type="password"
                        placeholder="••••••••"
                        required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                        type="checkbox"
                        label="Remember me"
                        checked={formData.rememberMe}
                        onChange={(e) =>
                            setFormData({ ...formData, rememberMe: e.target.checked })
                        }
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100 mb-3" variant="primary">
                    Sign In
                  </Button>
                </Form>

                <div className="text-center small">
                  <span>Don't have an account? </span>
                  <a href="/register" className="text-decoration-none">Sign up</a>
                </div>
                <div className="text-center small mt-2">
                  <a href="#" className="text-decoration-none">Forgot password?</a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Optional: Add decorative gradient on desktop */}
          <Col md={6} className="d-none d-md-flex align-items-center justify-content-center" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            minHeight: '500px'
          }}>
            {/* Placeholder for decorative element */}
          </Col>
        </Row>
      </Container>
  );
}

