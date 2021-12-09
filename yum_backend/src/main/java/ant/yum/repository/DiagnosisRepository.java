package ant.yum.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.DiagnosisVo;

@Repository
public class DiagnosisRepository {

	@Autowired
	private SqlSession sqlSession;

	public DiagnosisVo insert(DiagnosisVo diagnosisVo) {

		sqlSession.insert("diagnosis.insert", diagnosisVo);

		return diagnosisVo;

	}

	public List<DiagnosisVo> findByNo(int patientNo) {

		return sqlSession.selectList("diagnosis.findByNo", patientNo);
	}
}
