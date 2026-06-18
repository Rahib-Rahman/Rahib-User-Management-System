import { Container, Alert, Button } from "react-bootstrap";
import Header from "../components/Header";
import Toolbar from "../components/Toolbar";
import UserTable from "../components/UserTable.jsx";
import { useState, useEffect } from "react";
import { getUsers, deleteUsers, updateUsersStatus, deleteUnverified, verifyEmailEmulation } from "../api/users.api";
import { toast } from "react-toastify";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentUserStatus, setCurrentUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        window.location.href = "/login";
      }
      const errorMessage =
          err.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Get current logged-in user's status from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentUserStatus(currentUser.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = async (action, status = null) => {
    try {
      if (action === "delete") {
        if (!window.confirm("Are you sure you want to delete selected users?")) return;
        await deleteUsers(selectedIds);
        toast.success("Users deleted successfully");
      } else if (action === "deleteUnverified") {
        if (!window.confirm("Are you sure you want to delete all unverified users?")) return;
        await deleteUnverified();
        toast.success("Unverified users deleted");
      } else {
        await updateUsersStatus(selectedIds, status);
        toast.success(`Status changed to ${status}`);
      }
      setSelectedIds([]);
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) window.location.href = "/login";
      const errorMessage =
          err.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  // ========================================
  // Email verification button
  // Show alert bar if current user status is 'unverified'
  // ========================================
  const handleVerifyEmail = async () => {
    try {
      await verifyEmailEmulation();
      toast.success("Email verified successfully!");
      // Update local user status
      const updatedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      updatedUser.status = 'active';
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUserStatus('active');
      // Refresh users list
      fetchUsers();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Verification failed";
      toast.error(errorMessage);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
      <>
        <Header />
        <Container fluid className="p-4">
          {/* ========================================
            Alert bar for unverified users
            Show only if current user status is 'unverified'
            ======================================== */}
          {currentUserStatus === 'unverified' && (
              <Alert variant="warning" className="mb-4 d-flex justify-content-between align-items-center">
            <span>
              <strong>Your email is unverified.</strong> Click the button to verify your email and activate your account.
            </span>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleVerifyEmail}
                    className="ms-3"
                >
                  Click This Button
                </Button>
              </Alert>
          )}

          <Toolbar
              onAction={handleAction}
              hasSelection={selectedIds.length > 0}
              selectedUsers={users.filter((u) => selectedIds.includes(u.id))}
          />
          <UserTable
              users={users}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
          />
        </Container>
      </>
  );
}
