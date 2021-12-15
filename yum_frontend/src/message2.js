
import React, {useRef} from 'react'; 
import SockJsClient from 'react-stomp';

function Messages1 () { 
    const $websocket = useRef(null); 

    
    return ( 
        <div> 
            <SockJsClient url="http://localhost:8080/yum" 
                    topics={['/topic/sendTo', '/topic/template', '/topic/api2']}
                    onMessage={msg => { console.log (msg); }} 
                    ref={$websocket} /> 
                <div>
                    message2
                </div>
        </div> 
    );
} 

export default Messages1;