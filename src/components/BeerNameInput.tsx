import React, { JSX } from "react"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup'

const BeerNameInput = ({ placeHolder, inputValue, onChangeCallback }: any): JSX.Element => {

    return (
        <InputGroup className="mb-3">
            <Container>
                <Row>
                    <Form.Label>Beer</Form.Label>
                    <Form.Control
                        value={inputValue}
                        onChange={event => onChangeCallback(event.target.value)}
                        onInputCapture={event => onChangeCallback(event.currentTarget.value)}
                        placeholder={placeHolder}
                    ></Form.Control>
                </Row>
            </Container>
        </InputGroup>
    )
}

export default BeerNameInput