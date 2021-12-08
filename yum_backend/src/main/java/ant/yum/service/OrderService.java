package ant.yum.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.DiagnosisRepository;
import ant.yum.repository.OrderRepository;
import ant.yum.repository.PrescriptionRepository;
import ant.yum.vo.DiagnosisVo;
import ant.yum.vo.OrderVo;
import ant.yum.vo.PresClinicVo;
import ant.yum.vo.PresDiseaseVo;
import ant.yum.vo.PresMedicineVo;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private DiagnosisRepository diagnosisRepository;
	
	@Autowired
	PrescriptionRepository prescriptionRepository;

	public List<OrderVo> findByState() {
		
		/*
		 * 현재 진료 대기중인 환자 리스트를 반환한다.
		 * 
		 * */
		return orderRepository.findByState();
	}

	public List<OrderVo> findByNo(int patientNo) {
		
		return orderRepository.findByNo(patientNo);
	}

    public List<OrderVo> findByDateAndOrderstateNo(String date, int orderstateNo) {
        return orderRepository.findByDateAndOrderstateNo(date, orderstateNo);
    }

	public void updateState(int orderNo, int orderStateNo) {
		
		orderRepository.updateState(orderNo, orderStateNo);
	}

	public void updateState(OrderVo orderVo) {
		orderRepository.updateState(orderVo);
	}

	public void updateDesc(OrderVo orderVo) {
		orderRepository.updateDesc(orderVo);
	}

	public Map<String, Object> paymentInfo(int orderNo) {
		/* 
			1. 접수 정보/환자 정보
				OrderVo
					- PatientVo
			2. 진료 정보/처방 정보
				DiagnosisVo
					- List<PresDiseaseVo> presDiseaseList
					- List<PresMedicineVo> presMedicineList
					- List<PresClinicVo> presClinicList
		*/
		OrderVo orderVo = orderRepository.findByOrderNo(orderNo);
		DiagnosisVo diagnosisVo = diagnosisRepository.findByOrderNo(orderNo);
		List<PresDiseaseVo> presDiseaseList = prescriptionRepository.presDiseaseFindByOrderNo(orderNo);
		List<PresMedicineVo> presMedicineList = prescriptionRepository.presMedicineFindByOrderNo(orderNo);
		List<PresClinicVo> presClinicList = prescriptionRepository.presClinicFindByOrderNo(orderNo);

		diagnosisVo.setPresDiseaseList(presDiseaseList);
		diagnosisVo.setPresMedicineList(presMedicineList);
		diagnosisVo.setPresClinicList(presClinicList);

		Map<String, Object> paymentInfoMap = new HashMap<>();
		paymentInfoMap.put("orderVo", orderVo);
		paymentInfoMap.put("diagnosisVo", diagnosisVo);
		return paymentInfoMap;
	}

}
