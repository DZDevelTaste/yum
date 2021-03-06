package ant.yum.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.PresClinicVo;
import ant.yum.vo.PresDiseaseVo;
import ant.yum.vo.PresMedicineVo;
import ant.yum.vo.PresVo;

@Repository
public class PrescriptionRepository {

	@Autowired
	private SqlSession sqlSession;

	public void presMedicineInsert(List<PresMedicineVo> presMedicineList, int lastDiagnosisNo) {

		for (PresMedicineVo presmedicineList : presMedicineList) {

			Map<String, Object> map = new HashMap<>();

			map.put("diagnosisNo", lastDiagnosisNo);
			map.put("medicineNo", presmedicineList.getMedicineNo());
			map.put("presmedicineCount", presmedicineList.getPresmedicineCount());
			map.put("presmedicineDay", presmedicineList.getPresmedicineDay());

			sqlSession.insert("prescription.presMedicineInsert", map);
		}
	}

	public void presDiseaseInsert(List<PresDiseaseVo> presDiseaseList, int lastDiagnosisNo) {

		for (PresDiseaseVo presdiseaseList : presDiseaseList) {

			Map<String, Object> map = new HashMap<>();

			map.put("diagnosisNo", lastDiagnosisNo);
			map.put("diseaseNo", presdiseaseList.getDiseaseNo());
			sqlSession.insert("prescription.presDiseaseInsert", map);
		}
	}

	public void presClinicInsert(List<PresClinicVo> presClinicList, int lastDiagnosisNo) {

		for (PresClinicVo presclinicList : presClinicList) {

			Map<String, Object> map = new HashMap<>();

			map.put("diagnosisNo", lastDiagnosisNo);
			map.put("clinicNo", presclinicList.getClinicNo());

			sqlSession.insert("prescription.presClinicInsert", map);
		}
	}

	public List<PresDiseaseVo> presDiseaseFindByDiagnosisNo(int diagnosisNo) {
		return sqlSession.selectList("prescription.presDiseaseFindByDiagnosisNo", diagnosisNo);
	}

	public List<PresMedicineVo> presMedicineFindByDiagnosisNo(int diagnosisNo) {
		return sqlSession.selectList("prescription.presMedicineFindByDiagnosisNo", diagnosisNo);
	}

	public List<PresClinicVo> presClinicFindByDiagnosisNo(int diagnosisNo) {
		return sqlSession.selectList("prescription.presClinicFindByDiagnosisNo", diagnosisNo);
	}

	public List<PresVo> findPrescription() {
		return sqlSession.selectList("prescription.findPrescription");
	}
}