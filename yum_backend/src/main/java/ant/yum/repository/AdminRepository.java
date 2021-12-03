package ant.yum.repository;

import java.util.List;

import javax.validation.Valid;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.DiseaseVo;
import ant.yum.vo.MedicineVo;

@Repository
public class AdminRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<Object> findByAll() {
		return sqlSession.selectList("main.findByAll");
	}
	public List<Object> findByDisease() {
		return sqlSession.selectList("disease.findByDisease");
	}
	public List<Object> findByMedicine() {
		return sqlSession.selectList("medicine.findByMedicine");
	}
	public boolean deleteByNo(int no) {
		int count = sqlSession.delete("main.deleteByNo", no);
		return count == 1;
	}
	public boolean deleteByDisease(String code) {
		int count = sqlSession.delete("disease.deleteByDisease", code);
		return count == 1;
	}
	public boolean deleteByMedicine(int no) {
		int count = sqlSession.delete("medicine.deleteByMedicine", no);
		return count == 1;
	}
	public boolean updateAuth() {
		int count = sqlSession.update("main.updateAuth");
		return count == 1;
	}
	public boolean updateDisease() {
		int count = sqlSession.update("disease.updateDisease");
		return count == 1;
	}
	public boolean updateMedicine() {
		int count = sqlSession.update("medicine.updateMedicine");
		return count == 1;
	}
	public boolean addDisease(@Valid DiseaseVo vo) {
		return sqlSession.selectOne("disease.addDisease", vo);
	}
	public boolean addMedicine(@Valid MedicineVo vo) {
		return sqlSession.selectOne("medicine.addMedicine", vo);
	}
	
	

	

}
