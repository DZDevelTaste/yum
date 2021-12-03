package ant.yum.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MessageVo {
	private int no;
	private int userNo;
	private int patientNo;
	private int orderstateNo;
	private String state;
}
