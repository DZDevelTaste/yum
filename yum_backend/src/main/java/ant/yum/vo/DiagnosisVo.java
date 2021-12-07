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
	private List<PresMedicineVo> presMedicineList;
	private List<PresDiseaseVo> presDiseaseList;
	private List<PresClinicVo> presClinicList;
}
