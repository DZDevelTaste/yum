package ant.yum.repository;

import java.util.List;

import javax.validation.Valid;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.ScheduleVo;

@Repository
public class ScheduleRepository {
	@Autowired
	private SqlSession sqlSession;

	public List<Object> findBySchedule() {
		return sqlSession.selectList("schedule.findBySchedule");
	}
	public boolean updateSchedule(int userNo) {
		int count = sqlSession.update("schedule.updateSchedule", userNo);
		return count == 1;
	}
	public boolean deleteSchedule(int userNo) {
		int count = sqlSession.delete("schedule.deleteSchedule", userNo);
		return count == 1;
	}
	public boolean addSchedule(@Valid ScheduleVo vo) {
		return sqlSession.selectOne("schedule.addDisease", vo);
	}

}
