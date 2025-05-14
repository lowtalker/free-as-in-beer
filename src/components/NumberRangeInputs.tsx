import React, { JSX } from "react"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { ABV_MAX_VAL, ABV_MIN_VAL } from "../util/constants";


const NumberRangeInputs = ({ minInputValue, maxInputValue, minChangeCallback, maxChangeCallback }: any): JSX.Element => {

    return (
        <Row>
            <InputGroup className="mb-3" >
                <Row>
                    <Container as={Col}>
                        <Form.Label>Min</Form.Label>
                        <Form.Control
                            value={minInputValue}
                            onChange={event => minChangeCallback(event.target.value)}
                            onInputCapture={event => minChangeCallback(event.currentTarget.value)}
                            onKeyUp={event => minChangeCallback(event.currentTarget.value)}
                            placeholder={ABV_MIN_VAL}
                        ></Form.Control>
                    </Container>
                    <Container as={Col}>
                        <Form.Label>Max</Form.Label>
                        <Form.Control
                            value={maxInputValue}
                            onChange={event => maxChangeCallback(event.target.value)}
                            onInputCapture={event => maxChangeCallback(event.currentTarget.value)}
                            onKeyUp={event => maxChangeCallback(event.currentTarget.value)}
                            placeholder={ABV_MAX_VAL}
                        ></Form.Control>
                    </Container>
                </Row>
            </InputGroup>
            <InputGroup className="mb-3" >
            </InputGroup>
        </Row>
    )
}

export default NumberRangeInputs