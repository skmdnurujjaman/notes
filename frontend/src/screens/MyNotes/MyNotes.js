/** @format */

import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});

  return <Card.Text onClick={decoratedOnClick}>{children}</Card.Text>;
}
const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");
    setNotes(data);
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
    }
  };
  return (
    <MainScreen title="Welcome Back Nur ...">
      <Link to="createnote">
        <Button>Create Note</Button>
      </Link>
      {notes.map((note) => (
        <Accordion key={note._id}>
          <Card variant="primary" style={{ marginTop: "20px" }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "white",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <CustomToggle eventKey="0">{note.title}</CustomToggle>
              </span>
              <div>
                <Button variant="secondary" href={`/note/${note._id}`}>
                  Edit
                </Button>
                &nbsp;
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge bg="light">{note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <br />
                  <footer className="blockquote-footer">
                    Created On - date
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
