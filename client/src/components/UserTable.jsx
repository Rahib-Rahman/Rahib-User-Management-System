import { Table, Form } from "react-bootstrap";

export default function UsersTable({ users, selectedIds, setSelectedIds }) {
  const toggleAll = () => {
    if (selectedIds.length === users.length) setSelectedIds([]);
    else setSelectedIds(users.map((u) => u.id));
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Format date/time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'active': 'success',
      'blocked': 'danger',
      'unverified': 'warning'
    };
    return statusMap[status] || 'secondary';
  };

  return (
      <Table hover bordered responsive="sm" className="align-middle">
        <thead className="table-light">
        <tr>
          {/* CRITICAL: Header checkbox for Select All/Deselect All */}
          <th style={{ width: '50px', textAlign: 'center' }}>
            <Form.Check
                checked={selectedIds.length === users.length && users.length > 0}
                onChange={toggleAll}
                aria-label="Select all users"
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Registration Date</th>
          <th>Last Seen</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id}>
              {/* CRITICAL: Individual row checkbox - NO action buttons in rows */}
              <td style={{ textAlign: 'center' }}>
                <Form.Check
                    checked={selectedIds.includes(user.id)}
                    onChange={() => toggleOne(user.id)}
                    aria-label={`Select ${user.name}`}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
              <span className={`badge bg-${getStatusBadge(user.status)}`}>
                {user.status}
              </span>
              </td>
              <td>{formatDateTime(user.registration_at)}</td>
              <td>{formatDateTime(user.last_login_at)}</td>
            </tr>
        ))}
        </tbody>
      </Table>
  );
}
