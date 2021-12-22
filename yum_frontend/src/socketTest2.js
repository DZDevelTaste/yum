import React, { useEffect, useState, useRef } from "react";
import SockJs from 'sockjs-client';
import stompJs from '@stomp/stompjs';

const SocketTest = () => {

  const client = new stompJs.Client({
    brokerURL: 'ws//locahost:8080',
    connectHeaders: {
      login: 'user',
      passcode: 'password'
    },
    debug: function(str){
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  });

  return (
    <div></div>
  );
};

export default SocketTest;