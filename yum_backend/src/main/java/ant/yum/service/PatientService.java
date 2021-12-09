package ant.yum.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.DiagnosisRepository;
import ant.yum.repository.PatientRepository;
import ant.yum.repository.PrescriptionRepository;
import ant.yum.vo.DiagnosisVo;
import ant.yum.vo.PatientVo;

@Service
public class PatientService {

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private DiagnosisRepository diagnosisRepository;

	@Autowired
	private PrescriptionRepository prescriptionRepository;

	public Map<String, Object> patientInfo(int patientNo) {
		// System.out.println("service patientNo : " + patientNo);
		PatientVo patientVo = patientRepository.findByNo(patientNo);
		List<DiagnosisVo> diagnosisList = diagnosisRepository.findByNo(patientNo);

		// 각 진료에 따른 처방 내역 set
		for (int i = 0; i < diagnosisList.size(); i++) {
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

}
