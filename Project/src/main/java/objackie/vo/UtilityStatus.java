package objackie.vo;

import java.sql.Date;

public class UtilityStatus {
  
  protected int utilityListNumber;
  protected int totalUtility;
  protected int basicUtility; 
  protected int electricity; 
  protected int gas; 
  protected int water;
  protected int etc;
  
  public int getUtilityListNumber() {
    return utilityListNumber;
  }
  public void setUtilityListNumber(int utilityListNumber) {
    this.utilityListNumber = utilityListNumber;
  }
  public int getTotalUtility() {
    return totalUtility;
  }
  public void setTotalUtility(int totalUtility) {
    this.totalUtility = totalUtility;
  }
  public int getBasicUtility() {
    return basicUtility;
  }
  public void setBasicUtility(int basicUtility) {
    this.basicUtility = basicUtility;
  }
  public int getElectricity() {
    return electricity;
  }
  public void setElectricity(int electricity) {
    this.electricity = electricity;
  }
  public int getGas() {
    return gas;
  }
  public void setGas(int gas) {
    this.gas = gas;
  }
  public int getWater() {
    return water;
  }
  public void setWater(int water) {
    this.water = water;
  }
  public int getEtc() {
    return etc;
  }
  public void setEtc(int etc) {
    this.etc = etc;
  }

}
