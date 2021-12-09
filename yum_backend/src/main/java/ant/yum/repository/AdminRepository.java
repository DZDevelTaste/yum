package ant.yum.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.DiseaseVo;
import ant.yum.vo.MedicineVo;
import ant.yum.vo.UserVo;

@Repository
public class AdminRepository {
	@Autowired
	private SqlSession sqlSession;
	
	public List<UserVo> findByAll() {
		return sqlSession.selectList("main.findByAll");
	}
	public List<DiseaseVo> findByDisease() {
		return sqlSession.selectList("disease.findByDisease");
	}
	public List<MedicineVo> findByMedicine() {
		return sqlSession.selectList("medicine.findByMedicine");
	}
	public boolean deleteByNo(UserVo userVo) {
		int count = sqlSession.delete("main.deleteByNo", userVo);
		return count == 1;
	}
	public boolean updateAuth(UserVo userVo) {
		int count = sqlSession.update("main.updateAuth", userVo);
		return count == 1;
	}
	public boolean updateMedicine(MedicineVo medicineVo) {
		int count = sqlSession.update("medicine.updateMedicine", medicineVo);
		return count == 1;
	}
	public boolean addDisease(DiseaseVo diseaseVo) {
		return sqlSession.selectOne("disease.addDisease", diseaseVo);
	}
	public boolean addMedicine(MedicineVo medicineVo) {
		return sqlSession.selectOne("medicine.addMedicine", medicineVo);
	}
    
	
	

	

}
