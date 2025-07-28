import React from "react";
import "./admindashboard.css";

export default function AdminDashboard() {
  const loginLogs = [
    {
      user: "JohnDoe",
      loginTime: "2025-06-26 08:00",
      logoutTime: "2025-06-26 10:00",
      ip: "192.168.1.10",
    },
    {
      user: "JaneSmith",
      loginTime: "2025-06-26 09:15",
      logoutTime: "2025-06-26 11:00",
      ip: "192.168.1.11",
    },
  ];

  const purchases = [
    {
      customer: "Alice",
      item: "Vintage Clock",
      quantity: 1,
      total: "₱1500",
      date: "2025-06-25",
    },
    {
      customer: "Bob",
      item: "Antique Lamp",
      quantity: 2,
      total: "₱3000",
      date: "2025-06-24",
    },
  ];

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin Menu</h2>
        <ul>
          <li>Dashboard</li>
          <li>Login Logs</li>
          <li>Purchases</li>
          <li>Inventory</li>
          <li>Customers</li>
        </ul>
      </aside>

      <main className="dashboard">
        <h2>Admin Dashboard</h2>
        <div className="cards">
          <div className="card">Total Users: 128</div>
          <div className="card">Total Purchases: 542</div>
          <div className="card">Active Sessions: 6</div>
          <div className="card">Low Stock Alerts: 3</div>
        </div>

        <section className="section">
          <h3>Login & Logout History</h3>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Login Time</th>
                <th>Logout Time</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {loginLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.user}</td>
                  <td>{log.loginTime}</td>
                  <td>{log.logoutTime}</td>
                  <td>{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="section">
          <h3>Purchase History</h3>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p, index) => (
                <tr key={index}>
                  <td>{p.customer}</td>
                  <td>{p.item}</td>
                  <td>{p.quantity}</td>
                  <td>{p.total}</td>
                  <td>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
