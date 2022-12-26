import { useState ,  useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='addNumber'>
      {message}
    </div>
  )
}

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

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setAddMessage}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    let contains = persons.some( person => person.name === newName)
    
      personService
        .create(personObject)
        .then(createdPerson => {
          console.log(createdPerson)
          if(!contains){
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
            setAddMessage(
              `${personObject.name} was added to the phonebook`
            )
            setTimeout(() => {
              setAddMessage(null)
            }, 5000)
          }else{
            const updatedPersons = persons.map(person => {
              if(person.name === createdPerson.name){
                return{
                  ...person,
                  number: createdPerson.number
                }
              } else return person   
          })
            setPersons(updatedPersons)
          }
        })   
     
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
    .delete(`/api/persons/${deletedPerson.id}`)
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
  const [addMessage, setAddMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons=>{
        setPersons(initialPersons)
      })
  }, [])


  
  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add a new person</h2>
      <Notification message={addMessage} />
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setAddMessage={setAddMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
      
    </div>
  )
}

export default App