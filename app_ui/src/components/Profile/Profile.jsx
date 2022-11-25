import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Circles } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
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
      setProjects(data);
      setUser(location.state);
    }
    fetchData();
  }, [location.state]);
  return (
    <>
      {user ? (
        <Row>
          <Col xs={12} lg={4}>
            <div className="pf-wrapper shadow">
              <Card style={{ width: "20rem" }}>
                <div className="pic--wrap">
                  <Card.Img
                    style={{ padding: "3rem" }}
                    referrerPolicy="no-referrer"
                    variant="top"
                    id="profileImage"
                    src={
                      user.imageUrl
                        ? user.imageUrl
                        : "https://img.icons8.com/doodle/48/000000/user.png"
                    }
                  />
                </div>
                <Card.Body>
                  <Card.Title>Name: {user.name}</Card.Title>
                  <Card.Title>Email: {user.email}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col xs={12} lg={8}>
            <div className="pf-container">
              <div className="projects">
                {projects.length > 0 ? (
                  <Form.Control
                    type="email"
                    placeholder="Search"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                ) : (
                  <div style={{ width: "100%", margin: "auto" }}>
                    <Circles
                      height="80"
                      width="80"
                      color="rgb(50, 222, 212)"
                      ariaLabel="circles-loading"
                      visible={true}
                    />
                  </div>
                )}
                {projects
                  .filter((project) =>
                    project.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((project) => (
                    <Card className="project">
                      <Card.Header>{project.name}</Card.Header>
                      <Card.Body>
                        <Button
                          onClick={() =>
                            navigate("/executor", {
                              state: {
                                user: user,
                                selectedProject: project,
                              },
                            })
                          }
                        >
                          Execute code
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                {projects.length === 0 && <h1>No projects to show!</h1>}
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <div style={{ width: "100%", margin: "auto" }}>
          <Circles
            height="80"
            width="80"
            color="rgb(50, 222, 212)"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      )}
    </>
  );
};
export default Profile;
