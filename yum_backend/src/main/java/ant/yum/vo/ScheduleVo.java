package ant.yum.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ScheduleVo {
	private int id;
	private String title;
	private String start;
	private String end;
	private int userNo;
	private String name;
}
