//
import React, { useState } from "react";
import PatientList from "./components/PatientList";
import CreatePatient from "./components/CreatePatient";
import SearchPatient from "./components/SearchPatient";
import UpdatePatient from "./components/UpdatePatient";

const App = () => {
  const [activeTab, setActiveTab] = useState("searchPatient");
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div style={{ marginBottom: "20px" }}>
        <button className="button" onClick={() => setActiveTab("listPatients")}>
          List Patients
        </button>
        <button
          className="button"
          onClick={() => setActiveTab("createPatient")}
        >
          Create Patient
        </button>
        <button
          className="button"
          onClick={() => setActiveTab("searchPatient")}
        >
          Search Patient
        </button>
        <button
          className="button"
          onClick={() => setActiveTab("updatePatient")}
        >
          Update Patient
        </button>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {activeTab === "listPatients" && (
          <div>
            <PatientList />
          </div>
        )}
        {activeTab === "createPatient" && (
          <div>
            <CreatePatient />
          </div>
        )}
        {activeTab === "searchPatient" && (
          <div>
            <SearchPatient />
          </div>
        )}
        {activeTab === "updatePatient" && (
          <div>
            <UpdatePatient />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
