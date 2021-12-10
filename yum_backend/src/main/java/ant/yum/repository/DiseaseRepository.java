package ant.yum.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.DiseaseVo;

@Repository
public class DiseaseRepository {
    @Autowired
	private SqlSession sqlSession;

    public List<DiseaseVo> findByDisease() {
		return sqlSession.selectList("disease.findByDisease");
	}
    public boolean addDisease(DiseaseVo diseaseVo) {
		return sqlSession.selectOne("disease.addDisease", diseaseVo);
	}
}
