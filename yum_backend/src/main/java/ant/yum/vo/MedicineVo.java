package ant.yum.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MedicineVo {
	private int no;
	private String code;
	private String name;
	private String company;
	private String ingredient;
	private String efficacy;
	private String precaution;
	private String caution;
	private String sideEffect;
}
