package ant.yum.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.UserVo;

@Repository
public class AdminRepository {
	@Autowired
	private SqlSession sqlSession;
	
	public List<UserVo> findByAll() {
		return sqlSession.selectList("main.findByAll");
	}
	
	public void deleteByNo(List<UserVo> userVo) {
		for (UserVo userlist : userVo) {

			Map<String, Object> map = new HashMap<>();

			map.put("no", userlist.getNo());

			sqlSession.delete("main.deleteByNo", map);
		}
	}
	public void updateAuth(List<UserVo> userVo) {
		for (UserVo userlist : userVo) {

			Map<String, Object> map = new HashMap<>();

			map.put("no", userlist.getNo());

			sqlSession.update("main.updateAuth", map);
		}
	}
}
