/** @format */

import React, { useEffect } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";

import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});

  return <Card.Text onClick={decoratedOnClick}>{children}</Card.Text>;
}
const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    userInfo,
    dispatch,
    navigate,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  return (
    <MainScreen title={userInfo && `Welcome Back ${userInfo.name} ...`}>
      <Link to="/createnote">
        <Button>Create Note</Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && (
        <div style={{ textAlign: "center", alignItems: "center" }}>
          <Loading />
        </div>
      )}
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
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
                        {note.createdAt.substring(0, 10)}
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
