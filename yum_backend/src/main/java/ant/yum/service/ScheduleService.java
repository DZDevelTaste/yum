package ant.yum.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.ScheduleRepository;
import ant.yum.vo.ScheduleVo;

@Service
public class ScheduleService {
	
	@Autowired
	private ScheduleRepository scheduleRepository;
	
	public List<Object> findByAll() {
		return scheduleRepository.findBySchedule();
	}
	public boolean deleteSchedule(int userNo) {
		return scheduleRepository.deleteSchedule(userNo);
	}
	public boolean addSchedule(@Valid ScheduleVo vo) {
		return scheduleRepository.addSchedule(vo);
	}
	public void updateSchedule(int userNo) {
		scheduleRepository.updateSchedule(userNo);
	}
}
