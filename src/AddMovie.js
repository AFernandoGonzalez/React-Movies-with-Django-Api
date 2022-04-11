import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";

const AddMovie = ({ onAdd }) => {
  const [name, setName] = useState("");
  console.log(name);
  const [genre, setGenre] = useState("");
  const [starring, setStarring] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    API.get("/")
      .then((res) => {
        setMovies(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, genre, starring };
    API.post("/", item).then(() => refreshMovies());
  };

  const onUpdate = (id) => {
    let item = { name };
    API.patch(`/${id}/`, item).then((res) => refreshMovies());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshMovies());
  };

  function selectMovie(id) {
    let item = movies.filter((movie) => movie.id === id)[0];
    setName(item.name);
    setGenre(item.genre);
    setStarring(item.starring);
    setMovieId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new Movie</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{movieId}Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>Starring</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Starring"
                value={starring}
                onChange={(e) => setStarring(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(movieId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Movie Name</th>
                <th scope="col">Genre</th>
                <th scope="col">Starring</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{movie.id}</th>
                    <td> {movie.name}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.starring}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectMovie(movie.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(movie.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;