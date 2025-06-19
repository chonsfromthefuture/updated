// frontend/src/Compo/Sidebar/Sidebar.jsx

import React from 'react';
import styles from './Sidebar.module.css'; // Import Sidebar-specific CSS

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <nav>
        <a href="/seller/home" className={styles.sidebarLink}>
          <i className="bi bi-house-door-fill me-2"></i>Home
        </a>
        <a href="/seller/add-item" className={styles.sidebarLink}>
          <i className="bi bi-plus-circle-fill me-2"></i>Add Item
        </a>
        <a href="/seller/edit-item" className={styles.sidebarLink}>
          <i className="bi bi-pencil-square me-2"></i>Edit Item
        </a>
        <a href="/seller/delete-item" className={styles.sidebarLink}>
          <i className="bi bi-trash-fill me-2"></i>Delete Item
        </a>
        <a href="/seller/view-items" className={styles.sidebarLink}>
          <i className="bi bi-list-check me-2"></i>View My Items
        </a>
      </nav>
    </div>
  );
}