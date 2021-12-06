package ant.yum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.PatientRepository;
import ant.yum.vo.PatientVo;

@Service
public class PatientService {
	
	@Autowired
	private PatientRepository patientRepository;

	public PatientVo findByNo(int patientNo) {
		System.out.println("service " + patientNo);
		return patientRepository.findByNo(patientNo);
	}

}
