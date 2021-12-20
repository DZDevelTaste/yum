package ant.yum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.DiseaseRepository;
import ant.yum.vo.DiseaseVo;

@Service
public class DiseaseService {

    @Autowired
    private DiseaseRepository diseaseRepository;

    public List<DiseaseVo> findByDisease() {
        return diseaseRepository.findByDisease();
    }
}
