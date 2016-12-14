/* <게시판사진>
 * 작성자 : 이승도
 * 작성일 : 2016-10-13
 */

package objackie.vo;

import java.io.Serializable;

public class BoardPhoto implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int photoNo;        // 사진번호 [Primary-key / Auto-increment]
  protected int boardNo;        // 게시판 글번호 [Foreign-key]
  protected String photoPath;   // 사진

  public int getPhotoNo() {
    return photoNo;
  }

  public void setPhotoNo(int photoNo) {
    this.photoNo = photoNo;
  }

  public int getBoardNo() {
    return boardNo;
  }

  public void setBoardNo(int boardNo) {
    this.boardNo = boardNo;
  }

  public String getPhotoPath() {
    return photoPath;
  }

  public void setPhotoPath(String photoPath) {
    this.photoPath = photoPath;
  }

  @Override
  public String toString() {
    return "BoardPhoto [photoNo=" + photoNo + ", boardNo=" + boardNo + ", photoPath=" + photoPath + "]";
  }

}
