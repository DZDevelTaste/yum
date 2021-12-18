package ant.yum.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.DiseaseVo;

@Repository
public class DiseaseRepository {
<<<<<<< HEAD

    @Autowired
    private SqlSession sqlsession;

    public List<DiseaseVo> findByDisease() {
        return sqlsession.selectList("disease.findByDisease");
    }
=======
    @Autowired
	private SqlSession sqlSession;

    public List<DiseaseVo> findByDisease() {
		return sqlSession.selectList("disease.findByDisease");
	}
    public boolean addDisease(DiseaseVo diseaseVo) {
		int count = sqlSession.insert("disease.addDisease", diseaseVo);
		return count == 1;
	}
>>>>>>> 4db3f2e38157236a8422e9cedcd0fb00456af368
}
