package ant.yum.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ant.yum.dto.JsonResult;
import ant.yum.service.PatientService;
import ant.yum.vo.OrderVo;

@RestController
@RequestMapping("/api/nurse")
public class NurseController {
    @Autowired
    private PatientService patientService;

    @PostMapping("/order")
    public JsonResult addOrder(@RequestBody OrderVo orderVo){
        /* 환자 접수 Controller Api */
        System.out.println(orderVo);
        // int receptionist = authUser.getNo();
        int receptionist = 5;
        
        orderVo.setUserNo(receptionist);
        patientService.addOrder(orderVo);
        return JsonResult.success(orderVo);
    }


}
