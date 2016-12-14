package objackie.vo;

import java.io.Serializable;

public class ComplainFile implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int no;
  protected int complainNo;
  protected String filename;

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getComplainNo() {
    return complainNo;
  }

  public void setComplainNo(int complainNo) {
    this.complainNo = complainNo;
  }

  public String getFilename() {
    return filename;
  }

  public void setFilename(String filename) {
    this.filename = filename;
  }

  @Override
  public String toString() {
    return "ComplainFile [no=" + no + ", complainNo=" + complainNo + ", filename=" + filename + "]";
  }

}