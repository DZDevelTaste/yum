package ant.yum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.DiagnosisRepository;
import ant.yum.vo.DiagnosisVo;

@Service
public class DiagnosisService {

	@Autowired
	private DiagnosisRepository diagnosisRepository;

	public DiagnosisVo insert(DiagnosisVo diagnosisVo) {

		return diagnosisRepository.insert(diagnosisVo);

	}
}
