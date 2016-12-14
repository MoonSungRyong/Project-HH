/* 부동산(RE) 테이블
작성자 : 이승도
최종수정일 : 2016-11-10
*/

package objackie.vo;

import java.io.Serializable;

public class RealEstate implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int buildNo;            // 임대건물번호 (BUILD_NO) [PK]
  protected String landlordEmail;   // 소유주이메일 (L_EMAIL) [FK]
  protected String realEstateId;    // 부동산아이디 (RE_ID)
  protected int postNo;             // 우편번호 (POSTNO)
  protected String basicAddr;       // 기본주소 (BAS_ADDR)
  protected String detailAddr;      // 상세주소 (DIT_ADDR)
  protected int realEstateType;     // 부동산유형 (RE_TYPE)
  protected int parking;            // 주차가능여부 (PK)
  /*------------------------------------------------------------*/

  public int getBuildNo() {
    return buildNo;
  }

  public void setBuildNo(int buildNo) {
    this.buildNo = buildNo;
  }

  public String getLandlordEmail() {
    return landlordEmail;
  }

  public void setLandlordEmail(String landlordEmail) {
    this.landlordEmail = landlordEmail;
  }

  public String getRealEstateId() {
    return realEstateId;
  }

  public void setRealEstateId(String realEstateId) {
    this.realEstateId = realEstateId;
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

  public int getRealEstateType() {
    return realEstateType;
  }

  public void setRealEstateType(int realEstateType) {
    this.realEstateType = realEstateType;
  }

  public int getParking() {
    return parking;
  }

  public void setParking(int parking) {
    this.parking = parking;
  }

  @Override
  public String toString() {
    return "RealEstate [buildNo=" + buildNo + ", landlordEmail=" + landlordEmail + ", realEstateId=" + realEstateId
        + ", postNo=" + postNo + ", basicAddr=" + basicAddr + ", detailAddr=" + detailAddr + ", realEstateType="
        + realEstateType + ", parking=" + parking + "]";
  }

}
