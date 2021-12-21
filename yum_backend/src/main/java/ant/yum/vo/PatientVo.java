package ant.yum.vo;

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
	private String age;
	private String insuarance;
	private String phone;
	private String address;
	private double length;
	private double weight;
	private String desc;
}
