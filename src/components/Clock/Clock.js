import { useState, useEffect } from 'react';
import './Clock.css';

const Clock = ({ temperature, humidity }) => {

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [dateString, setDateString] = useState('initialState')
    
    const days = [
        'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ]
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    useEffect(() => {
        const updateTime = setInterval(() => {
            let date = new Date()
            setTime(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
            setDateString(`${days[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`)
        }, 1000);
        return () => clearInterval(updateTime);
    });
    
    return (
        <div className="Clock">
            <div className="clockGroup">
                <p className="clockTime">{time}</p>
                <p className="clockTemperature">Temp. {temperature}°C<br/> Hum. {humidity}%</p>
            </div>
            <p className="clockDate">{dateString}</p>
        </div>
    );
}

export default Clock;
