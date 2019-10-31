import React from 'react';
import Card from 'react-bootstrap/Card'

async function test() {
  const data = await fetch("/api/course")
  // const myJson = await data.json();
  console.log(data);
}
test()

function HomeDisplay(){

    return(
           <Card>
             <Card.Header><h1>TEST</h1></Card.Header>
             <Card.Body>
               <Card.Text>
                 Hello!
               </Card.Text>
             </Card.Body>
           </Card>
           );
}

export default HomeDisplay;
