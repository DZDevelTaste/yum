package ant.yum.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScheduleRepository {
	@Autowired
	private SqlSession sqlSession;

	public List<Object> findBySchedule() {
		return sqlSession.selectList("schedule.findBySchedule");
	}

}
