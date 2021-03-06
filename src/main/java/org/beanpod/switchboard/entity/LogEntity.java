package org.beanpod.switchboard.entity;

import java.time.OffsetDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LogEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private OffsetDateTime dateTime;

  private String message;

  private String level;

  private String
      serialNumber; // This can be a single serialNumber or two serialNumbers seperated by a comma
}
