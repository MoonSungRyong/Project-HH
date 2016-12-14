package objackie.dao;

import objackie.vo.RealEstateContractFile;

public interface RealEstateContractFileDao {
  int insert(RealEstateContractFile realEstateContractFile) throws Exception;
  int update(RealEstateContractFile realEstateContractFile) throws Exception;
  int delete(int no) throws Exception;
}