import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import NoteBox from './components/NoteBox/NoteBox';
import Clock from './components/Clock/Clock';
import { NoteProvider } from './NoteContext';
import './App.css';

const socket = io.connect('http://192.168.1.16:3000');

function App() {
  const [background, setBackground] = useState('https://images.hdqwalls.com/wallpapers/milky-way-astro-photography.jpg');
  const [lectures, setLectures] = useState({ temperature: 0, humidity: 0 });
  const [notes, setNotes] = useState([]);

  /* const fetchNotes = async () => {

    const resp = await fetch('http://35.232.34.239:80/api/notes');
    const json = await resp.json();
    const fetchedNotes = json.data.map(note => ({ id: note['_id']['$oid'], title: note.title, description: note.descrition }));
    setNotes(fetchedNotes);
  }; */

  useEffect(() => {
    //fetchNotes();

    socket.on('new note', (note) => {
      setNotes(notes => [note, ...notes]);
    });

    socket.on('note deleted', noteId => {
      setNotes(notes => notes.filter(note => note.id !== noteId))
    });

    socket.on('temperature', ({ temperature, humidity }) => {
      setLectures({ temperature, humidity })
      console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}%`);
    });
    
    socket.on('present image', imageUrl => {
      setBackground(imageUrl);
    });

    socket.on('distance', ({ distance }) => {
      console.log(distance.toFixed(2));
      if (distance < 15) {

      } else if (distance >= 15 && distance < 30) {

      } else {

      }
    })

    return () => socket.disconnect()
  }, [])

  return (
    <NoteProvider>
      <div className="App" style={{ backgroundImage: `url(${background})` }}>
        <div className="NoteStack">
          {notes.map(note => <NoteBox
              key={note.id}
              title={note.title}
              description={note.description} />)}
        </div>
        <Clock {...lectures}/>
      </div>
    </NoteProvider>
  );
}

export default App;