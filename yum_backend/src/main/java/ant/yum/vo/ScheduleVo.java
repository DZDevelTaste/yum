package ant.yum.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ScheduleVo {
	private int no;
	private String reason;
	private String desc;
	private int userNo;
	private int calendarNo;
}
