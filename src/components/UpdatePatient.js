import React, { useState } from "react";
import axios from "axios";

const UpdatePatient = () => {
  const [searchName, setSearchName] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});

  const searchPatients = async () => {
    try {
      const response = await axios.get(
        `https://hapi.fhir.org/baseR4/Patient?name=${searchName}`
      );
      console.log(response.data);
      setPatients(response.data.entry.map((entry) => entry.resource));
    } catch (error) {
      console.error("Error searching patients:", error);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setUpdatedDetails(patient);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const updatePatientDetails = async () => {
    try {
      await axios.put(
        `https://hapi.fhir.org/baseR4/Patient/${selectedPatient.id}`,
        updatedDetails
      );
    } catch (error) {
      console.error("Error updating patient details:", error);
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
      <h1 style={{ textAlign: "center" }}>Update Patient</h1>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search patient by name"
          style={{
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
            marginBottom: "10px",
          }}
        />
        <button
          className="button"
          onClick={searchPatients}
          style={{ width: "100%" }}
        >
          Search
        </button>
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {patients.map((patient) => (
          <li
            key={patient.id}
            onClick={() => handlePatientClick(patient)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            {patient.name[0].given.join(" ")} {patient.name[0].family}
          </li>
        ))}
      </ul>
      {selectedPatient && (
        <div>
          <h2 style={{ textAlign: "center" }}>
            Update Details for {selectedPatient.name[0].given.join(" ")}{" "}
            {selectedPatient.name[0].family}
          </h2>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={
                updatedDetails.name[0].given.join(" ") +
                " " +
                updatedDetails.name[0].family
              }
              onChange={handleInputChange}
              placeholder="Name"
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Gender:
            </label>
            <input
              type="text"
              name="gender"
              value={updatedDetails.gender}
              onChange={handleInputChange}
              placeholder="Gender"
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Birth Date:
            </label>
            <input
              type="date"
              name="birthDate"
              value={updatedDetails.birthDate}
              onChange={handleInputChange}
              placeholder="Birth Date"
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            className="button"
            onClick={updatePatientDetails}
            style={{ width: "100%" }}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdatePatient;
