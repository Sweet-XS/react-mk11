import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const CharacterEdit = () => {
  const initialFormState = {
    name: '',
    genre: ''
  };
  const [mkCharacter, setMkCharacter] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`api/mk11/character/${id}`)
        .then(response => response.json())
        .then(data => setMkCharacter(data));
    }
  }, [id, setMkCharacter]);

  const handleChange = (event) => {
    const { name, value } = event.target
    setMkCharacter({ ...mkCharacter, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('/api/mk11/character' + (mkCharacter.id ? '/' + mkCharacter.id : ''), {
      method: (mkCharacter.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mkCharacter)
    });
    setMkCharacter(initialFormState)
    navigate('/characters')
  }

  const title = <h2>{mkCharacter.id ? 'Edit Character' : 'Add Character'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={mkCharacter.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="genre">Genre</Label>
            <Input type="text" name="genre" id="genre" value={mkCharacter.genre || ''}
                   onChange={handleChange} autoComplete="genre"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/characters">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default CharacterEdit