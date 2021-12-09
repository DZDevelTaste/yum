package ant.yum.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

@CrossOrigin
@RestController
@RequestMapping("/api/doctor")
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

	@GetMapping("/patientInfo/{patientNo}")
	public JsonResult patientInfo(@PathVariable int patientNo) {

		/*
		 * 선택된 환자의 정보(PatientVo)를 찾는다
		 * 
		 */
		PatientVo patient = patientService.findInfoAndLogByPatientNo(patientNo);

		return JsonResult.success(patient);
	}

	@GetMapping("/orderLog")
	public JsonResult orderLog(@RequestParam int patientNo) {

		// 선택된 환자의 진료이력(PatientVo)을 반환한다.
		List<DiagnosisVo> diagnosisList = diagnosisService.findListByPatientNo(patientNo);

		return JsonResult.success(diagnosisList);
	}

	@GetMapping("/updateState")
	public void updateState(@RequestBody OrderVo orderVo) {

		// 환자의 상태를 진료 대기중에서 진료중으로 변경
		orderService.updateState(orderVo);
	}

	@PostMapping("/finishDiagnosis")
	public void finishDiagnosis(@RequestBody DiagnosisVo diagnosisVo) {

		OrderVo orderVo = orderService.findByOrderNo(diagnosisVo.getOrderNo());

		// 1. 해당 진료를 수납 대기중으로 상태 변경
		orderService.updateState(orderVo);
		// 진료비도 업데이트 해야함, 클리닉 발생 시 2000 추가!

		// 2. 진료(diagnosis) 데이터 insert
		DiagnosisVo lastDiagnosis = diagnosisService.insert(diagnosisVo);

		// 마지막 insert된 Diagnosis.no 값
		int lastDiagnosisNo = lastDiagnosis.getNo();

		// 3. 처방 기록 데이터 insert

		// 병명 진단(prescription_d) insert
		prescriptionService.presDiseaseInsert(diagnosisVo.getPresDiseaseList(), lastDiagnosisNo);

		// 약품 처방(prescription_m) insert
		prescriptionService.presMedicineInsert(diagnosisVo.getPresMedicineList(), lastDiagnosisNo);

		// 클리닉 처방(prescription_c) insert
		prescriptionService.presClinicInsert(diagnosisVo.getPresClinicList(), lastDiagnosisNo);
	}
}
