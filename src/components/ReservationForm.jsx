import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from 'react';
// questi sono le proprietà che il server si aspetta di ricevere
// ad ogni invio di prenotazione

// name <----- string
// phone <----- string/number
// numberOfPeople <----- string/number
// smoking <----- boolean
// dateTime <------ date/string
// specialRequest <------ string

const ReservationForm = () => {
  // state = {
  //   reservation: {
  //     name: "",
  //     phone: "",
  //     numberOfPeople: 1,
  //     smoking: false,
  //     dateTime: "",
  //     specialRequest: "",
  //   },
  // };
  const [reservation, setReservations] = useState({
    name: "",
    phone: "",
    numberOfPeople: 1,
    smoking: false,
    dateTime: "",
    specialRequest: "",
  })
  const handleChange = (propName, propValue) => {
    setReservations({
      // lo spread operator crea una copia di tutte
      // le proprietà di reservation
      ...reservation,
      [propName]: propValue,
      // se vogliamo creare una proprietà di un oggetto a partire da
      // una variabile, un parametro, un qualcosa che debba venire "valutato"
      // devo dichiararla tra parentesi quadre
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inviamo la prenotazione");
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/reservation",
        {
          method: "POST",
          body: JSON.stringify(reservation),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Prenotazione completata");
        setReservations({
          name: "",
          phone: "",
          numberOfPeople: 1,
          smoking: false,
          dateTime: "",
          specialRequest: "",
        });
      } else {
        alert("Errore durante la prenotazione");
      }
    } catch (err) {
      console.log("Something went wrong: " + err.message);
    }
  };
  // Il mio scopo è creare degli input field CONTROLLATI
  // controllati ==== con una two-way binding


  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={12}>
          <h2 className="text-center my-4">Prenota il tuo tavolo qui!</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Il tuo nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Inserisci il tuo nome"
                value={reservation.name}
                onChange={(e) => {
                  handleChange("name", e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Numero di telefono</Form.Label>
              <Form.Control
                required
                type="tel"
                placeholder="Inserisci il tuo numero di telefono"
                value={reservation.phone}
                onChange={(e) => {
                  handleChange("phone", e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Numero di persone</Form.Label>
              <Form.Control
                as="select"
                value={reservation.numberOfPeople}
                onChange={(e) => {
                  handleChange("numberOfPeople", e.target.value);
                }}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Fumatori?"
                checked={reservation.smoking}
                onChange={(e) => {
                  handleChange("smoking", e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>

            <Form.Group>
              <Form.Label>Data e ora</Form.Label>
              <Form.Control
                required
                type="datetime-local"
                placeholder="Inserisci il tuo numero di telefono"
                value={reservation.dateTime}
                onChange={(e) => {
                  handleChange("dateTime", e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Richieste speciali</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                row={3}
                placeholder="Allergie, cani, bambini..."
                value={reservation.specialRequest}
                onChange={(e) => {
                  handleChange("specialRequest", e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Invia prenotazione
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}


export default ReservationForm;
