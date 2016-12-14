package objackie.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import objackie.vo.RealEstateContract;

public interface RealEstateContractService {
  List<RealEstateContract> getRealEstateContractList(int pageNo, int length, String email) throws Exception;
  List<RealEstateContract> getRealEstateContractList1(int pageNo, int length, int no) throws Exception;
  List<RealEstateContract> getRealEstateContractList2(int pageNo, int length, int no) throws Exception;
  List<RealEstateContract> getRealEstateContractList3(int pageNo, int length, int no) throws Exception;
  List<RealEstateContract> getRealEstateContractTenantList(String email) throws Exception;
  void insertRealEstateContract(RealEstateContract realEstateContract, MultipartFile file, String uploadDir) throws Exception;
  RealEstateContract getRealEstateContract(int no) throws Exception;
  RealEstateContract getSelectRtpaydt(String email) throws Exception;
  void updateRealEstateContract(RealEstateContract realEstateContract, MultipartFile file, String uploadDir) throws Exception;
  void updateReqRealEstateContract(RealEstateContract realEstateContract) throws Exception;
  void deleteRealEstateContract(int no) throws Exception;
}







