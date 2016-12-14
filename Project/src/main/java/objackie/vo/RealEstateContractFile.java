package objackie.vo;

import java.io.Serializable;

public class RealEstateContractFile implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int photoNo;
  protected int contractNo;
  protected String filename;
  
  
  public int getPhotoNo() {
    return photoNo;
  }
  
  public void setPhotoNo(int photoNo) {
    this.photoNo = photoNo;
  }
  
  public int getContractNo() {
    return contractNo;
  }
  public void setContractNo(int contractNo) {
    this.contractNo = contractNo;
  }  
      
  public String getFilename() {
    return filename;
  }
  public void setFilename(String filename) {
    this.filename = filename;
  }
  
}



