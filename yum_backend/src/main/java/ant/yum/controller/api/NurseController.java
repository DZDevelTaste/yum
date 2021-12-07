package ant.yum.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ant.yum.dto.JsonResult;
import ant.yum.service.OrderService;
import ant.yum.service.PatientService;
import ant.yum.vo.OrderVo;

@RestController
@RequestMapping("/api/nurse")
public class NurseController {
    @Autowired
    private PatientService patientService;

    @Autowired
    private OrderService orderService;

    @GetMapping("")
    public JsonResult main(@RequestParam String date){
        /* Main Controller Api 
            - 접수 환자 리스트: 검색 날짜를 통해 해당 날짜에 접수되어 있는 환자 리스트를 받아옴 */
        System.out.println("request date ======== " + date);   // 받아온 날짜
        List<OrderVo> patientList = orderService.findByOrderPatient(date);
        
        return JsonResult.success(patientList);
    }

    @PostMapping("/order")
    public JsonResult addOrder(@RequestBody OrderVo orderVo){
        /* 환자 접수 */
        // int receptionist = authUser.getNo();     // 접수하는 간호사(로그인한 user)
        int receptionist = 5;   // 임시값
        
        orderVo.setUserNo(receptionist);
        patientService.addOrder(orderVo);
        return JsonResult.success(orderVo);
    }

    @PostMapping("/updateDesc")
	public JsonResult updateDesc(@RequestBody OrderVo orderVo) {
		/* 접수 사유(증상) 바꾸기 */
        orderService.updateDesc(orderVo);
        return JsonResult.success(orderVo);
	}

    @PostMapping("/updateState")
	public JsonResult updateState(@RequestBody OrderVo orderVo) {
		/* 
            환자 진료 현황 바꾸기
            간호사가 처리하는 기본적인 orderState
            1. 1(예약) -> 2(진료대기)1
            2. 2(진료 대기) -> 3(진료중)
            3. 4(수납 대기) -> 5(완료)
        */
        orderService.updateState(orderVo);
        return JsonResult.success(orderVo);
	}
}
