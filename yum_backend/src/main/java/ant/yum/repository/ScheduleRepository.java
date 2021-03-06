package ant.yum.repository;

import java.util.List;

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
		int count = sqlSession.insert("schedule.addSchedule", scheduleVo);
		return count == 1;
	}
	public ScheduleVo findByIdSchedule(ScheduleVo scheduleVo) {
		return sqlSession.selectOne("schedule.findByIdSchedule", scheduleVo);
	}

}
