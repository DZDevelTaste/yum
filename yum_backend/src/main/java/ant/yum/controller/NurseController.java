package ant.yum.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

@CrossOrigin
@RestController
@RequestMapping("/api/nurse")
public class NurseController {
    @Autowired
    private PatientService patientService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/order")
    public JsonResult addOrder(@RequestBody OrderVo orderVo){
        /* ȯ�� ����/���� */
        // int receptionist = authUser.getNo();     // �����ϴ� ��ȣ��(�α����� user)
        int receptionist = 5;   // �ӽð�
        orderVo.setUserNo(receptionist);
        
        System.out.println("����� ���Դ� ==== " + orderVo);
        orderService.addOrder(orderVo);
        
        return JsonResult.success(orderVo);
    }

    @GetMapping("/orderList")
    public JsonResult orderList(@RequestParam(name="date", required=true, defaultValue="") String date, @RequestParam(name="osn", required=true, defaultValue="0") int orderstateNo){
        /*  
            ���� ȯ�� ����Ʈ: �ش� ��¥�� �����Ǿ� �ִ� ȯ�� ����Ʈ�� �޾ƿ�
            - date: �˻��ϴ� ��¥
            - osn(orderstateNo): ���� ��Ȳ �� ȯ�� ����Ʈ�� �޾ƿ��� ����. default�� 0�̸� 0�� ��� ��ü ����Ʈ ��� */
        
        List<OrderVo> patientList = orderService.findByDateAndOrderstateNo(date, orderstateNo);
        // System.out.println("date" + date + "orderstateNo: " + orderstateNo);
        return JsonResult.success(patientList);
    }

    @GetMapping("/reservationList")
    public JsonResult reservationList(@RequestParam(name="date", required=true, defaultValue="") String date){
        /*  
            ���� ȯ�� ����Ʈ: �ش� ��¥�� �����Ǿ� �ִ� ȯ�� ����Ʈ�� �޾ƿ�
            - date: �˻��ϴ� ��¥ */
        
        // System.out.println("reservationList controller =====" + date);
        List<OrderVo> patientList = orderService.findByDate(date);

        // System.out.println(patientList);
        return JsonResult.success(patientList);
    }

     
    @GetMapping("/reservation/{orderNo}")
    public JsonResult reservation(@PathVariable int orderNo) {
        /* ���� ���� �������� */
        OrderVo orderVo = orderService.findByOrderNo(orderNo);
        return JsonResult.success(orderVo);
    }

    // @PostMapping("/reservation")
    // public JsonResult addReservation(@RequestBody OrderVo orderVo){
    //     /* ���� ���� - ���� �̷��� �ִ� ȯ��(����� �Ǿ��ִ� ȯ��)�� ���� ���� */
    //     // int receptionist = authUser.getNo();     // �����ϴ� ��ȣ��(�α����� user)
    //     int receptionist = 5;   // �ӽð�
    //     orderVo.setUserNo(receptionist);
        
    //     patientService.addReservation(orderVo);
        
    //     return JsonResult.success(orderVo);
    // }

    @PutMapping("/updateDesc")
	public JsonResult updateDesc(@RequestBody OrderVo orderVo) {
		/* ���� ����(����) �ٲٱ� */
        orderService.updateDesc(orderVo);
        return JsonResult.success(orderVo);
	}

    @PutMapping("/updateState")
	public JsonResult updateState(@RequestBody OrderVo orderVo) {
		/* 
            ȯ�� ���� ��Ȳ �ٲٱ�
            ��ȣ�簡 ó���ϴ� �⺻���� orderState
            1. 1(����) -> 2(������)1
            2. 2(���� ���) -> 3(������)
            3. 4(���� ���) -> 5(�Ϸ�)
        */

        // System.out.println(orderVo);
        orderService.updateState(orderVo);
        return JsonResult.success(orderVo);
	}

    @PostMapping("/updateDate")
    public JsonResult updateDate(@RequestBody OrderVo orderVo) {
        /* ���� �ð� ���� */
        orderService.updateDate(orderVo);
        return JsonResult.success(orderVo);
    }

    @GetMapping("/payment/{orderNo}")
    public JsonResult payment(@PathVariable int orderNo){
        /* 
            ���� ���� ��������
            [�������� ����]
            1. patient - �����ϴ� ȯ�� ����(�̸�, ����, �ֹε�Ϲ�ȣ, ����ó)
            2. diagnosis - ���� ����(������, �����, ���� �޸�)
            3. prescription_d - ����(����Ʈ)
            4. prescription_m/c - ó�� ����(��ǰ(m)/��ǰ��(c) ����Ʈ)
            5. order - ���� �ݾ�
        */
        Map<String,Object> paymentInfoMap = orderService.paymentInfo(orderNo);
        return JsonResult.success(paymentInfoMap);
    }

    @PutMapping("/receive")
    public JsonResult receive(@RequestBody OrderVo orderVo){
        /* 
            ���� �� order ������Ʈ
        */
        orderService.receive(orderVo);
        return JsonResult.success(orderVo);
    }
    
    @GetMapping("/patientInfo/{no}")
    public JsonResult patientInfo(@PathVariable(value="no") int patientNo){
        // System.out.println("api patientNo: " + patientNo);
        Map<String,Object> patientInfoMap = patientService.patientInfo(patientNo);
        return JsonResult.success(patientInfoMap);
    }

    @DeleteMapping("/deleteOrder/{orderNo}")
    public JsonResult deleteOrder(@PathVariable int orderNo){
        /* 
            ���� �� ���� ���
            - ���� ��Ҵ� ����(orderstateNo == 1) �Ǵ� ���� ���(orderstateNo == 2)�� ���¿����� ����
            - ���� �Ǵ� ���� ��Ⱑ �ƴϰų� ������� ���� ��쿡�� false ��ȯ
        */
        int check = orderService.deleteOrder(orderNo);
        
        return JsonResult.success(check != 0);
    }

    @GetMapping("/patientList")
    public JsonResult patientList() {
        /* ȯ�� ����Ʈ ��� */
        List<PatientVo> patientList = patientService.findByAll();
        return JsonResult.success(patientList);
    }

    @PutMapping("/updatePatientInfo")
    public JsonResult updatePatientInfo(@RequestBody PatientVo patientVo) {
        /* ȯ�� ���� ������Ʈ */
        patientService.updatePatientInfo(patientVo);
        return JsonResult.success(patientVo);
    }
    
}
