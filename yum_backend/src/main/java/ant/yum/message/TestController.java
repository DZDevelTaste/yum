package ant.yum.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ant.yum.vo.MessageVo2;

@CrossOrigin
@RestController
@RequestMapping("/message")
public class TestController {

    @Autowired
    private SimpMessagingTemplate webSocket;

    // 응답
    @MessageMapping("/sendTo") // Client Websocket에 메시지 전달
    @SendTo("/topic/sendTo")
    public String SendToMessage() throws Exception {
        return "SendTo";
    }

    @MessageMapping("/template")
    public void SendTemplateMessage() {
        webSocket.convertAndSend("/topic/template", "Template");
    }

    @RequestMapping(value = "/api")
    public void SendAPI(@RequestBody MessageVo2 msg) {
        webSocket.convertAndSend("/topic/nurse", msg);
    }

    @RequestMapping(value = "/api2")
    public void SendAPI2(@RequestBody MessageVo2 msg) {
        webSocket.convertAndSend("/topic/doctor", msg);
    }

    @RequestMapping(value = "/toNurse")
    public void SendToNurse(@RequestBody MessageVo2 msg) {
        webSocket.convertAndSend("/topic/nurse", msg);
    }
}
