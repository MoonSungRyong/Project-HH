/* <회원>
 * 작성자 : 이승도
 * 작성일 : 2016-10-03
 * 
 * 수정
 * 작성자 : 윤인수
 * 수정일 : 2016-10-26
 * postNO의 데이터 값 char --> int 로 변경
 */

package objackie.vo;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class Member implements Serializable {
  private static final long serialVersionUID = 1L;
  static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

  protected String email;               // 이메일 [Primary-key]
  protected String name;                // 이름
  protected String tel;                 // 전화번호
  protected int gender;                 // 성별 [0:남자 / 1:여자]
  protected Date birth;                 // 생년월일
  protected int postNo;                 // 우편번호
  protected String basicAddr;           // 기본주소
  protected String detailAddr;          // 상세주소
  protected String phoPath;             // 사진
  protected int auth;                   // 권한 [0:임대인 / 1:임차인]
  protected transient String password;  // 비밀번호

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getTel() {
    return tel;
  }

  public void setTel(String tel) {
    this.tel = tel;
  }

  public int getGender() {
    return gender;
  }

  public void setGender(int gender) {
    this.gender = gender;
  }

  public Date getBirth() {
    return birth;
  }

  public void setBirth(Date birth) {
    this.birth = birth;
  }

  public int getPostNo() {
    return postNo;
  }

  public void setPostNo(int postNo) {
    this.postNo = postNo;
  }

  public String getBasicAddr() {
    return basicAddr;
  }

  public void setBasicAddr(String basicAddr) {
    this.basicAddr = basicAddr;
  }

  public String getDetailAddr() {
    return detailAddr;
  }

  public void setDetailAddr(String detailAddr) {
    this.detailAddr = detailAddr;
  }

  public String getPhoPath() {
    return phoPath;
  }

  public void setPhoPath(String phoPath) {
    this.phoPath = phoPath;
  }

  public int getAuth() {
    return auth;
  }

  public void setAuth(int auth) {
    this.auth = auth;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public String toString() {
    return "Member [email=" + email + ", name=" + name + ", tel=" + tel + ", gender=" + gender + ", birth=" + birth
        + ", postNo=" + postNo + ", basicAddr=" + basicAddr + ", detailAddr=" + detailAddr + ", phoPath=" + phoPath
        + ", auth=" + auth + ", password=" + password + "]";
  }

}
