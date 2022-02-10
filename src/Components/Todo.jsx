
import React, { useState } from 'react'
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Trash, Plus } from 'react-bootstrap-icons';
import './Todo.css'



const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [inputData, setInputData] = useState("");

  //Add Todo In List
  const addTodo = () => {
    if (!inputData) {

    } else {
      setTodo([...todo, inputData])
      setInputData('')
    }

  }

  // Delete All Todos
  const deleteAll = () => {
    setTodo([])
    setInputData('')
  }

  /// edit todo
  // const editTodo = (id) =>{
  //   let newEditItem = todo.filter((elem,ind)=>{
  //     return elem.id === id 
  //   })
  //   console.log(newEditItem)
  //   setInputData(newEditItem.val)
  //   console.log(id.val)
   
  // }


  const deleteItem = (id) =>{
    console.log(id)
    const updateItem = todo.filter((elem , ind)=>{
      return ind !== id
    })
    setTodo(updateItem)
  }

  return (
    <div className='List'>

      <Container className='mx-auto'>
        <Row className="mt-5">
          <Col md={7} className="mx-auto">
            <InputGroup>
              <FormControl
                placeholder="Enter Task"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e) => setInputData(e.target.value)}
                value={inputData}
              />

              <Button variant="outline-secondary mx-2" onClick={addTodo} > <Plus size={20} /> </Button>
              <Button variant="outline-secondary" onClick={deleteAll}>
                <Trash />
              </Button>

            </InputGroup>
          </Col>
        </Row>


        <Row className='my-3'>
          {todo.map((val, ind , elem) => {
            return (
              <Col key={ind} md={7} className="mx-auto text-start border-dark border-bottom mt-5 d-flex justify-content-between">
                {val}
                {/* <Button variant="outline-secondary" className='btnn' > <Plus size={20} /> </Button> */}
                <Button variant="outline-secondary" className='btnn btnn-2' onClick={()=> deleteItem(ind)}>
                  <Trash size={20} />
                </Button>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Todo
