package objackie.vo;

import java.io.Serializable;

public class Build implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int buildNo;              // 임대건물번호 [Primary-key / Auto-increment]
  protected String email;             // 소유주이메일 [Foreign-key]
  protected String TEmail;   
  protected String name;              // 이름
  protected String auth;              // 권한 [0:임대인/ 1:임차인]
  protected String reID;              // 부동산아이디
  protected String postNo;            // 우편번호
  protected String basicAddr;         // 기본주소
  protected String detailAddr;        // 상세주소
  protected int reType;               // 부동산유형 [0:원룸 / 1:오피스텔 / 2:다세대주택]
  protected int park;                 // 주차가능유형 [0: 가능 / 1: 불가능]
  protected int rentPayDate;
  protected int request;
  
  public int getBuildNo() {
    return buildNo;
  }
  public void setBuildNo(int buildNo) {
    this.buildNo = buildNo;
  }
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
  public String getAuth() {
    return auth;
  }
  public void setAuth(String auth) {
    this.auth = auth;
  }
  public String getReID() {
    return reID;
  }
  public void setReID(String reID) {
    this.reID = reID;
  }
  public String getPostNo() {
    return postNo;
  }
  public void setPostNo(String postNo) {
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
  public int getReType() {
    return reType;
  }
  public void setReType(int reType) {
    this.reType = reType;
  }
  public int getPark() {
    return park;
  }
  public void setPark(int park) {
    this.park = park;
  }
  
  
  public String getTEmail() {
    return TEmail;
  }
  public void setTEmail(String tEmail) {
    TEmail = tEmail;
  }  
  
  public int getRentPayDate() {
    return rentPayDate;
  }
  public void setRentPayDate(int rentPayDate) {
    this.rentPayDate = rentPayDate;
  }
  
  public int getRequest() {
    return request;
  }
  public void setRequest(int request) {
    this.request = request;
  }
  
  
  @Override
  public String toString() {
    return "Build [buildNo=" + buildNo + ", email=" + email + ", TEmail=" + TEmail + ", name=" + name + ", auth=" + auth
        + ", reID=" + reID + ", postNo=" + postNo + ", basicAddr=" + basicAddr + ", detailAddr=" + detailAddr
        + ", reType=" + reType + ", park=" + park + ", rentPayDate=" + rentPayDate + "]";
  }  
}
