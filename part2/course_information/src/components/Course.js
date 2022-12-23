const Header = ({ course }) => <h1>{course}</h1>

const Total = ({parts}) => {
  let init = 0; 
  //const exercises = parts.map(part => sum+=part.exercises)
  const sum = parts.reduce(
    (accumulator, part) => accumulator + part.exercises,
    init
  );

  return(
  <p><b>Total of {sum} exercises</b></p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
          <Part key={part.id} part={part} />
    )}
  </>

const Course =  ({ course }) => 
<div>
   <Header course={course.name} />
   <Content parts={course.parts} />
   <Total parts={course.parts} />
</div>

export default Course