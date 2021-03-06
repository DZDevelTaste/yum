package ant.yum.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ant.yum.repository.DiagnosisRepository;
import ant.yum.repository.OrderRepository;
import ant.yum.repository.PatientRepository;
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
	
	@Autowired
	PatientRepository patientRepository;
	

	public List<OrderVo> findByState() {

		/*
		 * 현재 진료 대기중인 환자 리스트를 반환한다.
		 * 
		 */

		return orderRepository.findByState();
	}

	public List<OrderVo> findByPatientNo(int patientNo) {

		return orderRepository.findByNo(patientNo);
	}

    public List<OrderVo> findByDateAndOrderstateNo(String date, int orderstateNo) {
		if("".equals(date)){
			Date today = new Date();
			// System.out.println("today: " + today); 

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			date = dateFormat.format(today);

			// System.out.println("오늘 날짜: " + date);
		}
        return orderRepository.findByDateAndOrderstateNo(date, orderstateNo);
    }

	public List<OrderVo> findByDate(String date) {
        // System.out.println("reservationList service =====" + date);
		return orderRepository.findByDate(date);
	}

	public OrderVo findByOrderNo(int orderNo) {
		return orderRepository.findByOrderNo(orderNo);
	}
	
	@Transactional
    public void addOrder(OrderVo orderVo) {
		if(orderVo.getDate() == null){
			Date today = new Date();

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String orderDate = dateFormat.format(today);
			orderVo.setDate(orderDate);
		}

		boolean orderCheck = orderRepository.findByPatientNoAndDate(orderVo);
		System.out.println("orderCheck ====" + orderCheck);
		if(!orderCheck){
			return;
		}
		int osn = orderVo.getOrderstateNo();
        int pno = orderVo.getPatientVo().getNo();
        

        if((osn != 1) && (pno == 0)){
            // orderstateNo가 1이 아니고(예약 x, 당일 접수) patient의 no를 받아오지 못했으면 신규 환자이므로 환자 정보를 등록
            patientRepository.addPatient(orderVo.getPatientVo());
        }
        System.err.println("addOrder Service =====================================\n" + orderVo + "\n=====================");
        orderRepository.addOrder(orderVo);
    }

	public void updateState(OrderVo orderVo) {
		orderRepository.updateState(orderVo);
	}

	public void updateDesc(OrderVo orderVo) {
		orderRepository.updateDesc(orderVo);
	}
	
	public void updateDate(OrderVo orderVo) {
		orderRepository.updateDate(orderVo);
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
		Map<String, Object> paymentInfoMap = new HashMap<>();
		
		System.out.println("orderNo:" + orderNo);
		OrderVo orderVo = orderRepository.findByOrderNo(orderNo);
		System.out.println("orderVo: " + orderVo);
		paymentInfoMap.put("orderVo", orderVo);

		DiagnosisVo diagnosisVo = diagnosisRepository.findByOrderNo(orderNo);

		if(diagnosisVo != null) {
			int diagnosisNo = diagnosisVo.getNo();
			List<PresDiseaseVo> presDiseaseList = prescriptionRepository.presDiseaseFindByDiagnosisNo(diagnosisNo);
			List<PresMedicineVo> presMedicineList = prescriptionRepository.presMedicineFindByDiagnosisNo(diagnosisNo);
			List<PresClinicVo> presClinicList = prescriptionRepository.presClinicFindByDiagnosisNo(diagnosisNo);
	
			diagnosisVo.setPresDiseaseList(presDiseaseList);
			diagnosisVo.setPresMedicineList(presMedicineList);
			diagnosisVo.setPresClinicList(presClinicList);
	
			System.out.println("diagnosisVo: " + diagnosisVo);
			paymentInfoMap.put("diagnosisVo", diagnosisVo);
		}

		
		return paymentInfoMap;
	}

	public int deleteOrder(int orderNo) {
		return orderRepository.deleteOrder(orderNo);
	}

	public void receive(OrderVo orderVo) {
		orderRepository.updateOrder(orderVo);
	}

}
