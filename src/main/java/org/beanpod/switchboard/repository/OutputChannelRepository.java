package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutputChannelRepository extends JpaRepository<OutputChannelEntity, Long> {
  OutputChannelEntity save(OutputChannelEntity outputChannelEntity);

  Long deleteOutputChannelEntitiesById(Long id);
}
