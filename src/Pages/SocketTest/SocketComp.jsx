import { io } from 'socket.io-client';
import { Button } from '@mui/material';

const socket = io.connect("http://localhost:501");
const sampleData = {message: 'Hello', name: 'Nithi', code: '200', config: {name: 'Name2', code: '400'}, request: 'Socket request'}
const SocketComp = () => {
    socket.on('server_message', (message) => {
        console.log("Message from server:", message);
    });
    const handleEmit = () =>{
        socket.emit('client_message', sampleData , (response)=>{
            console.log(response);
        });
    }
    return (
        <div>SocketComp
            <Button onClick={handleEmit}>Emit Data</Button>
        </div>
    )
}

export default SocketComp