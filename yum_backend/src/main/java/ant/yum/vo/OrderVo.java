package ant.yum.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderVo {

	private int no;
	private String date;
	private int expenses;
	private String desc;
	private int userNo;
	private int orderstateNo;
	private String state;
	private PatientVo patientVo;
}
