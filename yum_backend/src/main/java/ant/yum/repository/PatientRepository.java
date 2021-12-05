package ant.yum.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.PatientVo;

@Repository
public class PatientRepository {
    @Autowired
    private SqlSession sqlSession;

    public void addPatient(PatientVo patientVo) {
        sqlSession.insert("patient.insert", patientVo);
    }
    
}
