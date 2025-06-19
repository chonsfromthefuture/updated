// frontend/src/pages/SellerPage/SellerPage.jsx

import React, { useEffect, useRef } from 'react'; // Import useEffect and useRef
import Header from "../../Compo/Header/Header";
import Sidebar from "../../Compo/Sidebar/Sidebar"; // Import the Sidebar component
import styles from "./SellerPage.module.css"; // SellerPage specific styles

// Import Bootstrap CSS (assuming it's not globally imported in main.jsx/App.jsx)
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap Icons CSS (if using Bootstrap Icons)
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Chart.js components
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register Chart.js components needed for Pie and Bar charts
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function SellerPage() {
  // Data for the Pie Chart
  const pieData = {
    labels: ['Electronics', 'Clothing', 'Home Goods', 'Books'],
    datasets: [
      {
        data: [300, 50, 100, 40], // Example data
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for the Bar Chart
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Sales ($)',
        data: [1200, 1900, 3000, 5000, 2300, 4500], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  const showSearchBar = false; // Set to false to hide search bar on SellerPage

  // Create refs for each section/widget you want to animate
  const headerTextRef = useRef(null);
  const statsCardsRef = useRef([]); // Use an array for multiple similar elements
  const barGraphRef = useRef(null);
  const pieGraphRef = useRef(null);
  const progressBarsRef = useRef(null);
  const quickAccessRef = useRef(null);


  useEffect(() => {
    // Define the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When element enters viewport, add the 'show' class
            entry.target.classList.add(styles.showWidget);
          } else {
            // When element leaves viewport, remove the 'show' class
            // This makes it "disappear" when it scrolls out of view
            entry.target.classList.remove(styles.showWidget);
          }
        });
      },
      {
        // Options for the observer
        root: null, // null means the viewport
        rootMargin: '0px', // No margin around the root
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    // Observe the elements
    if (headerTextRef.current) observer.observe(headerTextRef.current);
    if (barGraphRef.current) observer.observe(barGraphRef.current);
    if (pieGraphRef.current) observer.observe(pieGraphRef.current);
    if (progressBarsRef.current) observer.observe(progressBarsRef.current);
    if (quickAccessRef.current) observer.observe(quickAccessRef.current);

    // Observe all stats cards
    statsCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (headerTextRef.current) observer.unobserve(headerTextRef.current);
      if (barGraphRef.current) observer.unobserve(barGraphRef.current);
      if (pieGraphRef.current) observer.unobserve(pieGraphRef.current);
      if (progressBarsRef.current) observer.unobserve(progressBarsRef.current);
      if (quickAccessRef.current) observer.unobserve(quickAccessRef.current);

      statsCardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <>
      <Header showSearchBar={showSearchBar} />
      <div className={styles.container}> {/* This div now holds both Sidebar and main content */}
        <Sidebar /> {/* Render the Sidebar component here */}

        <main className={styles.content}>
          {/* Dashboard Overview Content */}
          <div className="container-fluid py-3">
            {/* Apply ref to the elements you want to observe */}
            <h2 className={`mb-4 text-center ${styles.animatedWidget}`} ref={headerTextRef}>Seller Dashboard Overview</h2>
            <p className="lead text-muted text-center mb-5">Welcome! Here's an overview of your activity and key metrics.</p>

            {/* Bootstrap Row for dashboard statistics widgets */}
            <div className="row g-3 mb-4">
              {/* Total Products Card */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                {/* Use a function to set refs for multiple elements */}
                <div className={`card text-center h-100 shadow-sm ${styles.animatedWidget}`} ref={(el) => (statsCardsRef.current[0] = el)}>
                  <div className="card-body">
                    <h5 className="card-title text-success">
                      <i className="bi bi-box-seam-fill me-2"></i>Total Products
                    </h5>
                    <p className="card-text fs-3 fw-bold">1,234</p>
                  </div>
                </div>
              </div>
              {/* Shop Visitors Card */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className={`card text-center h-100 shadow-sm ${styles.animatedWidget}`} ref={(el) => (statsCardsRef.current[1] = el)}>
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      <i className="bi bi-eye-fill me-2"></i>Shop Visitors
                    </h5>
                    <p className="card-text fs-3 fw-bold">987</p>
                  </div>
                </div>
              </div>
              {/* Trending Category Card */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className={`card text-center h-100 shadow-sm ${styles.animatedWidget}`} ref={(el) => (statsCardsRef.current[2] = el)}>
                  <div className="card-body">
                    <h5 className="card-title text-info">
                      <i className="bi bi-graph-up-arrow me-2"></i>Trending
                    </h5>
                    <p className="card-text fs-3 fw-bold">Furniture</p>
                  </div>
                </div>
              </div>
              {/* Pending Orders Card */}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className={`card text-center h-100 shadow-sm ${styles.animatedWidget}`} ref={(el) => (statsCardsRef.current[3] = el)}>
                  <div className="card-body">
                    <h5 className="card-title text-danger">
                      <i className="bi bi-hourglass-split me-2"></i>Pending Orders
                    </h5>
                    <p className="card-text fs-3 fw-bold">7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Progress Bars Section */}
            <div className="row g-3 mb-4">
              {/* Bar Graph */}
              <div className="col-lg-8">
                <div className={`card h-100 shadow-sm ${styles.animatedWidget}`} ref={barGraphRef}>
                  <div className="card-header bg-dark text-white">
                    <i className="bi bi-bar-chart-fill me-2"></i>Monthly Sales
                  </div>
                  <div className="card-body">
                    <Bar data={barData} options={barOptions} />
                  </div>
                </div>
              </div>

              {/* Pie Graph */}
              <div className="col-lg-4">
                <div className={`card h-100 shadow-sm ${styles.animatedWidget}`} ref={pieGraphRef}>
                  <div className="card-header bg-secondary text-white">
                    <i className="bi bi-pie-chart-fill me-2"></i>Product Categories
                  </div>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <div style={{ maxWidth: '300px', maxHeight: '300px' }}>
                      <Pie data={pieData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bars Section */}
            <div className="row g-3 mb-4">
              <div className="col-12">
                <div className={`card shadow-sm ${styles.animatedWidget}`} ref={progressBarsRef}>
                  <div className="card-header bg-info text-white">
                    <i className="bi bi-hourglass-top me-2"></i>Performance Progress
                  </div>
                  <div className="card-body">
                    <h6 className="mb-2">Order Fulfillment Rate <span className="float-end">75%</span></h6>
                    <div className="progress mb-3">
                      <div className="progress-bar bg-success" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                    <h6 className="mb-2">Customer Satisfaction <span className="float-end">90%</span></h6>
                    <div className="progress mb-3">
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: '90%' }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                    <h6 className="mb-2">New Product Development <span className="float-end">50%</span></h6>
                    <div className="progress">
                      <div className="progress-bar bg-warning" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access / Other Info Section */}
            <div className="row g-3">
              <div className="col-lg-12">
                <div className={`card h-100 shadow-sm ${styles.animatedWidget}`} ref={quickAccessRef}>
                  <div className="card-header bg-secondary text-white">
                    <i className="bi bi-speedometer2 me-2"></i>Quick Access
                  </div>
                  <div className="list-group list-group-flush">
                    <a href="/seller/add-item" className="list-group-item list-group-item-action">
                      <i className="bi bi-plus-circle me-2"></i> Add New Product
                    </a>
                    <a href="/seller/view-items" className="list-group-item list-group-item-action">
                      <i className="bi bi-list-check me-2"></i> View All Listings
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <i className="bi bi-graph-up me-2"></i> View Sales Reports
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <i className="bi bi-gear me-2"></i> Account Settings
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}