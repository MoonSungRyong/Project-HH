package objackie.vo;

import java.io.Serializable;
import java.sql.Date;

public class RealEstateContract implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int contractNo;
  protected int buildNo;
  protected int contractType;
  protected int deposit;
  protected int rentAmount;
  protected int contractStatus;
  protected String tenantEmail;
  protected String email;
  protected String name;
  protected String detailAddress;
  protected Date contractDate;
  protected Date endDate;
  protected int rentPayDate;
  protected int utilityPayDate;
  protected String filename;
  protected String phoPath;
  protected String telePhone;
  protected int request;
  protected String basicAddress;
  protected int gender;


  public int getContractNo() {
    return contractNo;
  }

  public void setContractNo(int contractNo) {
    this.contractNo = contractNo;
  }

  public int getBuildNo() {
    return buildNo;
  }

  public void setBuildNo(int buildNo) {
    this.buildNo = buildNo;
  }

  public int getContractType() {
    return contractType;
  }

  public void setContractType(int contractType) {
    this.contractType = contractType;
  }

  public int getDeposit() {
    return deposit;
  }

  public void setDeposit(int deposit) {
    this.deposit = deposit;
  }

  public int getRentAmount() {
    return rentAmount;
  }

  public void setRentAmount(int rentAmount) {
    this.rentAmount = rentAmount;
  }

  public int getContractStatus() {
    return contractStatus;
  }

  public void setContractStatus(int contractStatus) {
    this.contractStatus = contractStatus;
  }

  public String getTenantEmail() {
    return tenantEmail;
  }

  public void setTenantEmail(String tenantEmail) {
    this.tenantEmail = tenantEmail;
  }

  public Date getContractDate() {
    return contractDate;
  }

  public void setContractDate(Date contractDate) {
    this.contractDate = contractDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }

  public int getRentPayDate() {
    return rentPayDate;
  }

  public void setRentPayDate(int rentPayDate) {
    this.rentPayDate = rentPayDate;
  }

  public int getUtilityPayDate() {
    return utilityPayDate;
  }

  public void setUtilityPayDate(int utilityPayDate) {
    this.utilityPayDate = utilityPayDate;
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

  public String getDetailAddress() {
    return detailAddress;
  }

  public void setDetailAddress(String detailAddress) {
    this.detailAddress = detailAddress;
  }

  public String getFilename() {
    return filename;
  }

  public void setFilename(String filename) {
    this.filename = filename;
  }

  public String getPhoPath() {
    return phoPath;
  }

  public void setPhoPath(String phoPath) {
    this.phoPath = phoPath;
  }

  public int getRequest() {
    return request;
  }

  public void setRequest(int request) {
    this.request = request;
  }

  public String getTelePhone() {
    return telePhone;
  }

  public void setTelePhone(String telePhone) {
    this.telePhone = telePhone;
  }

  public String getBasicAddress() {
    return basicAddress;
  }

  public void setBasicAddress(String basicAddress) {
    this.basicAddress = basicAddress;
  }

  public int getGender() {
    return gender;
  }

  public void setGender(int gender) {
    this.gender = gender;
  }

  @Override
  public String toString() {
    return "RealEstateContract [contractNo=" + contractNo + ", buildNo=" + buildNo + ", contractType=" + contractType
        + ", deposit=" + deposit + ", rentAmount=" + rentAmount + ", contractStatus=" + contractStatus
        + ", tenantEmail=" + tenantEmail + ", email=" + email + ", name=" + name + ", detailAddress=" + detailAddress
        + ", contractDate=" + contractDate + ", endDate=" + endDate + ", rentPayDate=" + rentPayDate
        + ", utilityPayDate=" + utilityPayDate + ", filename=" + filename + ", phoPath=" + phoPath + ", telePhone="
        + telePhone + ", request=" + request + ", basicAddress=" + basicAddress + ", gender=" + gender + "]";
  }    

}







