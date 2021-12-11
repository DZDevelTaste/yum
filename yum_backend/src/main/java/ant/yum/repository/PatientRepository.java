package ant.yum.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.PatientVo;

@Repository
public class PatientRepository {
    @Autowired
    private SqlSession sqlSession;

    public List<PatientVo> findByAll() {
        return sqlSession.selectList("patient.findAll");
    }
    
	public PatientVo findByNo(int patientNo) {
        
        return sqlSession.selectOne("patient.findByNo", patientNo);
	}

    public PatientVo findByPatientInfo(int no) {
        return sqlSession.selectOne("patient.findByPatientVo", no);
    }
    
    public void addPatient(PatientVo patientVo) {
        sqlSession.insert("patient.insert", patientVo);
    }

    public void updatePatientInfo(PatientVo patientVo) {
        sqlSession.update("patient.updatePatientInfo", patientVo);
    }
}
