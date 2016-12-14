package objackie.vo;

import java.sql.Date;

public class UtilityPayList {
  protected int paymentStatusId; //납부현황아이디
  protected int contractNumber; //계약번호
  protected int utilityListNumber; //관리비항목번호
  protected int paymentAmount; //납부금액
  protected int paymentStatus; //납부상태 0:미처리, 1:납부, 2:연체
  protected Date processedDate; //처리날짜
  
  public int getPaymentStatusId() {
    return paymentStatusId;
  }
  public void setPaymentStatusId(int paymentStatusId) {
    this.paymentStatusId = paymentStatusId;
  }
  public int getContractNumber() {
    return contractNumber;
  }
  public void setContractNumber(int contractNumber) {
    this.contractNumber = contractNumber;
  }
  public int getUtilityListNumber() {
    return utilityListNumber;
  }
  public void setUtilityListNumber(int utilityListNumber) {
    this.utilityListNumber = utilityListNumber;
  }
  public int getPaymentAmount() {
    return paymentAmount;
  }
  public void setPaymentAmount(int paymentAmount) {
    this.paymentAmount = paymentAmount;
  }
  public int getPaymentStatus() {
    return paymentStatus;
  }
  public void setPaymentStatus(int paymentStatus) {
    this.paymentStatus = paymentStatus;
  }
  public Date getProcessedDate() {
    return processedDate;
  }
  public void setProcessedDate(Date processedDate) {
    this.processedDate = processedDate;
  }
  
  
}
