import React, { Component } from 'react';
import '../App.css';
import $ from 'jquery';
import { Button, Col, Row, Grid, Form, FormGroup, Glyphicon, Table, Modal } from 'react-bootstrap';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            todoEditingText: '',
            todoEditingKey: 0,
        }
        this.createEvents = this.createEvents.bind(this);
        this.onEditEvent = this.onEditEvent.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }
    toComplete(key) {
        this.props.completeEvent(key);
    }
    createEvents(item) {
        return <tr key={item.key} className={item.completed ? "itemComplete" : "itemIncomplete"}>
            <td className="completeCol"><Button className="toComplete" style={{ backgroundColor: item.completed ? "#f47a42" : "white" }} onClick={() => this.toComplete(item.key)} bsStyle="default"><Glyphicon glyph="ok" /></Button></td>
            <td><span style={{ textDecoration: item.completed ? "line-through" : "none", color: item.completed ? "#aaa" : "black" }}>{item.text}</span>
                <span style={{ color: item.completed ? "#555" : "#f47a42" }} className="eventDetail">{item.completed ? "This event has been completed!" : "In progress"}</span>
            </td>
            <td className="editCol"><Button className="toDelete" bsStyle="warning" disabled={item.completed ? true : false} onClick={() => this.onEditEvent(item.key)} ><Glyphicon glyph="edit" /></Button></td>
            <td className="delCol"><Button className="toDelete" bsStyle="danger" onClick={() => this.delete(item.key)}><Glyphicon glyph="trash" /></Button></td>
        </tr>
    }
    onEditEvent(key) {
        this.setState({ isEditing: true });
        let todos = this.props.todoItems;
        let todo = todos.filter(function (item) {
            return (item.key === key);
        });
        this.setState({ todoEditingText: todo[0].text, todoEditingKey: todo[0].key })
    }
    onSaveClick(key) {
        let todos1 = this.props.todoItems.slice();
        if (todos1.length != 0) {
            let index = todos1.findIndex(el => el.key === key);
            todos1[index].text = $(".editVal").val();
        }
        this.setState({ todoItems: todos1, isEditing: false });
    }
    render() {
        let todos = this.props.todoItems;
        let listItems = todos.map(this.createEvents);

        return (
            <div>
                <Table>
                    <tbody>
                        {listItems}
                    </tbody>
                </Table>
                <Modal show={this.state.isEditing}
                    onHide={() => this.setState({ isEditing: false })}
                    container={this}
                    aria-labelledby="contained-modal-title-sm">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><Glyphicon glyph="edit" /> Edit this event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup bsSize="large" >
                            <input type="text" className="form-control  editVal" ref={this.state.todoEditingText} defaultValue={this.state.todoEditingText} />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.onSaveClick(this.state.todoEditingKey)} bsStyle="primary" bsSize="large">Save Change</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};


export default TodoList;