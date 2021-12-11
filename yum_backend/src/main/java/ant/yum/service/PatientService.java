package ant.yum.service;

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
import ant.yum.vo.PatientVo;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DiagnosisRepository diagnosisRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    public PatientVo findByNo(int patientNo) {
        // System.out.println("service " + patientNo);
        return patientRepository.findByNo(patientNo);
    }
    
    @Transactional
    public void addOrder(OrderVo orderVo) {
        int osn = orderVo.getOrderstateNo();
        int pno = orderVo.getPatientVo().getNo();
        
        if((osn != 1) && (pno == 0)){
            // orderstateNo가 1이 아니고(예약 x, 당일 접수) patient의 no를 받아오지 못했으면 신규 환자이므로 환자 정보를 등록
            patientRepository.addPatient(orderVo.getPatientVo());
        } else if((osn == 1) && (pno == 0)) {
            // 내원 이력이 없는 환자(환자 등록이 안 되어 있는 사람)는 예약 불가
            return;
        }
        
        orderRepository.addOrder(orderVo);
    }
    
    // public void addReservation(OrderVo orderVo) {
    //     if(orderVo.getPatientVo().getNo() == 0) {
    //         return;
    //     }
    //     orderRepository.addReservation(orderVo);
    // }

    public Map<String, Object> patientInfo(int patientNo) {
        // System.out.println("service patientNo : " + patientNo);
        PatientVo patientVo = patientRepository.findByNo(patientNo);
		List<DiagnosisVo> diagnosisList = diagnosisRepository.findByNo(patientNo);
        /* for(DiagnosisVo diagnosisVo : diagnosisList) {
            int DiagnosisNo = diagnosisVo.getNo();
            List<PresDiseaseVo> presDiseaseList = prescriptionRepository.presDiseaseFindByDiagnosisNo(DiagnosisNo);
            List<PresMedicineVo> presMedicineList = prescriptionRepository.presMedicineFindByDiagnosisNo(DiagnosisNo);
            List<PresClinicVo> presClinicList = prescriptionRepository.presClinicFindByDiagnosisNo(DiagnosisNo);
            
            diagnosisVo.setPresDiseaseList(presDiseaseList);
            diagnosisVo.setPresMedicineList(presMedicineList);
            diagnosisVo.setPresClinicList(presClinicList);
        } */
        
        // 각 진료에 따른 처방 내역 set
        for(int i=0; i<diagnosisList.size(); i++){
            int DiagnosisNo = diagnosisList.get(i).getNo();
            diagnosisList.get(i).setPresDiseaseList(prescriptionRepository.presDiseaseFindByDiagnosisNo(DiagnosisNo));
            diagnosisList.get(i).setPresMedicineList(prescriptionRepository.presMedicineFindByDiagnosisNo(DiagnosisNo));
            diagnosisList.get(i).setPresClinicList(prescriptionRepository.presClinicFindByDiagnosisNo(DiagnosisNo));
        }

        // System.out.println("[patient Info]\n" + patientVo);
		Map<String, Object> patientInfoMap = new HashMap<>();
		patientInfoMap.put("patientVo", patientVo);
		patientInfoMap.put("diagnosisList", diagnosisList);

        return patientInfoMap;
    }

    public List<PatientVo> findByAll() {
        return patientRepository.findByAll();
    }

    public void updatePatientInfo(PatientVo patientVo) {
        patientRepository.updatePatientInfo(patientVo);
    }


}
