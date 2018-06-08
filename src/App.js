import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Col, Row, Grid, Form, FormGroup, FormControl, } from 'react-bootstrap';
import './App.css';
import TodoList from './components/TodoList.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // todo : {key: 0,text:'',completed:'false'},
      todoItems: [],
      showingStatus: "allitems"
    };
    this.addNewItem = this.addNewItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toCompleteEvent = this.toCompleteEvent.bind(this);

  }
  addNewItem(e) {
    e.preventDefault();
    if (this._inputElement.value !== "") {
      let newItem = {
        text: this._inputElement.value,
        key: Date.now(),
        completed: false
      };
      const todos = this.state.todoItems;
      todos.push(newItem);

      this.setState({ todos: todos });
      this._inputElement.value = "";
    }
    console.log(this.state.todoItems);
    e.preventDefault();
  }
  deleteItem(key) {
    let filteredItems = this.state.todoItems.filter(function (item) {
      return (item.key !== key);

    });
    console.log(key);
    this.setState({
      todoItems: filteredItems
    });
  }
  filterItems(status) {

    this.setState({ showingStatus: status });
  }
  toCompleteEvent(key) {
    const todos = this.state.todoItems;
    //todos[index].completed = !todos[index].completed;
    let todo = todos.filter(function (item) {
      return item.key === key;

    });
    todo[0].completed = !todo[0].completed;

    this.setState({ todos });
    console.log(todo.completed + "" + todo.key)
    console.log(this.state.todoItems);
  }

  render() {
    let filteredItems = this.state.todoItems;
    if (this.state.showingStatus === "incomplete") {
      filteredItems = this.state.todoItems.filter((item) => !item.completed);
    } else if (this.state.showingStatus === "completed") {
      filteredItems = this.state.todoItems.filter((item) => item.completed);
    } else if (this.state.showingStatus === "allitems") {
      filteredItems = this.state.todoItems;
    }
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid">
            <Col lg={2} md={2}></Col>
            <Col lg={8} md={8}>
              <h2 className="App-title">Todo Events</h2>
            </Col>
            <Col lg={2} md={2}></Col>
          </Row>
          <Row>
            <Col lg={2} md={2}></Col>
            <Col lg={8} md={8}>
              <Form inline onSubmit={this.addNewItem}>
                <FormGroup bsSize="large" controlId="todoTitle">
                  <input className="form-control inputTitle" ref={(a) => this._inputElement = a} type="text" placeholder="Enter Todo Event Title" />
                </FormGroup>
                <Button bsSize="large" id="btnAdd" type="submit">Add</Button>
              </Form>
            </Col>
            <Col lg={2} md={2}></Col>
          </Row>
          <Row className="show-grid">
            <Col lg={2} md={2}></Col>
            <Col lg={8} md={8}>
              <ul className="nav nav-tabs">
                <li className={this.state.showingStatus == "allitems" ? "active" : ""}><a href="#" onClick={() => this.filterItems("allitems")}>All Events ({this.state.todoItems.length})</a></li>
                <li className={this.state.showingStatus == "incomplete" ? "active" : ""}><a href="#" onClick={() => this.filterItems("incomplete")}>Incomplete ({this.state.todoItems.filter((item) => !item.completed).length})</a></li>
                <li className={this.state.showingStatus == "completed" ? "active" : ""}><a href="#" onClick={() => this.filterItems("completed")}>Completed ({this.state.todoItems.filter((item) => item.completed).length})</a></li>
              </ul>
            </Col>
            <Col lg={2} md={2}></Col>
          </Row>
          <Row className="show-grid">
            <Col lg={2} md={2}></Col>
            <Col lg={8} md={8}>

              <TodoList completeEvent={this.toCompleteEvent} todoItems={filteredItems} delete={this.deleteItem} />
            </Col>
            <Col lg={2} md={2}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
