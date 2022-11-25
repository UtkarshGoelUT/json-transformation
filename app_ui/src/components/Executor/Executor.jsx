import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Circles } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Executor.css";

const Executor = (props) => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sourceJSON, setSourceJSON] = useState("Source JSON");
  const [targetJSON, setTargetJSON] = useState("Target JSON");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const sourceJsonFileReader = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setSourceJSON(e.target.result);
    };
  };

  const sourceJsonFileUploadHandler = (e) => {
    // Check if user has entered the file
    if (e.target.files.length) {
      sourceJsonFileReader(e);
    }
  };

  const sourceJsonButtonHandler = async () => {
    if (!isJsonString(sourceJSON)) {
      toast.error("Please upload a valid JSON file!");
      return;
    }
    if (!selectedProject) {
      toast.info("Select a project to execute!");
      return;
    }
    setLoading(true);
    console.log("Sending");
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/execute`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: selectedProject,
        input: JSON.parse(sourceJSON),
      }),
    });
    const data = await res.json();
    setLoading(false);
    setTargetJSON(JSON.stringify(data));
    toast.success("Conversion successful!");
  };

  const sourceJsonTextChangeHandler = async (e) => {
    setSourceJSON(e.target.value);
  };
  useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }

    async function fetchData() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email: location.state.email }),
      });
      const data = await res.json();
      setLoading(false);
      setProjects(data);
      setUser(location.state.user);
      setSelectedProject(
        location.state.selectedProject ? location.state.selectedProject : ""
      );
    }
    fetchData();
  }, []);
  return (
    <Row>
      <Col lg={4} xs={12}>
        <div className="projects">
          {loading ? (
            <div style={{ width: "100%", margin: "auto" }}>
              <Circles
                height="80"
                width="80"
                color="rgb(50, 222, 212)"
                ariaLabel="circles-loading"
                visible={loading}
              />
            </div>
          ) : projects.length > 0 ? (
            <Form.Select
              onChange={(e) => setSelectedProject(e.target.value)}
              aria-label="Default select example"
            >
              <option value="">Select project</option>
              {projects
                .filter((project, val) =>
                  project.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((project) => (
                  <option value={project.id}>{project.name}</option>
                ))}
            </Form.Select>
          ) : (
            <>
              <h1 style={{ color: "black" }}>No projects to show!</h1>
            </>
          )}
        </div>
      </Col>
      <Col xs={12} lg={4}>
        <div style={{ margin: "20px 10px" }}>
          <h3 style={{ color: "black", margin: "25px 0" }}>
            {selectedProject?.length > 0
              ? "Selected mapping: " +
                projects.filter((project) => project.id === selectedProject)[0]
                  .name
              : "Select a Project to execute"}
          </h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter Source JSON</Form.Label>
            <Form.Control
              as="textarea"
              rows={13}
              value={sourceJSON}
              onChange={sourceJsonTextChangeHandler}
            />
          </Form.Group>

          <Form.Group
            controlId="formFile"
            className="mb-3"
            onChange={(e) => {
              sourceJsonFileUploadHandler(e);
            }}
          >
            <Form.Control type="file" />
          </Form.Group>
          <Button onClick={sourceJsonButtonHandler}>Convert JSON</Button>
        </div>
      </Col>
      <Col xs={12} lg={4}>
        <fieldset disabled style={{ margin: "114px 10px" }}>
          <Form.Control
            id="disabledTextInput"
            as="textarea"
            placeholder={targetJSON}
            rows={13}
          />
        </fieldset>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default Executor;
