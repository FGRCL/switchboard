package org.beanpod.switchboard.service;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.springframework.stereotype.Service;

@Service
public interface EncoderService {
  List<StreamDto> getEncoderStreams(String encoderSerialNumber);
}
