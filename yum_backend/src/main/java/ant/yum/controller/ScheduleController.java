package ant.yum.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ant.yum.dto.JsonResult;
import ant.yum.service.ScheduleService;
import ant.yum.vo.ScheduleVo;

@CrossOrigin
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("")
    public JsonResult main() {
        List<ScheduleVo> list = scheduleService.findByAll();

        return JsonResult.success(list);
    }
    @PostMapping("/id")
    public JsonResult id(@RequestBody ScheduleVo scheduleVo) {
        ScheduleVo scVo = scheduleService.findByIdSchedule(scheduleVo);
        return JsonResult.success(scVo);
    }
    @PostMapping("/add")
    public JsonResult add(@RequestBody ScheduleVo scheduleVo) {
        scheduleService.addSchedule(scheduleVo);

        return JsonResult.success(scheduleVo);
    }
    @PostMapping("/update")
    public JsonResult update(@RequestBody ScheduleVo scheduleVo) {
        scheduleService.updateSchedule(scheduleVo);
        
        return JsonResult.success(scheduleVo);
    }
    @PostMapping("/delete")
    public JsonResult delete(@RequestBody ScheduleVo scheduleVo) {
        scheduleService.deleteSchedule(scheduleVo);
        
        return JsonResult.success(scheduleVo);
    }
}
