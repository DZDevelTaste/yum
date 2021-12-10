package ant.yum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.AdminRepository;
import ant.yum.vo.DiseaseVo;
import ant.yum.vo.MedicineVo;
import ant.yum.vo.UserVo;

@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;

	public List<UserVo> findByAll() {
		return adminRepository.findByAll();
	}
	public List<DiseaseVo> findByDisease() {
		return adminRepository.findByDisease();
	}
	public List<MedicineVo> findByMedicine() {
		return adminRepository.findByMedicine();
	}
	public boolean deleteByNo(UserVo userVo) {
		return adminRepository.deleteByNo(userVo);
	}
	public boolean updateAuth(UserVo userVo) {
		return adminRepository.updateAuth(userVo);
	}
	public boolean updateMedicine(MedicineVo medicineVo) {
		return adminRepository.updateMedicine(medicineVo);
	}
	public void addDisease(DiseaseVo diseaseVo) {
		adminRepository.addDisease(diseaseVo);
	}
	public void addMedicine(MedicineVo medicineVo) {
		adminRepository.addMedicine(medicineVo);
	}
    public MedicineVo findByNoMedicine(int no) {
        return adminRepository.findByNoMedicine(no);
    }
    
}
