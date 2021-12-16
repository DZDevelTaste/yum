package ant.yum.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserVo {
	private int no;
	private String email;
	private String password;
	private String name;
	private String rrn;
	private String address;
	private String job;
	private String auth;
	private String phone;
	private String gender;
}