package com.ssafy.aejimeongji.mapper;

import java.util.List;

public interface StructMapper<D, E> {
    D toDto(E entity);
    E toEntity(D dto);
    List<D> toDtoList(E entity);
    List<E> toEntityList(D entity);
}
