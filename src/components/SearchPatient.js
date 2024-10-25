//search patient by name or phone number
import React, { useState } from "react";
import axios from "axios";

const SearchPatient = () => {
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    console.log("handleSearch called");
    try {
      let query = "https://hapi.fhir.org/baseR4/Patient?";
      if (searchName) {
        query += `name=${searchName}`;
      }
      if (searchPhone) {
        if (searchName) {
          query += "&";
        }
        query += `telecom=${searchPhone}`;
      }
      const response = await axios.get(query);
      console.log(response.data);
      const entries = response.data.entry || [];
      const patientsData = entries.map((entry) => {
        const { name, gender, birthDate, telecom } = entry.resource;
        const fullName =
          name && name.length > 0
            ? name[0].given.join(" ") + " " + name[0].family
            : "Unknown";
        const phoneNumber =
          telecom && telecom.length > 0 ? telecom[0].value : "Unknown";
        return {
          fullName,
          gender,
          birthDate,
          phoneNumber,
        };
      });
      setSearchResults(patientsData);
      setError("");
    } catch (error) {
      console.error("Error searching patients:", error);
      setError("Error searching patients. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Search Patient</h2>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
            marginBottom: "10px",
          }}
        />
        <input
          type="text"
          placeholder="Enter phone number"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
            marginBottom: "10px",
          }}
        />
        <button
          className="button"
          onClick={handleSearch}
          style={{ width: "100%" }}
        >
          Search
        </button>
      </div>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {searchResults.map((patient, index) => (
          <li
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
              backgroundColor: "#fff",
            }}
          >
            <p>
              <strong>Name:</strong> {patient.fullName}
            </p>
            <p>
              <strong>Gender:</strong> {patient.gender}
            </p>
            <p>
              <strong>Birth Date:</strong> {patient.birthDate}
            </p>
            <p>
              <strong>Phone Number:</strong> {patient.phoneNumber}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPatient;
