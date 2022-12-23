import { useState ,  useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Person = ({person,deleteClick}) => {
  return (
    <li>{person.name} {person.number} 
    <Button handleClick={deleteClick} text='delete'></Button>
    </li>
  )
}

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    let contains = persons.some( person => person.name === newName)
    
    if(contains){
      alert(`${newName} is already added to phonebook`);
    }else{

      // axios
      // .post('http://localhost:3001/persons', personObject)
      // .then(response => {
      // console.log(response)
      // setPersons(persons.concat(response.data))
      // setNewName('')
      // setNewNumber('')
      // })

      personService
        .create(personObject)
        .then(createdPerson => {
          console.log(createdPerson)
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
      
    } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input
           value={newName}
           onChange={handleNameChange}
           />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const handleDeleteClick = ({person,setPersons,persons}) => {

  if(window.confirm(`Delete ${person.name} ?`)){
    let deletedPerson = person
    axios
    .delete(`http://localhost:3001/persons/${deletedPerson.id}`)
    .then(setPersons( persons.filter(person => person.id !== deletedPerson.id)))
    
  }
  
}


const Persons = ({persons,setPersons}) => {
  return(
    <ul>
        {persons.map(person => 
          <Person key={person.name} person={person}
          deleteClick = {() => handleDeleteClick({person:person,setPersons:setPersons,persons:persons})}/>
        )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    // console.log('effect')
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
    personService
      .getAll()
      .then(initialPersons=>{
        setPersons(initialPersons)
      })
  }, [])
  //console.log('render', persons.length, 'persons')

  
  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add a new person</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
      
    </div>
  )
}

export default App