package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.DecoderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DecoderRepository extends JpaRepository<DecoderEntity, String> {

    Optional<DecoderEntity> findDecoderBySerialNumber(String serialNumber);

    DecoderEntity save(DecoderEntity decoderEntity);

    List<DecoderEntity> findAll();

    Long deleteDecoderEntityBySerialNumber(String serialNumber);
}