package ant.yum.repository;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.UserVo;

@Repository
public class MainRepository {
	@Autowired
	private SqlSession sqlSession;
	
	public boolean insert(@Valid UserVo userVo) {
		int count = sqlSession.insert("main.insert", userVo);
		return count == 1;
	}
	public UserVo findId(UserVo userVo) {
		return sqlSession.selectOne("main.findId", userVo);
	}
	public UserVo findIdByEmail(UserVo userVo) {
		return sqlSession.selectOne("main.findIdByEmail", userVo);
	}
	public boolean updatePw(UserVo userVo) {
		int count = sqlSession.update("main.updatePw", userVo);
		return count == 1;
	}
    public UserVo findByNoMedicine(int no) {
        return sqlSession.selectOne("main.findByNo", no);
    }
    public UserVo getUser(String email, String password) {
        Map<String, String> map = new HashMap<>();
		map.put("email", email);
		map.put("password", password);
		return sqlSession.selectOne("main.getUser", map);
    }
}
