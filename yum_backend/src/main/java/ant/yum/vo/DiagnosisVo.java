package ant.yum.vo;

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
}
