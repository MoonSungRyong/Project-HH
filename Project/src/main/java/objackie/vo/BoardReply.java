/* <게시판댓글>
 * 작성자 : 이승도
 * 작성일 : 2016-10-13
 */

package objackie.vo;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class BoardReply implements Serializable {
  private static final long serialVersionUID = 1L;
  static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

  protected int replyNo;      // 게시판 댓글번호 [Primary-key / Auto-increment]
  protected int boardNo;      // 게시판 글번호 [Foreign-key]
  protected String email;     // 이메일 [Foreign-key]
  protected String contents;  // 내용
  protected Date createDate;  // 작성일

  public int getReplyNo() {
    return replyNo;
  }

  public void setReplyNo(int replyNo) {
    this.replyNo = replyNo;
  }

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

  public String getContents() {
    return contents;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public Date getCreateDate() {
    return createDate;
  }

  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
  }

  @Override
  public String toString() {
    return "BoardReply [replyNo=" + replyNo + ", boardNo=" + boardNo + ", email=" + email + ", contents=" + contents
        + ", createDate=" + createDate + "]";
  }

}
