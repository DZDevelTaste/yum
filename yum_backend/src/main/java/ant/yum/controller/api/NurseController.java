package ant.yum.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ant.yum.dto.JsonResult;
import ant.yum.service.OrderService;
import ant.yum.service.PatientService;
import ant.yum.vo.OrderVo;
import ant.yum.vo.PatientVo;

@RestController
@RequestMapping("/api/nurse")
public class NurseController {
    @Autowired
    private PatientService patientService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/order")
    public JsonResult addOrder(@RequestBody OrderVo orderVo){
        /* 환자 접수/예약 */
        // int receptionist = authUser.getNo();     // 접수하는 간호사(로그인한 user)
        int receptionist = 5;   // 임시값
        orderVo.setUserNo(receptionist);
        
        // System.out.println("제대로 들어왔니 ==== " + orderVo);
        orderService.addOrder(orderVo);
        
        return JsonResult.success(orderVo);
    }

    @GetMapping("/orderList")
    public JsonResult orderList(@RequestParam(name="date", required=true, defaultValue="") String date, @RequestParam(name="osn", required=true, defaultValue="0") int orderstateNo){
        /*  
            접수/예약 환자 리스트: 해당 날짜에 접수되어 있는 환자 리스트를 받아옴
            - date: 검색하는 날짜
            - osn(orderstateNo): 진료 현황 별 환자 리스트를 받아오기 위함. default로 0이며 0일 경우 전체 리스트 출력 */
        List<OrderVo> patientList = orderService.findByDateAndOrderstateNo(date, orderstateNo);
        
        return JsonResult.success(patientList);
    }

    // @PostMapping("/reservation")
    // public JsonResult addReservation(@RequestBody OrderVo orderVo){
    //     /* 예약 접수 - 내원 이력이 있는 환자(등록이 되어있는 환자)만 예약 가능 */
    //     // int receptionist = authUser.getNo();     // 접수하는 간호사(로그인한 user)
    //     int receptionist = 5;   // 임시값
    //     orderVo.setUserNo(receptionist);
        
    //     patientService.addReservation(orderVo);
        
    //     return JsonResult.success(orderVo);
    // }

    @PostMapping("/updateDesc")
	public JsonResult updateDesc(@RequestBody OrderVo orderVo) {
		/* 접수 사유(증상) 바꾸기 */
        orderService.updateDesc(orderVo);
        return JsonResult.success(orderVo);
	}

    @PutMapping("/updateState")
	public JsonResult updateState(@RequestBody OrderVo orderVo) {
		/* 
            환자 진료 현황 바꾸기
            간호사가 처리하는 기본적인 orderState
            1. 1(예약) -> 2(진료대기)1
            2. 2(진료 대기) -> 3(진료중)
            3. 4(수납 대기) -> 5(완료)
        */

        System.out.println(orderVo);
        orderService.updateState(orderVo);
        return JsonResult.success(orderVo);
	}

    @PostMapping("/updateDate")
    public JsonResult updateDate(@RequestBody OrderVo orderVo) {
        /* 예약 시간 변경 */
        orderService.updateDate(orderVo);
        return JsonResult.success(orderVo);
    }

    @GetMapping("/payment/{orderNo}")
    public JsonResult payment(@PathVariable int orderNo){
        /* 
            수납 정보 가져오기
            [가져오는 정보]
            1. patient - 수납하는 환자 정보(이름, 성별, 주민등록번호, 연락처)
            2. diagnosis - 진료 내역(내원일, 담당의, 진료 메모)
            3. prescription_d - 병명(리스트)
            4. prescription_m/c - 처방 내역(약품(m)/약품외(c) 리스트)
            5. order - 수납 금액
        */
        Map<String,Object> paymentInfoMap = orderService.paymentInfo(orderNo);
        return JsonResult.success(paymentInfoMap);
    }
    
    @GetMapping("/patientInfo/{no}")
    public JsonResult patientInfo(@PathVariable(value="no") int patientNo){
        // System.out.println("api patientNo: " + patientNo);
        Map<String,Object> patientInfoMap = patientService.patientInfo(patientNo);
        return JsonResult.success(patientInfoMap);
    }

    @PostMapping("/deleteOrder/{orderNo}")
    public JsonResult deleteOrder(@PathVariable int orderNo){
        /* 
            접수 및 예약 취소
            - 접수 취소는 예약(orderstateNo == 1) 또는 접수 대기(orderstateNo == 2)인 상태에서만 가능
            - 예약 또는 접수 대기가 아니거나 취소하지 못한 경우에는 false 반환
        */
        int check = orderService.deleteOrder(orderNo);
        
        return JsonResult.success(check != 0);
    }

    @GetMapping("/patientList")
    public JsonResult patientList() {
        /* 환자 리스트 출력 */
        List<PatientVo> patientList = patientService.findByAll();
        return JsonResult.success(patientList);
    }

    @PutMapping("/updatePatientInfo")
    public JsonResult updatePatientInfo(@RequestBody PatientVo patientVo) {
        /* 환자 정보 업데이트 */
        patientService.updatePatientInfo(patientVo);
        return JsonResult.success(patientVo);
    }
    
}
