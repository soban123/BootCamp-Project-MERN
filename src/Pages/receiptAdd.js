import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
export default class ReceiptAdd extends Component {
    render() {
        return (
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
                <div class="row" >
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                            <Form.Text className="text-muted">

                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">

                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">

                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="file" placeholder="file" />

                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                </Button>
                    </Form>
                </div>

            </div>
        )
    }
}
