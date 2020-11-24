package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.repository.ChannelRepository;
import org.beanpod.switchboard.repository.InputChannelRepository;
import org.beanpod.switchboard.repository.OutputChannelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

class ChannelDaoImplTest {

  // stubbed DeviceEntity object
  private static ChannelEntity channel;
  private static InputChannelEntity input;
  private static InputChannelDTO inputDto;
  private static OutputChannelEntity output;
  private static OutputChannelDTO outputDto;
  private static ChannelDTO channelDto;
  private static List<ChannelEntity> listOfChannels;
  @InjectMocks private ChannelDaoImpl channelService;
  @Mock private InputChannelRepository inputChannelRepository;
  @Mock private OutputChannelRepository outputChannelRepository;
  @Mock private InputChannelMapper inputChannelMapper;
  @Mock private OutputChannelMapper outputChannelMapper;
  @Mock private ChannelRepository channelRepository;
  @Mock private ChannelMapper channelMapper;

  @BeforeEach
  public void setup() {
    initMocks(this);
  }

  @BeforeEach
  void setupChannelFixture() {
    channel = ChannelFixture.getChannelEntity();
    input = ChannelFixture.getInputChannelEntity();
    inputDto = ChannelFixture.getInputChannelDto();
    output = ChannelFixture.getOutputChannelEntity();
    outputDto = ChannelFixture.getOutputChannelDto();
    channelDto = ChannelFixture.getChannelDto();
    listOfChannels = ChannelFixture.getListOfChannels();
  }

  @Test
  void testGetChannels() {
    when(channelRepository.findAll()).thenReturn(listOfChannels);
    List<ChannelEntity> channelEntities = channelService.getChannels();
    assertEquals(listOfChannels, channelEntities);
  }

  @Test
  void testFindChannel() {
    when(channelMapper.toChannelDTO(any())).thenReturn(channelDto);
    when(channelMapper.toChannelEntity(any())).thenReturn(channel);
    when(channelRepository.findChannelEntitiesById(ChannelFixture.CHANNEL_ID))
        .thenReturn(java.util.Optional.of(channel));
    Optional<ChannelDTO> channelDTO = channelService.findChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(channelDto, channelDTO.get());
  }

  @Test
  void testDeleteChannel() {
    when(channelRepository.deleteChannelEntitiesById(ChannelFixture.CHANNEL_ID))
        .thenReturn((long) 1);
    Long response = channelService.deleteChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(1L, response);
  }

  @Test
  void testSaveChannel() {
    when(channelMapper.toChannelDTO(any())).thenReturn(channelDto);
    when(channelMapper.toChannelEntity(any())).thenReturn(channel);
    when(channelRepository.save(channel)).thenReturn(channel);
    ChannelDTO channelDTO = channelService.save(channelDto);
    assertEquals(channelDto, channelDTO);
  }

  @Test
  void testSaveInputChannel() {
    when(inputChannelMapper.toInputChannelDTO(any())).thenReturn(inputDto);
    when(inputChannelMapper.toInputChannelEntity(any())).thenReturn(input);
    when(inputChannelRepository.save(input)).thenReturn(input);
    InputChannelDTO inputChannelDTO = channelService.saveInputChannel(inputDto);
    assertEquals(inputDto, inputChannelDTO);
  }

  @Test
  void testSaveOutputChannel() {
    when(outputChannelMapper.toOutputChannelDTO(any())).thenReturn(outputDto);
    when(outputChannelMapper.toOutputChannelEntity(any())).thenReturn(output);
    when(outputChannelRepository.save(output)).thenReturn(output);
    OutputChannelDTO outputChannelDTO = channelService.saveOutputChannel(outputDto);
    assertEquals(outputDto, outputChannelDTO);
  }

  @Test
  void testGetOutputChannelById() {
    when(outputChannelRepository.getOne(ChannelFixture.CHANNEL_ID)).thenReturn(output);
    when(outputChannelMapper.toOutputChannelDTO(output)).thenReturn(outputDto);
    OutputChannelDTO outputChannelDTO =
        channelService.getOutputChannelById(ChannelFixture.CHANNEL_ID);
    assertEquals(outputDto, outputChannelDTO);
  }

  @Test
  void testGetInputChannelById() {
    when(inputChannelRepository.getOne(ChannelFixture.CHANNEL_ID)).thenReturn(input);
    when(inputChannelMapper.toInputChannelDTO(input)).thenReturn(inputDto);
    InputChannelDTO inputChannelDTO = channelService.getInputChannelById(ChannelFixture.CHANNEL_ID);
    assertEquals(inputDto, inputChannelDTO);
  }

  @Test
  void deleteOutputChannelById() {
    when(outputChannelRepository.deleteOutputChannelEntitiesById(ChannelFixture.CHANNEL_ID))
        .thenReturn(1L);
    Long response = channelService.deleteOutputChannelById(ChannelFixture.CHANNEL_ID);
    assertEquals(1L, response);
  }

  @Test
  void deleteInputChannelById() {
    when(inputChannelRepository.deleteInputChannelEntityById(ChannelFixture.CHANNEL_ID))
        .thenReturn(1L);
    Long response = channelService.deleteInputChannelById(ChannelFixture.CHANNEL_ID);
    assertEquals(1L, response);
  }
}