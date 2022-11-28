import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const GroupList = () => {

    const [mkCharacters, setMkCharacters] = useState([])
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)

    fetch('api/mk11/characters')
      .then(response => response.json())
      .then(data => {
        setMkCharacters(data)
        setLoading(false)
      })
  }, []);

  const remove = async (id) => {
    await fetch(`api/mk11/character/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedMkCharacters = [...mkCharacters].filter(i => i.id !== id)
      setMkCharacters(updatedMkCharacters)
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const characterList = mkCharacters.map(mkCharacter => {
    return <tr key={mkCharacter.id}>
      <td style={{whiteSpace: 'nowrap'}}>{mkCharacter.name}</td>
      <td>{mkCharacter.genre}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/characters/" + mkCharacter.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(mkCharacter.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/characters/new">Add Character</Button>
        </div>
        <h3>My JUG Tour</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="20%">Genre</th>
          </tr>
          </thead>
          <tbody>
          {characterList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default GroupList;