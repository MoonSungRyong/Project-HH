/* <게시판사진>
 * 작성자 : 이승도
 * 작성일 : 2016-10-13
 */

package objackie.vo;

import java.io.Serializable;

public class RealEstateContractPhoto implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int photoNo;        
  protected int contractNo;        
  protected String photoPath;
  
  
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
  public String getPhotoPath() {
    return photoPath;
  }
  public void setPhotoPath(String photoPath) {
    this.photoPath = photoPath;
  }    
}
