package ant.yum.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PresMedicineVo {
	private int diagnosisNo;
	private int medicineNo;
	private String code;
	private String name;
	private int presmedicineDay;
	private int presmedicineCount; 
}
