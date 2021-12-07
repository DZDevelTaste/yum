package ant.yum.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PatientVo {
	private int no;
	private String name;
	private String gender;
	private String rrn;
	private String insuarance;
	private String phone;
	private String address;
	private double length;
	private double weight;
	private String desc;
	private List<DiagnosisVo> diagnosisVo;
}
