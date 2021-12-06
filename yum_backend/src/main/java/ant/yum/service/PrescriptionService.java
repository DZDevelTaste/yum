package ant.yum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.PrescriptionRepository;
import ant.yum.vo.PresClinicVo;
import ant.yum.vo.PresDiseaseVo;
import ant.yum.vo.PresMedicineVo;

@Service
public class PrescriptionService {
	
	@Autowired
	private PrescriptionRepository prescriptionRepository;

	public void presMedicineInsert(List<PresMedicineVo> presMedicineList, int lastDiagnosisNo) {
		
		prescriptionRepository.presMedicineInsert(presMedicineList, lastDiagnosisNo);
	}

	public void presDiseaseInsert(List<PresDiseaseVo> presDiseaseList, int lastDiagnosisNo) {

		prescriptionRepository.presDiseaseInsert(presDiseaseList, lastDiagnosisNo);
	}

	public void presClinicInsert(List<PresClinicVo> presClinicList, int lastDiagnosisNo) {

		prescriptionRepository.presClinicInsert(presClinicList, lastDiagnosisNo);
	}

}
