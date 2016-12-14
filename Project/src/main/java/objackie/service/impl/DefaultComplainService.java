package objackie.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.ComplainDao;
import objackie.dao.ComplainFileDao;
import objackie.service.ComplainService;
import objackie.util.FileUploadUtil;
import objackie.vo.Complain;
import objackie.vo.ComplainFile;

@Service 
public class DefaultComplainService implements ComplainService {
  @Autowired ComplainDao complainDao;
  @Autowired ComplainFileDao complainFileDao;
  
  public List<Complain> getComplainList(int pageNo, int length) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    return complainDao.selectList(map);
  }
  
  public List<Complain> getComplainListbyRsvd0(int pageNo, int length, String email) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("email", email);
    return complainDao.selectListbyRsvd0(map);
  }
 
  public List<Complain> getComplainListbyRsvd1(int pageNo, int length, String email) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("email", email); 
    return complainDao.selectListbyRsvd1(map);
  }
  
  public List<Complain> getComplainListbyRsvd0_t(int pageNo, int length, String email) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("email", email);
    return complainDao.selectListbyRsvd0_t(map);
  }
  
  public List<Complain> getComplainListbyRsvd1_t(int pageNo, int length, String email) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("email", email); 
    return complainDao.selectListbyRsvd1_t(map);
  }
  
  @Override
  public void insertComplain0(Complain complain, String uploadDir) throws Exception {
    System.out.println("여기부터");
    try {
      complainDao.insert(complain);

      String newFilename = "0000000000.png";
        ComplainFile complainFile = new ComplainFile();
        complainFile.setFilename(newFilename);
        complainFile.setComplainNo(complain.getNo());
        // boardFile.setBoardNo(10200); //트랜잭션 테스트 용
        complainFileDao.insert(complainFile);
    } catch (Exception e) {
      e.printStackTrace();
    }

    System.out.println("여기까지");
  }
  
  @Override
  public void insertComplain1(Complain complain, MultipartFile file, String uploadDir) throws Exception {
    System.out.println("여기부터");
    try {
      complainDao.insert(complain);

      String newFilename = null;
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        ComplainFile complainFile = new ComplainFile();
        complainFile.setFilename(newFilename);
        complainFile.setComplainNo(complain.getNo());
        // boardFile.setBoardNo(10200); //트랜잭션 테스트 용
        complainFileDao.insert(complainFile);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    System.out.println("여기까지");
  }


  public Complain getComplain(int no) throws Exception {
    return complainDao.selectOne(no);
  }
  
  public ComplainFile getSelect(int no) throws Exception {
    System.out.println("서비스 구현체 들어옵니다.");
    System.out.println(no);
    return complainFileDao.selectOne(no);
  }
  
  public void updateComplain(Complain complain) throws Exception {
    System.out.println(complain.toString());
   complainDao.update(complain);
 }
  
  public void updateComplain0(Complain complain) throws Exception {
    //System.out.println("업데이트 0 에 서비스 구현체.");
    complainDao.update0(complain);
  }
  
  public void updateComplain1(Complain complain, MultipartFile file, String uploadDir) throws Exception {
    //System.out.println("업데이트 1 에 서비스 구현체.");
    complainDao.update0(complain);

    String newFilename = null;
    if (file != null && !file.isEmpty()) {
      newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
      file.transferTo(new File(uploadDir + newFilename));
      ComplainFile complainFile = new ComplainFile();
      complainFile.setFilename(newFilename);
      complainFile.setComplainNo(complain.getNo());
      
      //System.out.println(complainFile);
      complainFileDao.update(complainFile);
    }
  }
  
  public void deleteComplain(int no) throws Exception {
    complainDao.delete(no);
  }
  
  public int getTotalPage(int pageSize) throws Exception {
    int countAll = complainDao.countAll();
    
    int totalPage = countAll / pageSize;
    if ((countAll % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }

  public int getTotalPageRsvd0(int pageSize) throws Exception {
    int countAllRsvd0 = complainDao.countAllRsvd0();
    
    int totalPage = countAllRsvd0 / pageSize;
    if ((countAllRsvd0 % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }

  public int getTotalPageRsvd1(int pageSize) throws Exception {
    int countAllRsvd1 = complainDao.countAllRsvd1();
    
    int totalPage = countAllRsvd1 / pageSize;
    if ((countAllRsvd1 % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }


  
  

 
}




