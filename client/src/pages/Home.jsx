import React from "react";
import "./Home.css";
import doctorImage from "../assets/doctor1.png";
import blobImage from "../assets/blob.png";

export default function Home() {
  return (
    <div className="home-container">

      <div className="hero-section">
        <div className="hero-text">
          <h1>Welcome to CareStack Clinic</h1>
          <p>
            A modern and secure platform designed for doctors, caregivers, and administrators.
            Manage patient records, medications, and care, all in one place!
          </p>

          <a href="/login" className="home-button">
            Sign In
          </a>
        </div>

        <div className="hero-image">
  <img src={blobImage} alt="" className="blob-img" />
  <img src={doctorImage} alt="Doctor" className="doctor-img" />
</div>
      </div>

    </div>
  );
}