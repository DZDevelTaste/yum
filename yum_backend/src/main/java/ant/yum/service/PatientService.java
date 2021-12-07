package ant.yum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.DiagnosisRepository;
import ant.yum.repository.PatientRepository;
import ant.yum.vo.DiagnosisVo;
import ant.yum.vo.PatientVo;

@Service
public class PatientService {

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private DiagnosisRepository diagnosisRepository;

	public PatientVo findInfoAndLogByPatientNo(int patientNo) {

		PatientVo patientVo = patientRepository.findByNo(patientNo);

		List<DiagnosisVo> diagnosisList = diagnosisRepository.findListByPatientNo(patientNo);

		patientVo.setDiagnosisVo(diagnosisList);

		return patientVo;
	}

}
