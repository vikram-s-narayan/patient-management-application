import React, { useState } from "react";
import axios from "axios";

const CreatePatient = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const apiPath = "https://hapi.fhir.org/baseR4/Patient";
  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full name is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!birthDate) newErrors.birthDate = "Birth date is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const patientData = {
          resourceType: "Patient",
          name: [
            {
              given: [fullName.split(" ")[0]],
              family: fullName.split(" ").slice(1).join(" "),
            },
          ],
          gender: gender,
          birthDate: birthDate,
          telecom: [{ system: "phone", value: phoneNumber }],
        };
        await axios.post(apiPath, patientData);
        setFullName("");
        setGender("");
        setBirthDate("");
        setPhoneNumber("");
        setErrors({});
      } catch (error) {
        console.error("Error creating patient:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Create Patient</h2>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Full Name:
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
        />
        {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Gender:</label>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
        />
        {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Birth Date:
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          pattern="\d{4}-\d{2}-\d{2}"
          style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
        />
        {errors.birthDate && <p style={{ color: "red" }}>{errors.birthDate}</p>}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Phone Number:
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
        />
        {errors.phoneNumber && (
          <p style={{ color: "red" }}>{errors.phoneNumber}</p>
        )}
      </div>
      <button
        type="submit"
        className="button"
        style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
      >
        Create Patient
      </button>
    </form>
  );
};

export default CreatePatient;
