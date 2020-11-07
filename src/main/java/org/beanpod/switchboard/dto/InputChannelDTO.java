package org.beanpod.switchboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class InputChannelDTO {
    private Long id;
    private String name;
    private int port;
    private DecoderDTO decoder;
}