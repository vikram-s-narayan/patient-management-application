import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1); // New state for pagination

  const fetchPatients = async (page) => {
    try {
      const response = await axios.get(
        `https://hapi.fhir.org/baseR4/Patient?_count=20&_getpagesoffset=${
          (page - 1) * 20
        }`
      );
      const entries = response.data.entry || [];
      const patientsData = entries.map((entry) => {
        const { name, gender, birthDate } = entry.resource;
        const fullName =
          name && name.length > 0 && name[0].given && name[0].given.length > 0
            ? name[0].given.join(" ") + " " + name[0].family
            : "Unknown";
        return {
          fullName,
          gender,
          birthDate,
        };
      });
      setPatients(patientsData);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
  useEffect(() => {
    fetchPatients(page);
  }, [page]); // Fetch patients when page changes

  return (
    <div>
      <h2>Patient List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Gender
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Birth Date
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {patient.fullName}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {patient.gender}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {patient.birthDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page + 1)}>Next</button>{" "}
      {/* Next button */}
    </div>
  );
};

export default PatientList;
