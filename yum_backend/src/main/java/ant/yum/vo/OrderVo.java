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
	private int patientNo;

	// 조인해서 받아오는 값..
	private String patientName;
}
