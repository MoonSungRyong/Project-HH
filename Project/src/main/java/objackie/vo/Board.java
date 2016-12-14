/* <게시판>
 * 작성자 : 이승도
 * 작성일 : 2016-10-13
 */

package objackie.vo;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class Board implements Serializable {
  private static final long serialVersionUID = 1L;
  static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

  protected int boardNo;      // 게시판 글번호 [Primary-key / Auto-increment]
  protected String email;     // 이메일 [Foreign-key]
  protected int type;         // 게시판 종류 [0:공지 / 1:민원 / 2:정보교환 / 3:전체게시판]
  protected String title;     // 제목
  protected String contents;  // 내용
  protected int viewCount;    // 조회수
  protected Date createDate;  // 작성일
  protected String writer;    // 작성자
  protected String filename;

  public int getBoardNo() {
    return boardNo;
  }

  public void setBoardNo(int boardNo) {
    this.boardNo = boardNo;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public int getType() {
    return type;
  }

  public void setType(int type) {
    this.type = type;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContents() {
    return contents;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public int getViewCount() {
    return viewCount;
  }

  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }

  public Date getCreateDate() {
    return createDate;
  }

  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
  }

  public String getWriter() {
    return writer;
  }

  public void setWriter(String writer) {
    this.writer = writer;
  }
    

  public String getFilename() {
    return filename;
  }

  public void setFilename(String filename) {
    this.filename = filename;
  }

  @Override
  public String toString() {
    return "Board [boardNo=" + boardNo + ", email=" + email + ", type=" + type + ", title=" + title + ", contents="
        + contents + ", viewCount=" + viewCount + ", createDate=" + createDate + ", writer=" + writer + "]";
  }

}
