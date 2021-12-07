package ant.yum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.ScheduleRepository;
import ant.yum.vo.ScheduleVo;

@Service
public class ScheduleService {
	
	@Autowired
	private ScheduleRepository scheduleRepository;
	
	public List<ScheduleVo> findByAll() {
		return scheduleRepository.findBySchedule();
	}
	public boolean deleteSchedule(ScheduleVo scheduleVo) {
		return scheduleRepository.deleteSchedule(scheduleVo);
	}
	public boolean addSchedule(ScheduleVo scheduleVo) {
		return scheduleRepository.addSchedule(scheduleVo);
	}
	public void updateSchedule(ScheduleVo scheduleVo) {
		scheduleRepository.updateSchedule(scheduleVo);
	}
}
