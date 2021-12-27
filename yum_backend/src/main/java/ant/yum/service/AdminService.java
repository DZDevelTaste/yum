package ant.yum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.AdminRepository;
import ant.yum.repository.DiseaseRepository;
import ant.yum.repository.MedicineRepository;
import ant.yum.vo.DiseaseVo;
import ant.yum.vo.MedicineVo;
import ant.yum.vo.UserVo;

@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private DiseaseRepository diseaseRepository;
	@Autowired
	private MedicineRepository medicineRepository;

	public List<UserVo> findByAll() {
		return adminRepository.findByAll();
	}
	public List<DiseaseVo> findByDisease() {
		return diseaseRepository.findByDisease();
	}
	public List<MedicineVo> findByMedicine() {
		return medicineRepository.findByMedicine();
	}
	public boolean deleteByNo(UserVo userVo) {
		return adminRepository.deleteByNo(userVo);
	}
	public void updateAuth(List<UserVo> userVo) {
		adminRepository.updateAuth(userVo);
	}
	public boolean updateMedicine(MedicineVo medicineVo) {
		return medicineRepository.updateMedicine(medicineVo);
	}
	public void addDisease(DiseaseVo diseaseVo) {
		diseaseRepository.addDisease(diseaseVo);
	}
	public void addMedicine(MedicineVo medicineVo) {
		medicineRepository.addMedicine(medicineVo);
	}
    public MedicineVo findByNoMedicine(int no) {
        return medicineRepository.findByNoMedicine(no);
    }
}
