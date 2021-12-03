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
	
	public boolean insert(@Valid UserVo vo) {
		int count = sqlSession.insert("main.insert", vo);
		return count == 1;
	}

	public UserVo findId(String name, String rrn) {
		Map<String, String> map = new HashMap<>();
		map.put("n", name);
		map.put("r", rrn);
		return sqlSession.selectOne("main.findId", map);
	}

	public UserVo findIdByEmail(String name, String email, String rrn) {
		Map<String, String> map = new HashMap<>();
		map.put("n", name);
		map.put("e", email);
		map.put("r", rrn);
		return sqlSession.selectOne("main.findIdByEmail", map);
	}

	public boolean updatePw(String password, String name) {
		Map<String, String> map = new HashMap<>();
		map.put("n", name);
		map.put("p", password);
		int count = sqlSession.update("main.updatePw", map);
		return count == 1;
	}
}
