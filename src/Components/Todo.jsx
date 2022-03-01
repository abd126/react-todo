
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Trash, Plus } from 'react-bootstrap-icons';
import { db } from '../Config/Firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from 'firebase/firestore';
import './Todo.css'



const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [inputData, setInputData] = useState("");
  const [refresh , setRefresh] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async ()=>{
    const dbRef = collection(db,"Todos")
    const querySnapshot = await getDocs(dbRef)
    let getTodo = [];
    querySnapshot.forEach((doc) => {
      getTodo.push({key:doc.id,todo:doc.data().todo})
    });
    setTodo(getTodo);
    
  },[refresh])





  //Add Todo In List
  const addTodo = async () => {
    if (!inputData) {
      alert("Enter Todo First")
    } else {
      const dbRef = collection(db,"Todos")
      try{
        const addData = await addDoc(dbRef, {
          todo : inputData
        })
        setRefresh(!refresh)
        // console.log(addData)
      }catch(error){
        console.log(error)
      }
      setTodo([...todo, inputData])
      setInputData('')
    }

  }

  // Delete All Todos
  const deleteAll = async () => {
 

    setTodo([])
    setInputData('')
  }

  /// edit todo
  const editTodo =async (key) =>{
      const data = prompt()
      const dbRef = doc(db,"Todos",key)
      const editData = await updateDoc(dbRef , {
        todo : data
      })
      setRefresh(!refresh)

  }


  const deleteItem =async (key) => {
    // console.log(id)
    // const updateItem = todo.filter((elem, ind) => {
    //   return ind !== id
    // })
    // setTodo(updateItem)
    const dbRef = doc(db,"Todos",key)
    const deletData = await deleteDoc(dbRef)
    setRefresh(!refresh)
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
          {todo.map((val, ind, elem) => {
            return (
              <Col key={ind} md={7} className="mx-auto text-start border-dark border-bottom mt-5 d-flex justify-content-between">
                {val.todo}
                <Button variant="outline-secondary" className='btnn' > <Plus size={20}  onClick={() =>editTodo(val.key)}/> </Button>
                <Button variant="outline-secondary" className='btnn btnn-2' onClick={() => deleteItem(val.key)}>
                  <Trash size={20} />
                </Button>
              </Col>

              // <div key={ind}>
              //   <li>{val.todo}</li>
              // </div>

            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Todo
