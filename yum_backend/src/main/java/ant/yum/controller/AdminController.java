package ant.yum.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ant.yum.dto.JsonResult;
import ant.yum.service.AdminService;
import ant.yum.vo.DiseaseVo;
import ant.yum.vo.MedicineVo;
import ant.yum.vo.UserVo;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @Autowired
	private AdminService adminService;

    @GetMapping("")
    public JsonResult userList() {
        List<UserVo> list = adminService.findByAll();

        return JsonResult.success(list);
    }
    @PostMapping("/update")
    public JsonResult update(@RequestBody UserVo userVo) {
        adminService.updateAuth(userVo);

        return JsonResult.success(userVo);
    } 
    
    @PostMapping("/delete")
    public JsonResult delete(@RequestBody UserVo userVo) {
        adminService.deleteByNo(userVo);

        return JsonResult.success(userVo);
    }
    @GetMapping("/disease")
    public JsonResult diseaseList() {
        List<DiseaseVo> list = adminService.findByDisease();

        return JsonResult.success(list);
    }
    @PostMapping("/disease/add")
    public JsonResult addDisease(@RequestBody DiseaseVo diseaseVo) {
        adminService.addDisease(diseaseVo);

        return JsonResult.success(diseaseVo);
    }
    @GetMapping("/medicine")
    public JsonResult medicineList() {
        List<MedicineVo> list = adminService.findByMedicine();

        return JsonResult.success(list);
    }
    @GetMapping("/medicine/medicineInfo/{no}")
    public JsonResult medicineInfo(@PathVariable(value= "no") int no) {
        MedicineVo medicineVo = adminService.findByNoMedicine(no);

        return JsonResult.success(medicineVo);
    }
    @PostMapping("/medicine/add")
    public JsonResult addMedicine(@RequestBody MedicineVo medicineVo) {
        adminService.addMedicine(medicineVo);

        return JsonResult.success(medicineVo);
    }
    @PostMapping("/medicine/update")
    public JsonResult updateMedicine(@RequestBody MedicineVo medicineVo) {
        adminService.updateMedicine(medicineVo);

        return JsonResult.success(medicineVo);
    }
}
