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

	public List<ScheduleVo> findBySchedule() {
		return sqlSession.selectList("schedule.findBySchedule");
	}
	public boolean updateSchedule(ScheduleVo scheduleVo) {
		int count = sqlSession.update("schedule.updateSchedule", scheduleVo);
		return count == 1;
	}
	public boolean deleteSchedule(ScheduleVo scheduleVo) {
		int count = sqlSession.delete("schedule.deleteSchedule", scheduleVo);
		return count == 1;
	}
	public boolean addSchedule(ScheduleVo scheduleVo) {
		return sqlSession.selectOne("schedule.addDisease", scheduleVo);
	}

}
