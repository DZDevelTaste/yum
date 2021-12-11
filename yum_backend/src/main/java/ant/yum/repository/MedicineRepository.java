package ant.yum.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.MedicineVo;

@Repository
public class MedicineRepository {
    @Autowired
	private SqlSession sqlSession;

    public List<MedicineVo> findByMedicine() {
		return sqlSession.selectList("medicine.findByMedicine");
	}
    public boolean updateMedicine(MedicineVo medicineVo) {
		int count = sqlSession.update("medicine.updateMedicine", medicineVo);
		return count == 1;
	}
    public boolean addMedicine(MedicineVo medicineVo) {
		int count = sqlSession.insert("medicine.addMedicine", medicineVo);
		return count == 1;
	}
    public MedicineVo findByNoMedicine(int no) {
		return sqlSession.selectOne("medicine.findByNoMedicine", no);
    }
}
