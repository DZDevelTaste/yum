package ant.yum.repository;

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
}
