package ant.yum.controller.api;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ant.yum.dto.JsonResult;
import ant.yum.service.DiagnosisService;
import ant.yum.service.OrderService;
import ant.yum.service.PatientService;
import ant.yum.service.PrescriptionService;
import ant.yum.vo.DiagnosisVo;
import ant.yum.vo.OrderVo;
import ant.yum.vo.PatientVo;
import ant.yum.vo.PresClinicVo;
import ant.yum.vo.PresDiseaseVo;
import ant.yum.vo.PresMedicineVo;

@RestController
@RequestMapping("/doctor/api")
public class doctorController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private PatientService patientService;

	@Autowired
	private DiagnosisService diagnosisService;

	@Autowired
	private PrescriptionService prescriptionService;

	@GetMapping("")
	public JsonResult doctorMain() {

		/*
		 * 현재 진료 대기중인 환자 리스트 List<OrderVo>를 찾는다
		 * 
		 */
		List<OrderVo> orderList = orderService.findByState();

		return JsonResult.success(orderList);
	}

	@GetMapping("/patientInfo")
	public JsonResult patientInfo(@RequestParam int patientNo) {

		/*
		 * 선택된 환자의 정보(PatientVo)를 찾는다
		 * 
		 */

		PatientVo patient = patientService.findByNo(patientNo);

		return JsonResult.success(patient);
	}

	@GetMapping("/orderLog")
	public JsonResult orderLog(@RequestParam int patientNo) {

		// 선택된 환자의 진료이력(PatientVo)을 반환한다.
		List<OrderVo> orderList = orderService.findByPatientNo(patientNo);
		for (OrderVo OrderList : orderList) {
			System.out.println(OrderList);
		}

		return JsonResult.success(orderList);
	}

	@GetMapping("/updateState")
	public String updateState(@RequestParam int orderNo) {

		// 환자의 상태를 진료 대기중에서 진료중으로 변경
		int orderStateNo_3 = 3;
		orderService.updateState(orderNo, orderStateNo_3);
		System.out.println(orderNo);
		return "redirect:/doctor";
	}

	@PostMapping("/finishDiagnosis")
	public String finishDiagnosis(@RequestBody DiagnosisVo diagnosisVo) {

		OrderVo orderVo = orderService.findByOrderNo(diagnosisVo.getOrderNo());

		// 수납 대기중으로 상태 변경
		orderService.updateState(orderVo);

		// 진료(diagnosis) 데이터 insert
		diagnosisVo.setOrderNo(orderNo);
		DiagnosisVo lastDiagnosis = diagnosisService.insert(diagnosisVo);

		// 마지막 insert된 Diagnosis.no 값
		int lastDiagnosisNo = lastDiagnosis.getNo();

		return "redirect:/doctor";
	}
}
