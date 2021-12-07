package ant.yum.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DiagnosisVo {
	private int no;
	private String date;
	private String desc;
	private int orderNo;
	private int userNo;
	private String medicineName;
	private int presMedicineCount;
	private int presMedicineDay;
	private String clinicKind;
	private String clinicName;
	private String diseaseName;
	private String patientName;
	private int patientNo;

	// prescription를 insert 할 때 필요
	private List<PresMedicineVo> presMedicineList;
	private List<PresDiseaseVo> presDiseaseList;
	private List<PresClinicVo> presClinicList;
}
